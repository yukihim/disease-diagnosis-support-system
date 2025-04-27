from sqlalchemy import create_engine,MetaData,Column,Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker



DATABASE_URL = 'postgresql+psycopg2://flask:jans-ancd=123@db:5432/ProductionDatabase'
engine = create_engine(DATABASE_URL)
MetaData = MetaData(schema="database")


Base1 = declarative_base(metadata=MetaData)
class BaseModel(Base1):
    __abstract__ = True
    __allow_unmapped__ = True

    id = Column(Integer, primary_key=True, autoincrement=True)


from models import *