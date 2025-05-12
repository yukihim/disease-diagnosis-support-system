"""
Author: nhoxtin15
Model Description:
    
Date Created: 19/04/2025
Last Updated: 19/04/2025
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .base_model import BaseModel


class SessionsHaveTests(BaseModel):
    __tablename__ = "sessions_have_tests"

    id = Column(Integer, primary_key=True, autoincrement=True)

    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################

    session_id = Column(Integer, ForeignKey("sessions.id"), nullable=False)
    session = relationship("Sessions", back_populates="sessions_have_tests")

    test = relationship("Tests", back_populates="sessions_have_tests")
    test_id = Column(Integer, ForeignKey("tests.id"), nullable=False)

    def __init__(self, session_id, test_id):
        self.session_id = session_id
        self.test_id = test_id