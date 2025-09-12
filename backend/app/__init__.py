from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # Add this import
from .database import db
from .database.models import *

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False
    JWTManager(app)
    
    db.init_app(app)

    

    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)



    with app.app_context():
        db.create_all()
        import logging
        logging.basicConfig(level=logging.INFO)
        logging.info("Database tables created successfully.")

        
        db.session.commit()
    
    

    # Enable CORS for all routes with proper settings
    # CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    
    # Import blueprints

    from . import authentication
    app.register_blueprint(authentication.app, url_prefix=authentication.url_prefix)

    from . import doctor
    app.register_blueprint(doctor.app, url_prefix=doctor.url_prefix)

    from . import receptionist
    app.register_blueprint(receptionist.app, url_prefix=receptionist.url_prefix)

    from . import device_managing
    app.register_blueprint(device_managing.app, url_prefix=device_managing.url_prefix)
    ## insert test data

    from . import paraclinical
    app.register_blueprint(paraclinical.app, url_prefix=paraclinical.url_prefix)

    from . import nurse
    app.register_blueprint(nurse.app, url_prefix=nurse.url_prefix)

    if(app.config['TEST_DATA']):
        with app.app_context():
            from .database.test_data.test_data_generator import create_test_data
            create_test_data()




    return app

