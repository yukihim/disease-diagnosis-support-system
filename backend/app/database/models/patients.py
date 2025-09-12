"""
Author: nhoxtin15
Model Description:
    
Date Created: 18/04/2025
Last Updated: 18/04/2025
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .base_model import BaseModel


class Patients(BaseModel):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, autoincrement=True)

    ##############################
    ##                          ##
    ##           Data           ##
    ##                          ##
    ##############################
    name = Column(String(50), nullable=False)
    ssn = Column(String(11), nullable=True, unique=True)
    health_insurance_number = Column(String(20), nullable=False, unique=True)

    street = Column(String(100), nullable=False)
    district = Column(String(50), nullable=False)
    city = Column(String(50), nullable=False)
    phone = Column(String(15), nullable=False)
    gender = Column(String(10), nullable=False)
    date_of_birth = Column(DateTime, nullable=False)

    job = Column(String(50), nullable=True)
    height = Column(Integer, nullable=True)
    weight = Column(Integer, nullable=True)



    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################

    # One to Many relationship with Sessions
    have_session = relationship("HaveSession", back_populates="patient")
    # One to Many relationship with Inpatient
    inpatient_session = relationship("Inpatient_session", back_populates="patient")
    appointments = relationship("Appointments", back_populates="patient")
    


    def send_for_test(self,test_types,room):
        """
        Function to send the patient for a test
        """
        pass

