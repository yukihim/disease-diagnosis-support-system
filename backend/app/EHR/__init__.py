from flask import Blueprint

app = Blueprint('EHR', __name__)

from . import routes

url_prefix = '/EHR'