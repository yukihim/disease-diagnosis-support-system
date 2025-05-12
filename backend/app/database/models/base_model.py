"""
Author: nhoxtin15
Model Description:
    This module is for storing the base model of the database
    This file is created to avoid circular import
Date Created: 27/03/2023
Last Updated: 27/03/2023
"""

from sqlalchemy import Column, Integer, MetaData
from sqlalchemy.ext.declarative import declarative_base

MetaData = MetaData(schema="database")
Base = declarative_base(metadata=MetaData)
from datetime import datetime

class BaseModel(Base):
    __abstract__ = True
    __allow_unmapped__ = True

    id = Column(Integer, primary_key=True, autoincrement=True)

    @staticmethod
    def get_current_time():
        return datetime.utcnow()
