from flask import Blueprint

app = Blueprint('nurse', __name__)

from . import routes

url_prefix = '/nurse'