from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from . import app # Import the blueprint 'app' defined in Nurse/__init__.py
import datetime
from app.utils.check_role import check_role


# 7.4.6.1 Diagnosis: Input Vital Signs
@app.route('/input_vital_sign/<int:sessionID>', methods=['POST'])
@jwt_required()
@check_role(['nurse'])
def input_vital_signs(sessionID):
	"""
		Input the vital signs of a patient
		Returns:
			json: The vital signs of the patient
	"""
	from ..database.models import Sessions
	from ..database import db
	session = Sessions.query.filter_by(id=sessionID).first()
	session.state = 2
	
	
	

	
	try:
        

		# Get the JSON payload
		data = request.get_json()
		if not data:
			return jsonify({"message": "Missing JSON payload."}), 400
		import logging
		_logger = logging.getLogger(__name__)
		_logger.error(data)

		# Extract vital signs from payload
		blood_pressure = data['bloodPressure']
		pulse = data['pulse']
		breathing_rate = data['breathingRate']
		temperature = data['temperature']
		bmi = data['bmi']
		oxygen_saturation = data['oxygenSaturation']
		_logger.error(blood_pressure)

		# Basic validation: Check if at least one vital sign is provided
		# More specific validation (e.g., format, range) should be added in a real app.
		if not any([blood_pressure, pulse, breathing_rate, temperature, bmi, oxygen_saturation]):
			return jsonify({"message": "Missing vital sign data in payload."}), 400

		from .utils import input_vital_signs
		userID=get_jwt()['user_id']
		ans = input_vital_signs(userID,sessionID, blood_pressure, pulse, breathing_rate, temperature, bmi, oxygen_saturation)
		db.session.commit()
		return jsonify({"message": "Vital signs inputted successfully."}), 200

	except Exception as e:
		# Log the exception e for debugging
		print(f"Error inputting vital signs for session {sessionID}: {e}")
		return jsonify({"message": "An error occurred while inputting vital signs." + str(e)}), 500
	
	

