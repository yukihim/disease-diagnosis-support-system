"""
Author: nhoxtin15
Model Description:
    
Date Created: 18/04/2025
Last Updated: 18/04/2025
"""


from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .base_model import BaseModel

class Medicines(BaseModel):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, autoincrement=True)

    ##############################
    ##                          ##
    ##           Data           ##
    ##                          ##
    ##############################
    medicine_name = Column(String(50), nullable=False)
    
    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################
    medicines_is_prescribed_in_session = relationship("MedicinesIsPrescribedInSession", back_populates="medicine")


