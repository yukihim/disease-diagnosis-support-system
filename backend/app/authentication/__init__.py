from flask import Blueprint
from flask_jwt_extended import get_jwt

app = Blueprint('authentication', __name__)

from . import routes
url_prefix = '/authentication'

allow_role = 'all'






# def check_role(allow_role):
#     def decorator(func):
#         def inner(*args, **kwargs):
#             role = get_jwt()['role']
#             if allow_role == 'all':
#                 return func(*args, **kwargs)
#             elif role in allow_role:
#                 return func(*args, **kwargs)
#             else:
#                 raise Exception('Permission denied')
#         return inner
#     return decorator


import functools
from flask import jsonify
def check_role(required_roles):
    def decorator(func):
        @functools.wraps(func) # Add this line
        def wrapper(*args, **kwargs):
            # ... (your existing logic to get current user's role)
            current_user_role = get_jwt().get("role") # Example: Adjust based on your JWT structure

            if current_user_role not in required_roles:
                return jsonify({"message": "Access forbidden: Insufficient role"}), 403

            return func(*args, **kwargs)
        return wrapper
    return decorator