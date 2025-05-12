"""
Author: nhoxtin15
Model Description:
    
Date Created: 26/04/2025
Last Updated: 26/04/2025
"""





from ..models import Inpatient_session
import os
file_path = os.path.join(os.path.dirname(__file__), 'csv', 'inpatient_sessions.csv')
def create_inpatient_session():
    from ... import db
    import pandas as pd
    # to list of dict
    df = pd.read_csv(file_path)
    list_test_data = df.to_dict(orient='records')

    for inpatient_session in list_test_data:
        for key, value in inpatient_session.items():
            if pd.isna(value):
                inpatient_session[key] = None
        new_inpatient_session = Inpatient_session(
            admission_date=inpatient_session['admission_date'],
            room_number=inpatient_session['room_number'],
            status=inpatient_session['status'],
            note=inpatient_session['note'],
            patient_id=inpatient_session['patient_id'],
            doctor_id=inpatient_session['doctor_id'],
        )
        db.session.add(new_inpatient_session)
    db.session.commit()
    return True


def create_test_data():
    try:
        create_inpatient_session()

    except Exception as e:
        import logging
        logging.getLogger(__name__).error("Error creating test data")
        logging.getLogger(__name__).error(e)
        return False


from .test_data_generator import list_function

list_function.append(create_test_data)
