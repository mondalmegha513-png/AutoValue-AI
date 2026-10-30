"""
GET /api/health
Returns backend status and whether the ML model is available.
"""
from flask import Blueprint, jsonify
from utils.model_loader import model_is_ready

health_bp = Blueprint("health", __name__)


@health_bp.route("/health", methods=["GET"])
def health():
    ready = model_is_ready()
    return jsonify({
        "status": "ok",
        "service": "AutoValue AI Backend",
        "model_ready": ready,
        "message": (
            "Model loaded and ready for predictions."
            if ready
            else "Model not yet trained. Run backend/train.py first."
        ),
    }), 200

