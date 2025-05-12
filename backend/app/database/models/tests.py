"""
Author: nhoxtin15
Model Description:
    
Date Created: 18/04/2025
Last Updated: 18/04/2025
"""


from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
from .base_model import BaseModel


class Tests(BaseModel):
    __tablename__ = "tests"

    id = Column(Integer, primary_key=True, autoincrement=True)

    ##############################
    ##                          ##
    ##           Data           ##
    ##                          ##
    ##############################

    test_date = Column(DateTime, nullable=False)
    test_result_path = Column(String(50), nullable=True)
    status = Column(String(50), nullable=False, default="waiting_for_test")
    note= Column(String, nullable=True)


    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################

    paraclinical_technician_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    paraclinical_technician = relationship("Users", back_populates="tests")

    test_name_id = Column(Integer, ForeignKey("test_names.id"), nullable=False)
    test_name = relationship("Test_names", back_populates="tests")

    sessions_have_tests = relationship("SessionsHaveTests", back_populates="test")

    ##############################
    ##                          ##
    ##        Constraint        ##
    ##                          ##
    ##############################

    CheckConstraint("user_id IN (SELECT id FROM users WHERE role = 'paraclinical_technician')", name="check_user_id")
    CheckConstraint("status IN ('waiting_for_test','on_going','waiting_for_result', 'test_completed')", name="check_status")

    ##############################
    ##                          ##
    ##       Constructor        ##
    ##                          ##
    ##############################
    def __init__(self, test_date, test_type, test_name, paraclinical_technician_id, status="waiting_for_test", note=None):
        self.test_date = test_date
        self.status = status
        self.note = note
        from .. import db
        from sqlalchemy import select

        stmt = select(Test_names.id).join(Test_names.test_type).filter(Test_names.test_name == test_name, Test_types.test_type == test_type)
        test_name = db.session.execute(stmt).scalar()
        if not test_name:
            raise ValueError("test_name not found")
        self.test_name_id = test_name

        from ..models import Users
        # check if paraclinical_technician_id is a paraclinical_technician
        paraclinical_technician = db.session.query(Users).filter(Users.id == paraclinical_technician_id).first()
        if not paraclinical_technician:
            raise ValueError("paraclinical_technician not found")
        if paraclinical_technician.role != "paraclinical_technician":
            raise ValueError("paraclinical_technician_id is not a paraclinical_technician")
        self.paraclinical_technician_id = paraclinical_technician.id

class Test_types(BaseModel):
    __tablename__ = "test_types"

    id = Column(Integer, primary_key=True, autoincrement=True)

    ##############################
    ##                          ##
    ##           Data           ##
    ##                          ##
    ##############################

    test_type = Column(String(50), nullable=False)
    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################

    test_name = relationship("Test_names", back_populates="test_type")
    ##############################
    ##                          ##
    ##       Constructor        ##
    ##                          ##
    ##############################
    def __init__(self, test_type):
        self.test_type = test_type
        from .. import db
        # check if test_type already exists
        test_type = db.session.query(Test_types).filter(Test_types.test_type == test_type).first()
        if test_type:
            raise ValueError("test_type already exists")

class Test_names(BaseModel):
    __tablename__ = "test_names"

    ##############################
    ##                          ##
    ##           Data           ##
    ##                          ##
    ##############################
    test_name = Column(String(50), nullable=False)
    test_format = Column(String(50), nullable=False)

    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################
    test_type_id = Column(Integer, ForeignKey("test_types.id"), nullable=False)
    test_type = relationship("Test_types", back_populates="test_name")
    tests = relationship("Tests", back_populates="test_name")


    ##############################
    ##                          ##
    ##        Constraint        ##
    ##                          ##
    ##############################
    CheckConstraint("test_format IN ('json','image')", name="check_test_format")

    def __init__(self, test_name, test_type, test_format):
        self.test_name = test_name
        # search test_type in test_types table

        from .. import db
        import logging
        logging.getLogger(__name__).info(test_type)
        test_type_1 = db.session.query(Test_types).filter(Test_types.test_type == test_type).first()



        if not test_type:
            raise ValueError("test_type not found")
        self.test_type_id = test_type_1.id
        self.test_format = test_format
