"""
Author: nhoxtin15
Model Description:
    
Date Created: 02/05/2025
Last Updated: 02/05/2025
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey,CheckConstraint ,Float
from sqlalchemy.orm import relationship
import datetime
from .base_model import BaseModel

class Vital_signs (BaseModel):
    __tablename__ = "vital_signs"

                        
    id = Column(Integer, primary_key=True, autoincrement=True)

    blood_pressure = Column(String, nullable=True)
    heart_rate = Column(Integer, nullable=True)
    temperature = Column(Float, nullable=True)
    breathing_rate = Column(Integer, nullable=True)
    oxygen_saturation = Column(Float, nullable=True)
    time_recorded = Column(DateTime, nullable=False, default=datetime.datetime.now)

    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################

    session_id = Column(Integer, ForeignKey("sessions.id"), nullable=False)
    session = relationship("Sessions", back_populates="vital_signs")

    record_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    record_by_user = relationship("Users", back_populates="vital_signs")

    



