# AutoValue AI backend (Phase 2)

## Existing project

The project contains `frontend/` (React/Vite source, built dist and installed node_modules), `design-references/` (reference PNG), and `backend/`. No Git repository or AGENTS.md was present in this workspace. The existing backend already contained app.py, train.py, three routes (health, predict, model-info), validator/model loader utilities, requirements, import checker and Windows launch/test helpers. Its data and models directories were empty.

## Environment and running

Python 3.14.0 and every pinned dependency in requirements.txt were already installed and verified. No packages were installed during this implementation. The Python installation was inaccessible inside the agent sandbox, so execution used approved access to the existing interpreter.

From the backend folder in Windows:

```bat
run_train.bat
run_dev.bat
test_api.bat
```

The helpers locate the installed Python automatically. Set AUTOVALUE_PYTHON to another interpreter's full path if needed. For a different machine, install requirements only after approving that installation.

With Python on PATH, equivalent commands from the project root are:

```text
python backend/train.py
python backend/app.py
python -m unittest discover -s backend/tests -v
python backend/smoke_http.py
```

The server listens on http://127.0.0.1:5000. Routes:

- GET /api/health: backend status and loadable artifact readiness.
- GET /api/model-info: evaluation, validation comparison, provenance, supported categories and brand/model combinations.
- POST /api/predict: trained model inference; returns predicted_price_inr, currency, normalised input, model and warnings.

Example JSON:

```json
{"brand":"Maruti","model":"Swift","year":2017,"mileage":45000,"fuelType":"Petrol","transmission":"Manual","owner":"1st Owner"}
```

Invalid JSON returns 400; invalid or unsupported vehicles return 422; unavailable model returns 503; inference errors return 500 without exposing internal exception details. Unknown brand/model pairs and fuels absent from training are rejected. Extra form fields are accepted but are not model inputs. CORS allows the existing Vite origins on port 3000.

## Training and evaluation

The real 8,128-row CarDekho CSV and provenance are in data/. Exact duplicate rows are removed, invalid values filtered and repeated input feature vectors aggregated to median prices before splitting. The raw mileage fuel-economy column is never confused with km_driven. Multiword models such as BMW 3 Series are preserved.

A reproducible 60/20/20 split trains candidates and selects by validation MAE. The selected model is refitted on the 80% development data, evaluated once on the separate 20% test set, and saved in models/. Preprocessors are independent per candidate and fitted only on training data. The final deployed artifact retains that test separation. model_metrics.json records MAE/RMSE in INR, R2, a median-price baseline, row counts, dataset hash and package version.

## Limits and remaining work

The historical dataset ends at model year 2020; newer vehicle inputs carry a warning. Listing-price performance does not measure current transaction-price accuracy. Condition, city and variant are not training inputs.

The existing frontend prediction wizard is now connected to this backend through the Vite /api proxy. See ../frontend/README.md for startup, configuration and integration tests. The trained model was preserved during frontend integration. Deployment and refreshed market data remain future work.
