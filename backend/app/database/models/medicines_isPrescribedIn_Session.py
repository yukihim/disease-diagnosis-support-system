"""
Author: nhoxtin15
Model Description:
    
Date Created: 19/04/2025
Last Updated: 19/04/2025
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from .base_model import BaseModel
from .medicines import Medicines
from .sessions import Sessions

class MedicinesIsPrescribedInSession(BaseModel):
    __tablename__ = "medicines_is_prescribed_in_session"

    ##############################
    ##                          ##
    ##           Data           ##
    ##                          ##
    ##############################
    morning = Column(Integer, nullable=False, default=0)
    noon = Column(Integer, nullable=False, default=0)
    evening = Column(Integer, nullable=False, default=0)
    night = Column(Integer, nullable=False, default=0)
    duration = Column(Integer, nullable=False, default=0)
    note = Column(String, nullable=True)

    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################
    session_id = Column(Integer, ForeignKey("sessions.id"), nullable=False)
    medicine_id = Column(Integer, ForeignKey("medicines.id"), nullable=False)
    session = relationship("Sessions", back_populates="medicines_is_prescribed_in_session")
    medicine = relationship("Medicines", back_populates="medicines_is_prescribed_in_session")