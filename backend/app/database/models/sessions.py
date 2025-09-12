"""
Author: nhoxtin15
Model Description:
    
Date Created: 19/04/2025
Last Updated: 19/04/2025
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey,CheckConstraint ,Float
from sqlalchemy.orm import relationship
from sqlalchemy import func, select
from .base_model import BaseModel

class Sessions(BaseModel):
    __tablename__ = "sessions"

    ##############################
    ##                          ##
    ##           Data           ##
    ##                          ##
    ##############################

    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(DateTime, nullable=False, default=func.now())

    state = Column(Integer, nullable=False, default=1)
    # patientStates = {
    #     1: "Waiting Nurse Measure",
    #     2: "Waiting For Diagnosis",
    #     3: "Diagnosis On Going",
    #     4: "Waiting For Test",
    #     5: "Test On Going",
    #     6: "Waiting For Result",
    #     7: "Result Ready",
    #     8: "Back From Test",
    #     9: "End Session"
    # }

    note = Column(String(50), nullable=False, default="No note")
    type = Column(String(50), nullable=False, default="Outpatient")
    from_room = Column(String(50), nullable=False, default="receptionist")
    department=Column(String(50), nullable=False, default="Cardiology")

    # vital sign


    preliminary_diagnosis = Column(String, nullable=True, default="")
    final_diagnosis = Column(String, nullable=True, default="")

    follow_up_date = Column(DateTime, nullable=True)

    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################
    medicines_is_prescribed_in_session = relationship("MedicinesIsPrescribedInSession", back_populates="session")
    # One to many relationship with Have_Session
    have_session = relationship("HaveSession", back_populates="session")
    # One to many relationship with SessionsHaveTests
    sessions_have_tests = relationship("SessionsHaveTests", back_populates="session")
    # One to many relationship with Vital_sign
    vital_signs = relationship("Vital_signs", back_populates="session")
    # One to many relationship with ProceduresIsPerformedInSession
    procedures_is_performed_in_session = relationship("ProceduresIsPerformedInSession", back_populates="session")
    ##############################
    ##                          ##
    ##        Constraint        ##
    ##                          ##
    ##############################

    CheckConstraint("user_id IN (SELECT id FROM users WHERE role = 'doctor')", name="check_user_id")
    CheckConstraint("state IN (1, 2, 3, 4, 8, 9)", name="check_status")
    CheckConstraint("type IN ('Inpatient', 'Outpatient')", name="check_type")

    






    def __repr__(self):
        return f"Session(id={self.id}, date={self.date}, status={self.status})"
