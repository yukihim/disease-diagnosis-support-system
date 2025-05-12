"""
Author: nhoxtin15
Model Description:
    
Date Created: 18/04/2025
Last Updated: 18/04/2025
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .base_model import BaseModel



class Symptoms(BaseModel):
    __tablename__ = "symptoms"

    id = Column(Integer, primary_key=True, autoincrement=True)
    symptom_name = Column(String(50), nullable=False)
    severity = Column(Integer, nullable=False)
    symptom_description = Column(String(200), nullable=False)



