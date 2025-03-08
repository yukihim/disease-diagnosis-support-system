from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # Add this import


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    JWTManager(app)
    
    
    # Enable CORS for all routes with proper settings
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    
    # Import blueprints
    from . import authentication
    app.register_blueprint(authentication.app, url_prefix=authentication.url_prefix)


    # from . import EHR
    # app.register_blueprint(EHR.app, url_prefix=EHR.url_prefix)




    return app