from flask import Flask
from flask_jwt_extended import JWTManager
def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    JWTManager(app)
    # Import blueprints

    from . import authentication
    app.register_blueprint(authentication.app, url_prefix=authentication.url_prefix)


    from . import EHR

    app.register_blueprint(EHR.app, url_prefix=EHR.url_prefix)




    return app

