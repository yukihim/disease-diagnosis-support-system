from flask import Blueprint, request, jsonify
from utils import token_required

paraclinical_bp = Blueprint('paraclinical', __name__)

@paraclinical_bp.route('/overview', methods=['GET'])
@token_required
def paraclinical_overview(current_user):
    response = {
        'patient_overview': {},
        'patient_list': [],
        'appointment_list': []
    }
    return jsonify(response), 200

@paraclinical_bp.route('/test', methods=['POST'])
@token_required
def test_view(current_user):
    data = request.get_json()
    test_id = data.get('test_id')
    response = {
        'pass_conditions': [],
        'patient_information': [],
        'pass_sessions': [],
        'test_info': []
    }
    return jsonify(response), 200

@paraclinical_bp.route('/test/detailed', methods=['POST'])
@token_required
def detailed_test_result(current_user):
    data = request.get_json()
    test_id = data.get('test_id')
    response = {
        'pass_conditions': [],
        'patient_information': [],
        'pass_sessions': [],
        'test_info': [],
        'test_result': 'Detailed result here'
    }
    return jsonify(response), 200
