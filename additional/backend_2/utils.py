import jwt
from flask import request, jsonify, current_app
from functools import wraps

# In-memory token blacklist for demonstration (use a persistent store in production)
token_blacklist = set()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]
        if not token:
            return jsonify({'msg': 'Token is missing!'}), 401
        if token in token_blacklist:
            return jsonify({'msg': 'Token has been revoked!'}), 401
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = data['username']
        except Exception as e:
            return jsonify({'msg': 'Token is invalid or expired!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated
