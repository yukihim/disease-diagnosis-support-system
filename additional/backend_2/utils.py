# Example utils.py update (you'll need to adjust based on your actual implementation)
from functools import wraps
from flask import request, jsonify, current_app
import jwt

token_blacklist = set()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('access_token')
        
        if not token:
            return jsonify({'message': 'Authentication Token is missing!'}), 401

        if token in token_blacklist:
            return jsonify({'message': 'Token has been revoked!'}), 401
        
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = data['username']
        except:
            return jsonify({'message': 'Token is invalid or expired!'}), 401

        return f(current_user, *args, **kwargs)
    
    return decorated