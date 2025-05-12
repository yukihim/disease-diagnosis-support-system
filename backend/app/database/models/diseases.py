"""
Author: nhoxtin15
Model Description:
    
Date Created: 18/04/2025
Last Updated: 18/04/2025
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .base_model import BaseModel



class diagnosis_criteria(BaseModel):
    __tablename__ = "diagnosis_criteria"

    id = Column(Integer, primary_key=True, autoincrement=True)
    criteria_name = Column(String(50), nullable=False)
    criteria_description = Column(String(200), nullable=False)
    severity = Column(Integer, nullable=False)

class Treatment(BaseModel):
    __tablename__ = "treatments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    treatment_name = Column(String(50), nullable=False)
    treatment_description = Column(String(200), nullable=False)
    severity = Column(Integer, nullable=False)

class Causes(BaseModel):
    __tablename__ = "causes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    cause_name = Column(String(50), nullable=False)
    cause_description = Column(String(200), nullable=False)


class Diseases(BaseModel):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, autoincrement=True)
    disease_name = Column(String(50), nullable=False)
    disease_code = Column(String(20), nullable=False, unique=True)
    disease_description = Column(String(200), nullable=False)
    severity = Column(Integer, nullable=False)


