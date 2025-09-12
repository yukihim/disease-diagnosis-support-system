from . import app
from flask import request, jsonify
from flask_jwt_extended import jwt_required
import logging

logger = logging.getLogger(__name__)


@app.route('/register', methods=['POST'])
def register_device():
	data = request.json
	
	name = data.get('name')
	type_device = data.get('type_device')
	token = data.get('token')
	
	
	from .utils import register_device

	register_device(name, type_device, token)

	logger.info(f"register device {name} {type_device} {token}")
	# register_device(name, type_device, token)

	return jsonify({"token": token}), 200

@app.route('/login', methods=['POST'])
def login_device():
	from flask import request
	data = request.json
	token = data.get('token')
	
	try:
		from .utils import login
		access_token, refresh_token = login(token)
		logger.info(f"login device {token} {access_token} {refresh_token}")
		if access_token and refresh_token:
			return jsonify({"access_token": access_token, "refresh_token": refresh_token}), 200
		else:
			return jsonify({"message": "Invalid device token"}), 401
	except Exception as e:
		return jsonify({"message": str(e)}), 500


@app.route('/update_values', methods=['POST'])
@jwt_required()
def update_values():
	from flask import request
	value = request.json.get('value')
	from flask_jwt_extended import get_jwt_identity
	device_id = get_jwt_identity()
	try:

		from .utils import update_values
		update_values(device_id, value)
		logger.info(f"update values {device_id} {value}")
		return jsonify({"message": "Success"}), 200
	except Exception as e:
		logger.error(f"error updating values {e}")
		return jsonify({"message": str(e)}), 500


@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
	from flask_jwt_extended import get_jwt_identity
	device_id = get_jwt_identity()
	from .utils import logout
	logout(device_id)
	logger.info(f"logout device {device_id}")
	return jsonify({"message": "Success"}), 200




