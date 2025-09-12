"""
Author: nhoxtin15
Model Description:
    
Date Created: 18/04/2025
Last Updated: 18/04/2025
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .base_model import BaseModel



class Emergencies(BaseModel):
	__tablename__ = "emergencies"

	id = Column(Integer, primary_key=True, autoincrement=True)
	description = Column(String(200), nullable=False)
	department = Column(String(50), nullable=False)
	time = Column(DateTime, nullable=False)
	status = Column(String(50), nullable=False)
	
	
	
	
	
	