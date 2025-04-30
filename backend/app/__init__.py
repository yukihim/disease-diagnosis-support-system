from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # Add this import


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    JWTManager(app)
    
    
    # Enable CORS for all routes with proper settings
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
    
    # Import blueprints
    from . import authentication
    app.register_blueprint(authentication.app, url_prefix=authentication.url_prefix)
    
    from . import Events_Calendar
    app.register_blueprint(Events_Calendar.app, url_prefix=Events_Calendar.url_prefix)
    
    from . import Pass_Session
    app.register_blueprint(Pass_Session.app, url_prefix=Pass_Session.url_prefix)

    from . import Receptionist
    app.register_blueprint(Receptionist.app, url_prefix=Receptionist.url_prefix)
    
    from . import Doctor
    app.register_blueprint(Doctor.app, url_prefix=Doctor.url_prefix)
    
    from . import Nurse
    app.register_blueprint(Nurse.app, url_prefix=Nurse.url_prefix)    

    from . import Paraclinical
    app.register_blueprint(Paraclinical.app, url_prefix=Paraclinical.url_prefix)    
    
    from . import Admin
    app.register_blueprint(Admin.app, url_prefix=Admin.url_prefix)




    return app