from flask import Blueprint

app = Blueprint('doctor', __name__)

from . import routes

url_prefix = '/doctor'

