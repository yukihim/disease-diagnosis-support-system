from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object('config.Config')

# Enable CORS for all routes
CORS(app, resources={
    r"/Authentication/*": {
        "origins": "http://localhost:3000",
        "supports_credentials": True
    }
})

db = SQLAlchemy(app)

# Setup Swagger UI
SWAGGER_URL = '/api/docs'
API_URL = '/static/swagger.yaml'  # Adjust path if necessary
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={'app_name': "AsiDoc_API"}
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

# Import and register blueprints
from routes.auth import auth_bp
from routes.ehr import ehr_bp
from routes.paraclinical import paraclinical_bp
from routes.diagnosis import diagnosis_bp
from routes.user_management import user_management_bp

app.register_blueprint(auth_bp, url_prefix='/Authentication')
app.register_blueprint(ehr_bp, url_prefix='/EHR')
app.register_blueprint(paraclinical_bp, url_prefix='/paraclinical')
app.register_blueprint(diagnosis_bp, url_prefix='/diagnosis')
app.register_blueprint(user_management_bp, url_prefix='/user_management')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
