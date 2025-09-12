from flask import Blueprint

app = Blueprint('authentication', __name__)

from . import routes

url_prefix = '/authentication'

# from ..database.test_data import list_module
# from . import test_data
import logging

# list_module.append(test_data)









