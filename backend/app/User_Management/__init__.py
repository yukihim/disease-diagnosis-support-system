from flask import Blueprint

app = Blueprint('user_management', __name__)

from . import routes

url_prefix = '/user_management'