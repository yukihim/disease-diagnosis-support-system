"""
Author: nhoxtin15
Model Description:
    This module is for storing the appointment model of the database
    This file is created to avoid circular import
Date Created: 18/04/2025
Last Updated: 18/04/2025
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey,CheckConstraint, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .base_model import BaseModel




class Monitoring_Devices(BaseModel):
    __tablename__ = "monitoring_devices"

    id = Column(Integer, primary_key=True, autoincrement=True)

    ##############################
    ##                          ##
    ##           Data           ##
    ##                          ##
    ##############################
    
    name = Column(String(50), nullable=False)
    token = Column(String(50), nullable=False)
    type_device = Column(String(50), nullable=False)
    active = Column(Boolean, nullable=False, default=True)

    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################
    
    values = relationship("Device_values", back_populates="device")

    ##############################
    ##                          ##
    ##        Constraint        ##
    ##                          ##
    ##############################
    
    CheckConstraint("type_device IN ('heart_rate', 'blood_pressure', 'temperature', 'respiratory_rate', 'blood_sugar')", name="check_type_device")

    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################

    session_id = Column(Integer,ForeignKey("inpatient_session.id"), nullable=True,index=True)
    session = relationship("Inpatient_session", back_populates="devices")


class Device_values(BaseModel):
    __tablename__ = "device_values"

    id = Column(Integer, primary_key=True, autoincrement=True)
    
    ##############################
    ##                          ##
    ##           Data           ##
    ##                          ##
    ##############################
    
    value = Column(String(50), nullable=False)
    time_stamp = Column(DateTime, nullable=False, default=datetime.now)

    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################
    device_id = Column(Integer, ForeignKey("monitoring_devices.id"), nullable=False,index=True)
    device = relationship("Monitoring_Devices", back_populates="values")

    
    

    ##############################
    ##                          ##
    ##        Constraint        ##
    ##                          ##
    ##############################

    # blood_sugar, heart_rate, blood_pressure, temperature, espiratory Rate
    CheckConstraint("type_value IN ('blood_sugar', 'heart_rate', 'blood_pressure', 'temperature', 'respiratory_rate')", name="check_type_value")


    

    




