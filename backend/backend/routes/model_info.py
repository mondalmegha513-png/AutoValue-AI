"""
GET /api/model-info
Returns the selected model, actual evaluation metrics, dataset summary,
and supported input fields.  Only available once training has run.
"""
from flask import Blueprint, jsonify
from utils.model_loader import get_metrics, model_is_ready

model_info_bp = Blueprint("model_info", __name__)

SUPPORTED_FIELDS = [
    {"field": "brand",        "type": "string",  "example": "Maruti"},
    {"field": "model",        "type": "string",  "example": "Swift"},
    {"field": "year",         "type": "integer", "example": 2020},
    {"field": "mileage",      "type": "float",   "example": 45000, "unit": "km"},
    {"field": "fuelType",     "type": "string",  "example": "Petrol",
     "allowed": ["Petrol", "Diesel", "CNG", "Electric", "LPG", "Hybrid"]},
    {"field": "transmission", "type": "string",  "example": "Manual",
     "allowed": ["Manual", "Automatic"]},
    {"field": "owner",        "type": "string",  "example": "1st Owner",
     "allowed": ["1st Owner", "2nd Owner", "3rd Owner", "4th+ Owner"]},
]


@model_info_bp.route("/model-info", methods=["GET"])
def model_info():
    if not model_is_ready():
        return jsonify({
            "model_ready": False,
            "message": "Model not trained yet. Run backend/train.py to train.",
            "supported_input_fields": SUPPORTED_FIELDS,
        }), 200

    metrics = get_metrics()

    return jsonify({
        "model_ready": True,
        "selected_model":   metrics.get("selected_model"),
        "metrics": {
            "MAE_inr":  metrics.get("metrics", {}).get("MAE"),
            "RMSE_inr": metrics.get("metrics", {}).get("RMSE"),
            "R2_score": metrics.get("metrics", {}).get("R2"),
        },
        "model_comparison":     metrics.get("comparison"),
        "comparison_split": metrics.get("comparison_split"),
        "evaluation": metrics.get("evaluation"),
        "supported_categories": metrics.get("supported_categories"),
        "brand_models": metrics.get("brand_models"),
        "limitations": metrics.get("limitations"),
        "training_dataset":     metrics.get("training_dataset"),
        "supported_input_fields": SUPPORTED_FIELDS,
    }), 200


