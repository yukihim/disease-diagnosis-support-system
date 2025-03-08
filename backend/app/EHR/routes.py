

from . import app
from . import overview, pass_session,patient_search,get_patient_ehr,check_in
from flask import request,jsonify
from ..authentication import check_role
from flask_jwt_extended import jwt_required


@app.route('/overview', methods=['GET'])
@jwt_required()
@check_role(['receptionist'])
def overview_controller():
    try:
        ans = overview.get_overview()
        return ans
    except Exception as e:
        return {'error': "Error while retrieving the receptionist's overview: "+str(e)}, 400


@app.route('/patient_search', methods=['POST'])
@jwt_required()
@check_role(['receptionist'])
def patient_search_controller():
    try:
        #input
        ssn = request.json.get('ssn')
        insurance_number = request.json.get('insurance_number')

        ans = patient_search.patient_search(ssn, insurance_number)
        return ans
    except Exception as e:
        return {'error': "Error while searching for patient: "+str(e)}, 400


@app.route('/retrieve', methods=['POST'])
@jwt_required()
@check_role(['receptionist'])
def retrieve():
    try:
        patient_id = request.json.get('patient_id')
        ans = get_patient_ehr.get_patient_ehr(patient_id)
        return ans
    except Exception as e:
        return {'error': "Error while retrieving patient's EHR: "+str(e)}, 400


@app.route('/pass_session', methods=['POST'])
@jwt_required()
@check_role(['receptionist'])
def pass_session_route():
    try:
        session_id = request.json.get('session_id')
        ans = pass_session.pass_session(session_id)
        return ans
    except Exception as e:
        return {'error': "Error while passing the session: "+str(e)}, 400



@app.route('/check_in', methods=['POST'])
@jwt_required()
@check_role(['receptionist'])
def check_in_controller():
    try:
        session_id = request.json.get('session_id')
        ans = check_in.check_in(session_id)
        return ans
    except Exception as e:
        return {'error': "Error while checking in: "+str(e)}, 400