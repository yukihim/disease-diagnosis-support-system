
"""
Author: nhoxtin15
Model Description:
    
Date Created: 26/04/2025
Last Updated: 26/04/2025
"""

from ..models import Appointments

import os

file_path = os.path.join(os.path.dirname(__file__), 'csv', 'appointments.csv')

def create_appointments():
    from ... import db
    import pandas as pd

    # to list of dict
    df = pd.read_csv(file_path)
    list_test_data = df.to_dict(orient='records')

    for appointment in list_test_data:
        for key, value in appointment.items():
            if pd.isna(value):
                appointment[key] = None
        new_appointment = Appointments(
            appointment_time=appointment['appointment_time'],
            patient_id=appointment['patient_id'],
            doctor_id=appointment['doctor_id'],
            type=appointment['type']
        )

        db.session.add(new_appointment)
    db.session.commit()
    return True


def create_test_data():
    try:
        create_appointments()

    except Exception as e:
        import logging
        logging.getLogger(__name__).error("Error creating test data")
        logging.getLogger(__name__).error(e)
        return False


from .test_data_generator import list_function

list_function.append(create_test_data)
