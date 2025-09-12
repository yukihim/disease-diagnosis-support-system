"""
Author: nhoxtin15
Model Description:

Date Created: 18/04/2025
Last Updated: 18/04/2025
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from .base_model import BaseModel


class Procedures(BaseModel):
    __tablename__ = "procedures"

    id = Column(Integer, primary_key=True, autoincrement=True)

    ##############################
    ##                          ##
    ##           Data           ##
    ##                          ##
    ##############################
    name = Column(String(50), nullable=False)
    description = Column(String(255), nullable=False)

    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################
    procedures_is_performed_in_session = relationship("ProceduresIsPerformedInSession", back_populates="procedure")
    # disease = relationship("Diseases", back_populates="diseases_have_symptoms")
    # symptom = relationship("Symptoms", back_populates="diseases_have_symptoms")