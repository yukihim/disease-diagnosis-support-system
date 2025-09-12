"""
Author: nhoxtin15
Model Description:
    
Date Created: 22/04/2025
Last Updated: 22/04/2025
"""


from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship

from .base_model import BaseModel


class HaveSession(BaseModel):
    __tablename__ = "have_session"

    id = Column(Integer, primary_key=True, autoincrement=True)


    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################
    session_id = Column(Integer, ForeignKey("sessions.id"), nullable=False)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    nurse_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    # disease_id = Column(Integer, ForeignKey("diseases.id"), nullable=False)

    session = relationship("Sessions", back_populates="have_session")
    patient = relationship("Patients", back_populates="have_session")
    user = relationship("Users", back_populates="have_session",foreign_keys="HaveSession.user_id")
    nurse = relationship("Users", back_populates="nurse_have_session",foreign_keys="HaveSession.nurse_id")
    # disease = relationship("Diseases", back_populates="have_session")



    CheckConstraint("user_id IN (SELECT id FROM users WHERE role = 'doctor')", name="check_user_id")
    


