"""
Author: nhoxtin15
Model Description:
    
Date Created: 26/04/2025
Last Updated: 26/04/2025
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship

from .base_model import BaseModel


class Inpatient_session(BaseModel):
    __tablename__ = "inpatient_session"

    id = Column(Integer, primary_key=True, autoincrement=True)

    ##############################
    ##                          ##
    ##           Data           ##
    ##                          ##
    ##############################
    admission_date = Column(DateTime, nullable=False)
    discharge_date = Column(DateTime, nullable=True)
    room_number = Column(String(50), nullable=False)
    condition = Column(String(50), nullable=False, default="Heart Surgery")
    status = Column(String(50), nullable=False, default="normal")
    note = Column(String(50), nullable=False, default="No note")

    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    patient = relationship("Patients", back_populates="inpatient_session")

    doctor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    doctor = relationship("Users", back_populates="inpatient_session")

    ##############################
    ##                          ##
    ##        Constraint        ##
    ##                          ##
    ##############################
    CheckConstraint("patient_id IN (SELECT id FROM patients WHERE status = 'inpatient')", name="check_patient_id")
    CheckConstraint("doctor_id IN (SELECT id FROM users WHERE role = 'doctor')", name="check_doctor_id")
    ##############################
    ##                          ##
    ##       Constructor        ##
    ##                          ##
    ##############################

    def __init__(self, admission_date, room_number, status, note,patient_id,doctor_id,discharge_date=None):
        self.admission_date = admission_date
        self.discharge_date = discharge_date
        self.room_number = room_number
        self.status = status
        self.note = note
        self.patient_id = patient_id
        self.doctor_id = doctor_id