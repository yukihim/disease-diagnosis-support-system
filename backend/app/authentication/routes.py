from . import app
from flask import request, jsonify
from .utils import password_checker
from flask_jwt_extended import create_access_token, jwt_required
from .exception import *


@app.route('/login', methods=['POST'])
def login():
    """
        This route is used to authenticate the user and return the access token
        :input: username, password
        :return:
            access_token, 200
            error, 400
    """
    try:
        # Get the username and password from the request
        username = request.json.get('username')
        password = request.json.get('password')

        # Check the password
        role, user_id = password_checker.check_password_and_get_role(username, password)

        access_token = create_access_token(identity=username,
                                           additional_claims={'role': role, 'user_id': user_id}
                                           )
        return jsonify(access_token=access_token), 200
    except Username_unfound as e:
        return {'error': str(e)}, 400
    

    except Exception as e:
        print(str(e))
        import logging
        logging.error(str(e))
        return {'error': 'Error while authentication'}, 400


@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({'message': 'Logout success'}), 200


