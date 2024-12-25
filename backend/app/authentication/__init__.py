from flask import Blueprint
from flask_jwt_extended import get_jwt
app = Blueprint('authentication', __name__)

from . import routes

url_prefix = '/authentication'

allow_role = 'all'


def check_role(allow_role):
    def decorator(func):
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


