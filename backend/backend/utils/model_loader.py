"""Load trusted, locally trained artifacts and refresh after retraining."""
from pathlib import Path
import json
import logging
import joblib
BASE = Path(__file__).resolve().parents[1] / 'models'
MODEL_PATH = BASE / 'car_price_model.joblib'
METRICS_PATH = BASE / 'model_metrics.json'
_cache = {}


def _load(path, loader):
    if not path.exists():
        _cache.pop(path, None)
        return None
    stamp = (path.stat().st_mtime_ns, path.stat().st_size)
    if path not in _cache or _cache[path][0] != stamp:
        try:
            _cache[path] = (stamp, loader(path))
        except Exception:
            logging.exception('Unable to load model artifact: %s', path.name)
            return None
    return _cache[path][1]


def get_pipeline():
    return _load(MODEL_PATH, joblib.load)


def get_metrics():
    return _load(METRICS_PATH, lambda path: json.loads(path.read_text(encoding='utf-8')))


def model_is_ready():
    return get_pipeline() is not None and isinstance(get_metrics(), dict)
