from flask import Blueprint

app = Blueprint('events_calendar', __name__)

from . import routes

url_prefix = ''