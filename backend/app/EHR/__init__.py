from flask import Blueprint
from . import routes


app = Blueprint('EHR', __name__)
url_prefix = '/EHR'