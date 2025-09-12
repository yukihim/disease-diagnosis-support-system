"""
Author: nhoxtin15
Model Description:
    
Date Created: 14/04/2025
Last Updated: 14/04/2025
"""
from flask import Blueprint


app = Blueprint('paraclinical', __name__)

from . import routes

url_prefix = '/paraclinical'

allow_role = 'all'



