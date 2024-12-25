from flask import Blueprint

app = Blueprint('diagnosis', __name__)

from . import routes

url_prefix = '/diagnosis'

