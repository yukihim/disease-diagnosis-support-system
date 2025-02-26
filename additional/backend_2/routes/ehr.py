from flask import Blueprint, request, jsonify
from utils import token_required

ehr_bp = Blueprint('ehr', __name__)

@ehr_bp.route('/overview', methods=['GET'])
@token_required
def receptionist_overview(current_user):
    # Return dummy overview data
    response = {
        'patient_overview': {'new_patient': {}, 'overview': {}},
        'appointment_overview': {},
        'appointment_list': [],
        'appointment_behavior': []
    }
    return jsonify(response), 200

@ehr_bp.route('/patient_search', methods=['POST'])
@token_required
def patient_search(current_user):
    data = request.get_json()
    ssn = data.get('ssn')
    insurance_number = data.get('insurance_number')
    # Return dummy patient list
    patients = [{
        'id': 1,
        'name': 'John Doe',
        'ssn': '0892',
        'insurance_number': '090'
    }]
    return jsonify({'patients': patients}), 200

@ehr_bp.route('/retrieve', methods=['POST'])
@token_required
def ehr_retrieve(current_user):
    data = request.get_json()
    patient_id = data.get('patient_id')
    response = {
        'patient_information': [{'id': patient_id, 'name': 'John Doe'}],
        'pass_conditions': [],
        'pass_sessions': []
    }
    return jsonify(response), 200

@ehr_bp.route('/check_in', methods=['POST'])
@token_required
def check_in_patient(current_user):
    data = request.get_json()
    # Extract fields: patient_id, reason_to_come, department, doctor, etc.
    return jsonify({'message': 'Check in Successfully'}), 200

@ehr_bp.route('/pass_session', methods=['POST'])
@token_required
def pass_session(current_user):
    data = request.get_json()
    session_id = data.get('session_id')
    response = {
        'vital_sign': [],
        'patient_information': [],
        'test_results': [],
        'symptoms': '',
        'diagnosis': '',
        'prescriptions': [],
        'treatments': []
    }
    return jsonify(response), 200
