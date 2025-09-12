"""
Author: nhoxtin15
Model Description:
    This module is used to store test data for the User model
    
Date Created: 31/03/2025
Last Updated: 31/03/2025
"""

from ..models import Patients


import os
file_path = os.path.join(os.path.dirname(__file__), 'csv', 'medicines.csv')


def create_medicines():
    from ... import db
    import pandas as pd
    # to list of dict
    #divide the csv into 10000 row each to insert
    df = pd.read_csv(file_path).to_dict(orient='records')
    for medicine in df:
        from ..models import Medicines
        new_medicine = Medicines(
            medicine_name=medicine['medicine_name'],
            # medicine_code=medicine['medicine_code']
        )
        db.session.add(new_medicine)
    db.session.commit()
		
    # change nanl to None


    return True


def create_test_data():
    try:
        create_medicines()

    except Exception as e:
        import logging
        logging.getLogger(__name__).error("Error creating test data")
        logging.getLogger(__name__).error(e)
        return False

from .test_data_generator import list_function

list_function.append(create_test_data)
