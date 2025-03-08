# File: routes/auth.py
from flask import Blueprint, request, jsonify, current_app, make_response
import jwt, datetime
from utils import token_required, token_blacklist

auth_bp = Blueprint('auth', __name__)

dummy_test=[
    {
        'username': 'admin',
        'password': 'admin'
    },
    {
        'username': 'doctor',
        'password': 'test'
    }
]

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Dummy validation: allow admin/admin and doctor/test
    if not username or not password:
        return jsonify({'error': 'Please enter credentials'}), 400
    
    if any([username == user['username'] and password == user['password'] for user in dummy_test]):
        token = jwt.encode({
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, current_app.config['SECRET_KEY'], algorithm="HS256")
        
        # Set role based on the username
        role = username
        
        # return jsonify({'access_token': token, 'role': role}), 200
        
        
        
        # Create response with JSON data
        response = make_response(jsonify({'role': role}), 200)
        
        # Set HTTP-only secure cookie
        response.set_cookie(
            'access_token', 
            token, 
            httponly=True, 
            secure=True,  # Set to True in production with HTTPS
            samesite='Strict',
            max_age=3600  # 1 hour expiry
        )
        
        return response
    else:
        return jsonify({'error': 'Invalid credentials'}), 400

# @auth_bp.route('/logout', methods=['POST'])
# @token_required
# def logout(current_user):
#     auth_header = request.headers.get('Authorization')
#     token = auth_header.split(" ")[1]
#     token_blacklist.add(token)
#     return jsonify({'access_token': 'Log out Successfully'}), 200

@auth_bp.route('/logout', methods=['POST'])
@token_required
def logout(current_user):
    # Create response
    response = make_response(jsonify({'message': 'Logged out successfully'}), 200)
    
    # Clear the cookie
    response.set_cookie('access_token', '', expires=0, httponly=True, secure=True)
    
    # Add token to blacklist (if still needed)
    auth_header = request.headers.get('Authorization')
    if auth_header:
        token = auth_header.split(" ")[1]
        token_blacklist.add(token)
        
    return response
