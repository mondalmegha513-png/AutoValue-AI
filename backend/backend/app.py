
"""AutoValue AI Flask application factory."""

import os
from flask import Flask
from flask_cors import CORS
from routes.health import health_bp
from routes.predict import predict_bp
from routes.model_info import model_info_bp


def create_app():
    app = Flask(__name__)
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024

    # Allow local development and deployed frontend
    allowed_origins = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ]

    frontend_url = os.environ.get('FRONTEND_URL', '').strip().rstrip('/')

    if frontend_url:
        allowed_origins.append(frontend_url)

    CORS(
        app,
        resources={r'/api/*': {'origins': allowed_origins}}
    )

    app.register_blueprint(health_bp, url_prefix='/api')
    app.register_blueprint(predict_bp, url_prefix='/api')
    app.register_blueprint(model_info_bp, url_prefix='/api')

    return app


if __name__ == '__main__':
    create_app().run(host='127.0.0.1', port=5000, debug=False)
