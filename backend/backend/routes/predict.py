"""POST /api/predict: real model inference in INR."""
import math
import pandas as pd
from flask import Blueprint, request, jsonify, current_app
from utils.model_loader import get_pipeline, get_metrics, model_is_ready
from utils.validator import validate_predict_input
predict_bp = Blueprint('predict', __name__)


@predict_bp.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(silent=True)
    if data is None:
        return jsonify(error='Request body must be valid JSON.'), 400
    cleaned, errors = validate_predict_input(data)
    if errors:
        return jsonify(error='Validation failed.', details=errors), 422
    if not model_is_ready():
        return jsonify(error='Model unavailable. Run backend/train.py.', model_ready=False), 503
    metadata = get_metrics()
    # Do not silently infer prices for vehicles or fuel types absent from training.
    for key, values in metadata.get('supported_categories', {}).items():
        if cleaned[key] not in values:
            errors.append(f'{key} is not represented in the training dataset.')
    models = metadata.get('brand_models', {}).get(cleaned['brand'], [])
    if models and cleaned['model'] not in models:
        errors.append('This model is not represented for the selected brand.')
    if errors:
        return jsonify(error='Unsupported vehicle.', details=errors), 422
    try:
        value = float(get_pipeline().predict(pd.DataFrame([cleaned]))[0])
        if not math.isfinite(value) or value <= 0:
            raise ValueError('Invalid model output')
    except Exception:
        current_app.logger.exception('Prediction failed')
        return jsonify(error='Prediction failed internally.'), 500
    warnings = []
    years = metadata['training_dataset']
    if not years['year_min'] <= cleaned['year'] <= years['year_max']:
        warnings.append('Vehicle year is outside the training dataset range; estimate may be unreliable.')
    return jsonify(predicted_price_inr=round(value), currency='INR', input_received=cleaned,
                   warnings=warnings, model=metadata['selected_model']), 200
