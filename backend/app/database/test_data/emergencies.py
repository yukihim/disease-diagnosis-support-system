
"""
Author: nhoxtin15
Model Description:
    
Date Created: 26/04/2025
Last Updated: 26/04/2025
"""

from ..models import Emergencies

import os

file_path = os.path.join(os.path.dirname(__file__), 'csv', 'emergencies.csv')

def create_emergencies():
    from ... import db
    import pandas as pd

    # to list of dict
    df = pd.read_csv(file_path)
    list_test_data = df.to_dict(orient='records')

    for emergency in list_test_data:
        for key, value in emergency.items():
            if pd.isna(value):
                emergency[key] = None
        
        new_emergency = Emergencies(
            description=emergency['description'],
            department=emergency['department'],
            time=emergency['time'],
            status=emergency['status']
        )

        db.session.add(new_emergency)
    db.session.commit()
    return True


def create_test_data():
    try:
        create_emergencies()

    except Exception as e:
        import logging
        logging.getLogger(__name__).error("Error creating test data")
        logging.getLogger(__name__).error(e)
        return False


from .test_data_generator import list_function

list_function.append(create_test_data)
