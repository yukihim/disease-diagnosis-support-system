
"""
Author: nhoxtin15
Model Description:
    
Date Created: 26/04/2025
Last Updated: 26/04/2025
"""

from ..models import Procedures

import os

file_path = os.path.join(os.path.dirname(__file__), 'csv', 'procedures.csv')

def create_procedures():
    from ... import db
    import pandas as pd

    # to list of dict
    df = pd.read_csv(file_path)
    list_test_data = df.to_dict(orient='records')

    for procedure in list_test_data:
        for key, value in procedure.items():
            if pd.isna(value):
                procedure[key] = None
        new_procedure = Procedures(
            name=procedure['name'],
            description=procedure['description']
        )

        db.session.add(new_procedure)
    db.session.commit()
    return True


def create_test_data():
    try:
        create_procedures()

    except Exception as e:
        import logging
        logging.getLogger(__name__).error("Error creating test data")
        logging.getLogger(__name__).error(e)
        return False


from .test_data_generator import list_function

list_function.append(create_test_data)
