

from . import app
from flask import request,jsonify
from .login import check_password
from flask_jwt_extended import create_access_token, jwt_required
from .Exception import *




@app.route('/login', methods=['POST'])
def login():
    try:
        username = request.json.get('username')
        password = request.json.get('password')

        ans, role = check_password(username, password)
        access_token = create_access_token(identity=username,additional_claims={'username':username,'role':role})
        return jsonify(access_token=access_token), 200
    except Username_unfound as e:
        return {'message': str(e)}, 400
    except WrongPassword as e:
        return {'message': str(e)}, 400

    except Exception as e:
        print(str(e))
        import logging
        logging.error(str(e))
        return {'message': 'Error while authentication'}, 400


@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({'message': 'Logout success'}), 200


# fetch('url',Header={Authorization': 'Bearer access_token})



@app.route('/test', methods=['POST'])
@jwt_required()
def test():
    return 'Test'


