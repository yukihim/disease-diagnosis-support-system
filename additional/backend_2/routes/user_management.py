from flask import Blueprint, request, jsonify
from utils import token_required

user_management_bp = Blueprint('user_management', __name__)

@user_management_bp.route('/overview', methods=['GET'])
@token_required
def admin_overview(current_user):
    response = {
        'user_list': [{'username': 'admin', 'role': 'Admin'}],
        'active_users': 1,
        'inactive_users': 0
    }
    return jsonify(response), 200

@user_management_bp.route('/edit', methods=['POST'])
@token_required
def user_edit(current_user):
    data = request.get_json()
    # Extract username, email, name, role
    return jsonify({'message': 'User edited successfully'}), 200

@user_management_bp.route('/add', methods=['POST'])
@token_required
def add_user(current_user):
    data = request.get_json()
    # Extract username, email, name, role
    return jsonify({'message': 'User added successfully'}), 200

@user_management_bp.route('/delete', methods=['POST'])
@token_required
def delete_user(current_user):
    data = request.get_json()
    # Extract username to delete
    return jsonify({'message': 'User deleted successfully'}), 200

@user_management_bp.route('/user_logs', methods=['GET'])
@token_required
def view_user_logs(current_user):
    logs = [{'action': 'login', 'timestamp': '2025-02-22T12:00:00Z'}]
    return jsonify({'user_logs': logs}), 200
