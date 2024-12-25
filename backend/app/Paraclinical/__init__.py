from flask import Blueprint

app = Blueprint('paraclinical', __name__)

from . import routes

url_prefix = '/paraclinical'