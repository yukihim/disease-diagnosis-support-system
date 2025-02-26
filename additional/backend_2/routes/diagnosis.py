from flask import Blueprint, request, jsonify
from utils import token_required

diagnosis_bp = Blueprint('diagnosis', __name__)

@diagnosis_bp.route('/overview', methods=['GET'])
@token_required
def doctor_overview(current_user):
    response = {
        'incoming_patient_list': [],
        'paraclinical_patient_list': [],
        'inpatient_list': [],
        'appointment_list': []
    }
    return jsonify(response), 200

@diagnosis_bp.route('/recommend', methods=['POST'])
@token_required
def recommend_prognosis(current_user):
    data = request.get_json()
    symptoms = data.get('symptoms')
    recommendation = [{'symptom': 'fever', 'probability': 0.8}]
    return jsonify({'recommendation': recommendation}), 200

@diagnosis_bp.route('/send_for_test', methods=['POST'])
@token_required
def send_patient_for_test(current_user):
    data = request.get_json()
    test_type_id = data.get('test_type_id')
    room_id = data.get('room_id')
    note = data.get('note')
    recommendation = [{'test_type_id': test_type_id, 'room_id': room_id}]
    return jsonify({'recommendation': recommendation}), 200

@diagnosis_bp.route('/finalizing', methods=['POST'])
@token_required
def finalizing_diagnosis(current_user):
    data = request.get_json()
    symptoms = data.get('symptoms')
    final_diagnosis = data.get('final_diagnosis')
    return jsonify({'message': 'Finalization successfully'}), 200

@diagnosis_bp.route('/prescription_treatment', methods=['POST'])
@token_required
def prescription_treatment(current_user):
    data = request.get_json()
    prescriptions = data.get('prescriptions')
    treatments = data.get('treatments')
    return jsonify({'message': 'Finalization successfully'}), 200
