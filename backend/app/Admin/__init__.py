from flask import Blueprint

app = Blueprint('admin', __name__)

from . import routes

url_prefix = '/admin'