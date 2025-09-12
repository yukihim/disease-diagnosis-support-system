"""
Author: nhoxtin15
Model Description:
    This module is used to store test data for the User model
    
Date Created: 31/03/2025
Last Updated: 31/03/2025
"""

from ..models import Patients


import os
file_path = os.path.join(os.path.dirname(__file__), 'csv', 'patients.csv')


def create_patients():
    from ... import db
    import pandas as pd
    # to list of dict
    #divide the csv into 10000 row each to insert
    df = pd.read_csv(file_path, chunksize=1000, encoding='utf-8')
    for chunk in df:
        list_test_data = chunk.to_dict(orient='records')
        for patient in list_test_data:
            for key, value in patient.items():
                if pd.isna(value):
                    patient[key] = None
            new_patient = Patients(
                name=patient["name"],
                ssn=patient["ssn"],
                health_insurance_number=patient["health_insurance_number"],
                street=patient["street"],
                district=patient["district"],
                city=patient["city"],
                phone=patient["phone"],
                gender=patient["gender"],
                date_of_birth=patient["date_of_birth"],
                weight=patient["weight"],
                height=patient["height"],
                job=patient["job"],

            )
            db.session.add(new_patient)
        db.session.commit()
    # change nanl to None


    return True


def create_test_data():
    try:
        create_patients()

    except Exception as e:
        import logging
        logging.getLogger(__name__).error("Error creating test data")
        logging.getLogger(__name__).error(e)
        return False

from .test_data_generator import list_function

list_function.append(create_test_data)
