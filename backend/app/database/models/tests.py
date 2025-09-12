"""
Author: nhoxtin15
Model Description:
    
Date Created: 18/04/2025
Last Updated: 18/04/2025
"""


from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, CheckConstraint, Float
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
    state = Column(Integer, nullable=False, default=4)
    note = Column(String, nullable=True)


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
    CheckConstraint("state IN (4,6,7,9)", name="check_status")

    def save_test_result(self, test_result):
        import os
        import json
        file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)),'file_system','test', str(self.id) + ".json")
        with open(file_path, 'w') as f:
            json.dump(test_result, f)

    def get_test_result(self):
        if(self.state in [7,8]):
            import os
            import json
            file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)),'file_system','test', str(self.id) + ".json")
            import logging
            logging.getLogger(__name__).error(file_path)
            logging.getLogger(__name__).error(os.path.exists(file_path))
            logging.getLogger(__name__).error(os.path.dirname(os.path.dirname(__file__)))
            if os.path.exists(file_path):
                with open(file_path, 'r') as f:
                    return json.load(f)
            else:
                return None
        else:
            return None





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
    test_parameters = relationship("Test_parameters", back_populates="test_name")



    ##############################
    ##                          ##
    ##        Constraint        ##
    ##                          ##
    ##############################
    CheckConstraint("test_format IN ('json','image')", name="check_test_format")

    


class Test_parameters(BaseModel):
    __tablename__ = "test_parameters"

    id = Column(Integer, primary_key=True, autoincrement=True)
    ##############################
    ##                          ##
    ##           Data           ##
    ##                          ##
    ##############################

    parameter_name = Column(String(50), nullable=False)
    parameter_label = Column(String(50), nullable=False)
    parameter_unit = Column(String(50), nullable=False)
    parameter_normal_low = Column(String(50), nullable=True)
    parameter_normal_high = Column(String(50), nullable=True)
    
    ##############################
    ##                          ##
    ##       Relationship       ##
    ##                          ##
    ##############################

    test_name_id = Column(Integer, ForeignKey("test_names.id"), nullable=False)
    test_name = relationship("Test_names", back_populates="test_parameters")

    

    