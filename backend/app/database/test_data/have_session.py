"""
Author: nhoxtin15
Model Description:
    This module is used to store test data for the User model
    
Date Created: 31/03/2025
Last Updated: 31/03/2025
"""

from ..models import HaveSession

import os
file_path = os.path.join(os.path.dirname(__file__), 'csv', 'have_session.csv')


def create_have_session():
    from ... import db
    import pandas as pd
    # to list of dict
    df = pd.read_csv(file_path)
    list_test_data = df.to_dict(orient='records')

    for have_session in list_test_data:
        for key, value in have_session.items():
            if pd.isna(value):
                have_session[key] = None
        new_have_session = HaveSession(
            session_id=have_session["session_id"],
            user_id=have_session["user_id"],
            health_insurance_number=have_session["health_insurance_number"],
        )
        db.session.add(new_have_session)
    db.session.commit()
    return True


def create_test_data():
    try:
        create_have_session()

    except Exception as e:
        import logging
        logging.getLogger(__name__).error("Error creating test data")
        logging.getLogger(__name__).error(e)
        return False


from .test_data_generator import list_function

list_function.append(create_test_data)
