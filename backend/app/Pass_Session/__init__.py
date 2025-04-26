from flask import Blueprint

app = Blueprint('pass_session', __name__)

from . import routes

url_prefix = ''