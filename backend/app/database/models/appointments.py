"""
Author: nhoxtin15
Model Description:
    This module is for storing the appointment model of the database
    This file is created to avoid circular import
Date Created: 18/04/2025
Last Updated: 18/04/2025
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey,CheckConstraint
from sqlalchemy.orm import relationship

from .base_model import BaseModel




class Appointments(BaseModel):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, autoincrement=True)

    ##############################
    ##                          ##
    ##           Data           ##
    ##                          ##
    ##############################
    appointment_time = Column(DateTime, nullable=False)
    type = Column(String(50), nullable=False, default="general")
    status = Column(String(50), nullable=False, default="Unchecked")
    department = Column(String(50), nullable=False, default="Cardiology")
    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    patient = relationship("Patients", back_populates="appointments")
    doctor = relationship("Users", back_populates="appointments")

    ##############################
    ##                          ##
    ##        Constraint        ##
    ##                          ##
    ##############################

    CheckConstraint("doctor_id IN (SELECT id FROM users WHERE role = 'doctor')", name="check_doctor_id")
    CheckConstraint("type IN ('general', 'follow_up')", name="check_type")

    




