from flask import Blueprint


app = Blueprint('receptionist', __name__)

from . import routes

url_prefix = '/receptionist'