from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import app # Import the blueprint 'app' defined in Nurse/__init__.py
import datetime
from app.utils import check_role


@app.route('/landing_page/incoming_patient', methods=['GET'])
@jwt_required()
@check_role(['paraclinical'])
def incomming_patient():

	from flask_jwt_extended import get_jwt
	user_id = int(get_jwt()['user_id'])
	from .utils import get_incomming_patient

	result = get_incomming_patient(user_id)
	return jsonify({"incomingPatient": result}), 200

@app.route('/patient_test/<int:sessionID>', methods=['GET'])
@jwt_required()
@check_role(['paraclinical'])
def patient_test(sessionID):
	from .utils import get_patient_test

	result = get_patient_test(sessionID)
	return jsonify({"patientTests": result}), 200

@app.route('/patient_test/<int:sessionID>/test_measurement', methods=['POST'])
@jwt_required()
@check_role(['paraclinical'])
def patient_test_measurement(sessionID):
	from .utils import get_test_measurement

	data = request.get_json()
	test_name = data['testName']

	result = get_test_measurement(sessionID, test_name)
	return jsonify({"measurements": result}), 200
	
	
@app.route('/patient_test/<int:sessionID>/end_test', methods=['POST'])
@jwt_required()
@check_role(['paraclinical'])
def end_test(sessionID):
	from .utils import end_test

	result = end_test(sessionID)
	return jsonify({"result": result}), 200