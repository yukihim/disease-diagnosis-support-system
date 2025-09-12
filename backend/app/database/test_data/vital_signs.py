"""
Author: nhoxtin15
Model Description:
    
Date Created: 03/05/2025
Last Updated: 03/05/2025
"""

from ..models import Vital_signs

import os

file_path = os.path.join(os.path.dirname(__file__), 'csv', 'vital_signs.csv')

def create_vital_signs():
    from ... import db
    import pandas as pd

    # to list of dict
    df = pd.read_csv(file_path)
    list_test_data = df.to_dict(orient='records')

    for vital_sign in list_test_data:
        for key, value in vital_sign.items():
            if pd.isna(value):
                vital_sign[key] = None
        new_vital_sign = Vital_signs(
            blood_pressure=vital_sign['blood_pressure'],
            heart_rate=vital_sign['heart_rate'],
            temperature=vital_sign['temperature'],
            breathing_rate=vital_sign['breathing_rate'],
            oxygen_saturation=vital_sign['oxygen_saturation'],
            session_id=vital_sign['session_id'],
            time_recorded=vital_sign['time_recorded'] if vital_sign['time_recorded'] else None,
            record_by=vital_sign['record_by']
        )

        db.session.add(new_vital_sign)
    db.session.commit()
    return True


def create_test_data():
    try:
        create_vital_signs()

    except Exception as e:
        import logging
        logging.getLogger(__name__).error("Error creating test data")
        logging.getLogger(__name__).error(e)
        return False


from .test_data_generator import list_function

list_function.append(create_test_data)
