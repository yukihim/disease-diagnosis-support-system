"""
Author: nhoxtin15
Model Description:
    This module is used to check the role of the user before accessing the API
    
Date Created: 14/04/2025
Last Updated: 14/04/2025
"""

from functools import wraps
from flask_jwt_extended import get_jwt

def check_role(allow_role):
    def decorator(func):
        @wraps(func)  # <---- ADD THIS LINE
        def inner(*args, **kwargs):
            role = get_jwt()['role']
            if allow_role == 'all':
                return func(*args, **kwargs)
            elif role in allow_role:
                return func(*args, **kwargs)
            else:
                raise Exception('Permission denied')
        return inner
    return decorator