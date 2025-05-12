from sqlalchemy import create_engine, MetaData, Column, Integer
from flask_sqlalchemy import SQLAlchemy
from .models import BaseModel

# from ..database.models import Users

db = SQLAlchemy(model_class=BaseModel)





