# File: routes/auth.py
from flask import Blueprint, request, jsonify, current_app
import jwt, datetime
from utils import token_required, token_blacklist

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Dummy validation: allow admin/admin and doctor/test
    if (username == 'admin' and password == 'admin') or (username == 'doctor' and password == 'test'):
        token = jwt.encode({
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, current_app.config['SECRET_KEY'], algorithm="HS256")
        # Set role based on the username
        role = 'doctor' if username == 'doctor' else 'admin'
        return jsonify({'access_token': token, 'role': role}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 400

@auth_bp.route('/logout', methods=['POST'])
@token_required
def logout(current_user):
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(" ")[1]
    token_blacklist.add(token)
    return jsonify({'access_token': 'Log out Successfully'}), 200
