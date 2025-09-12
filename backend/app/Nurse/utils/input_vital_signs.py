from flask import request, jsonify
from flask_jwt_extended import jwt_required
from ...utils import check_role

def input_vital_signs(userID, sessionID, blood_pressure, pulse, breathing_rate, temperature, bmi, oxygen_saturation):
	
	if blood_pressure is None:
		raise ValueError("Blood pressure is required")
	if pulse is None:
		raise ValueError("Pulse is required")
	if breathing_rate is None:
		raise ValueError("Breathing rate is required")
	if temperature is None:
		raise ValueError("Temperature is required")
	if oxygen_saturation is None:
		raise ValueError("Oxygen saturation is required")
	

	

	from ...database.models import Vital_signs

	vital_sign = Vital_signs(
		blood_pressure=blood_pressure,
		heart_rate=pulse,
		breathing_rate=breathing_rate,
		temperature=temperature,
		oxygen_saturation=oxygen_saturation,
		session_id=sessionID,
		record_by=userID
	)
	
	from ... import db	
	db.session.add(vital_sign)
	db.session.commit()

	return jsonify({"message": "Vital signs inputted successfully"}), 200
	
	
	
	
	
	
	