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
    status = Column(String(50), nullable=False, default="incoming")

    note = Column(String(50), nullable=False, default="No note")
    type = Column(String(50), nullable=False, default="outpatient")
    from_room = Column(String(50) , nullable=False, default="receptionist")

    # vital sign
    blood_pressure = Column(String, nullable=True)
    heart_rate = Column(Integer, nullable=True)
    temperature = Column(Float, nullable=True)
    breathing_rate = Column(Integer, nullable=True)
    oxygen_saturation = Column(Float, nullable=True)


    preliminary_diagnosis = Column(String(50))


    follow_up_date = Column(DateTime, nullable=True)

    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################

    # One to many relationship with Have_Session
    have_session = relationship("HaveSession", back_populates="session")
    # One to many relationship with SessionsHaveTests
    sessions_have_tests = relationship("SessionsHaveTests", back_populates="session")

    ##############################
    ##                          ##
    ##        Constraint        ##
    ##                          ##
    ##############################

    CheckConstraint("user_id IN (SELECT id FROM users WHERE role = 'doctor')", name="check_user_id")
    CheckConstraint("status IN ('incoming', 'on_going','on_test','coming_back_from_test,'completed')", name="check_status")
    CheckConstraint("type IN ('inpatient', 'outpatient')", name="check_type")

    ##############################
    ##                          ##
    ##       Constructor        ##
    ##                          ##
    ##############################
    def __init__(self, follow_up_date, status):
        # get current date
        self.date = func.now()
        self.follow_up_date = follow_up_date
        self.status = status






    def __repr__(self):
        return f"Session(id={self.id}, date={self.date}, status={self.status})"
