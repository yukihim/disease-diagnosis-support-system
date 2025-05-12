"""
Author: nhoxtin15
Model Description:

Date Created: 18/04/2025
Last Updated: 18/04/2025
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from .base_model import BaseModel
from .diseases import Diseases
from .symptoms import Symptoms

class DiseasesHaveSymptoms(BaseModel):
    __tablename__ = "diseases_have_symptoms"

    id = Column(Integer, primary_key=True, autoincrement=True)
    disease_id = Column(Integer, ForeignKey("diseases.id"), nullable=False)
    symptom_id = Column(Integer, ForeignKey("symptoms.id"), nullable=False)

    # disease = relationship("Diseases", back_populates="diseases_have_symptoms")
    # symptom = relationship("Symptoms", back_populates="diseases_have_symptoms")