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

    medicine_name = Column(String(50), nullable=False)
    medicine_code = Column(String(20), nullable=False, unique=True)


class MedicineContradiction(BaseModel):
    __tablename__ = "medicine_contradictions"

    id = Column(Integer, primary_key=True, autoincrement=True)

    medicine_id = Column(Integer, ForeignKey("medicines.id"), nullable=False)
    contradiction_id = Column(Integer, ForeignKey("medicines.id"), nullable=False)

    medicine = relationship("Medicines", foreign_keys=[medicine_id])
    contradiction = relationship("Medicines", foreign_keys=[contradiction_id])

