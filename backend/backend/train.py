"""Train on genuine CarDekho listings; keep final test data out of selection."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import joblib
import numpy as np
import pandas as pd
import sklearn
from sklearn.base import clone
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.dummy import DummyRegressor
from sklearn.metrics import mean_absolute_error, root_mean_squared_error, r2_score

BASE = Path(__file__).resolve().parent
DATASET_PATH = BASE / 'data' / 'car_details_v3.csv'
MODEL_OUTPUT_PATH = BASE / 'models' / 'car_price_model.joblib'
METRICS_OUTPUT_PATH = BASE / 'models' / 'model_metrics.json'
FEATURES = ['year', 'mileage', 'brand', 'model', 'fuelType', 'transmission', 'owner']
CATEGORICAL = FEATURES[2:]


def clean_and_prepare_data(raw):
    df = raw.drop_duplicates().copy()
    if 'name' in df:
        names = df['name'].astype('string').str.strip()
        df['brand'] = names.str.split().str[0]
        # Preserve multiword models used by the UI (BMW 3 Series, Maruti Swift Dzire).
        df['model'] = names.str.replace(r'^\S+\s*', '', regex=True).str.split().str[0]
        for model in ['3 Series', '5 Series', '7 Series', 'Swift Dzire', 'Grand i10', 'Grand Vitara', 'New Safari', 'Land Cruiser', 'Innova Crysta', 'XUV 500', 'XUV 300']:
            mask = names.str.contains(' ' + model + ' ', regex=False, na=False) | names.str.endswith(' ' + model, na=False)
            df.loc[mask, 'model'] = model
    if 'km_driven' in df:
        # Raw mileage is km/l; overwrite explicitly rather than create duplicate columns.
        df['mileage'] = df['km_driven']
    if 'fuel' in df:
        df['fuelType'] = df['fuel']
    if 'selling_price' in df:
        df['price'] = df['selling_price']
    missing = set(FEATURES + ['price']) - set(df.columns)
    if missing:
        raise ValueError(f'Missing dataset columns: {sorted(missing)}')
    df = df[FEATURES + ['price']].copy()
    for col in ['year', 'mileage', 'price']:
        df[col] = pd.to_numeric(df[col], errors='coerce')
    for col in CATEGORICAL:
        df[col] = df[col].astype('string').str.strip().replace('', pd.NA)
    df = df.replace([np.inf, -np.inf], np.nan).dropna()
    df = df[df['year'].between(1995, datetime.now().year) & df['mileage'].between(0, 499999) & df['price'].between(20000, 20000000)]
    # Identical feature vectors cannot appear in both train and test splits.
    return df.groupby(FEATURES, as_index=False, observed=True)['price'].median()


def score(model, X, y):
    pred = model.predict(X)
    return {'MAE': round(float(mean_absolute_error(y, pred)), 2),
            'RMSE': round(float(root_mean_squared_error(y, pred)), 2),
            'R2': round(float(r2_score(y, pred)), 4)}


def train_models():
    raw = pd.read_csv(DATASET_PATH)
    df = clean_and_prepare_data(raw)
    if len(df) < 100:
        raise ValueError('At least 100 valid unique vehicle records are required.')
    X, y = df[FEATURES], df['price']
    X_dev, X_test, y_dev, y_test = train_test_split(X, y, test_size=.2, random_state=42)
    X_train, X_val, y_train, y_val = train_test_split(X_dev, y_dev, test_size=.25, random_state=42)
    prep = ColumnTransformer([('numeric', 'passthrough', FEATURES[:2]),
                              ('categorical', OneHotEncoder(handle_unknown='ignore', sparse_output=False), CATEGORICAL)])
    candidates = {'Random Forest Regressor': RandomForestRegressor(n_estimators=200, min_samples_leaf=2, random_state=42, n_jobs=-1),
                  'Gradient Boosting Regressor': GradientBoostingRegressor(n_estimators=250, max_depth=3, loss='huber', random_state=42)}
    comparison = {}
    pipelines = {}
    for name, estimator in candidates.items():
        pipeline = Pipeline([('preprocessor', clone(prep)), ('regressor', estimator)])
        pipeline.fit(X_train, y_train)
        comparison[name] = score(pipeline, X_val, y_val)
        pipelines[name] = pipeline
        print(name, 'validation:', comparison[name], flush=True)
    selected = min(comparison, key=lambda name: comparison[name]['MAE'])
    best = pipelines[selected]
    best.fit(X_dev, y_dev)
    metrics = score(best, X_test, y_test)
    baseline = DummyRegressor(strategy='median').fit(X_dev, y_dev)
    metadata = {'selected_model': selected, 'metrics': metrics, 'comparison': comparison,
        'comparison_split': 'validation (20%); selection by lowest MAE',
        'evaluation': {'split': 'untouched test (20%)', 'random_state': 42,
                       'development_records': len(X_dev), 'test_records': len(X_test),
                       'baseline': score(baseline, X_test, y_test)},
        'training_dataset': {'records_raw': len(raw), 'records_cleaned': len(df), 'features': FEATURES,
            'source': 'https://github.com/HarshKapadia2/car-details/blob/main/data/car_details_v3.csv',
            'sha256': hashlib.sha256(DATASET_PATH.read_bytes()).hexdigest(),
            'year_min': int(df.year.min()), 'year_max': int(df.year.max()),
            'cleaning': 'Invalid rows removed; identical feature vectors aggregated by median price before splitting.',
            'currency': 'INR', 'mileage_unit': 'km driven'},
        'supported_categories': {col: sorted(df[col].unique().tolist()) for col in CATEGORICAL},
        'brand_models': {brand: sorted(group.model.unique().tolist()) for brand, group in df.groupby('brand')},
        'trained_at': datetime.now(timezone.utc).isoformat(), 'sklearn_version': sklearn.__version__,
        'limitations': 'Historical listing prices, not verified transaction values or current market quotes. City, condition and variant are not model inputs.'}
    MODEL_OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(best, MODEL_OUTPUT_PATH, compress=3)
    METRICS_OUTPUT_PATH.write_text(json.dumps(metadata, indent=2), encoding='utf-8')
    print('Selected:', selected, 'TEST:', metrics, flush=True)
    return metadata


if __name__ == '__main__':
    train_models()

