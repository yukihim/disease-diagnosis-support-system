"""
Author: nhoxtin15
Model Description:
    
Date Created: 25/04/2025
Last Updated: 25/04/2025
"""

from ..models import SessionsHaveTests

import os
file_path = os.path.join(os.path.dirname(__file__), 'csv', 'sessions_have_tests.csv')



def create_sessions_have_tests():
    from ... import db
    import pandas as pd
    # to list of dict
    df = pd.read_csv(file_path)
    list_test_data = df.to_dict(orient='records')
    for sessions_have_test in list_test_data:
        for key, value in sessions_have_test.items():
            if pd.isna(value):
                sessions_have_test[key] = None
        new_sessions_have_test = SessionsHaveTests(
            session_id=sessions_have_test["session_id"],
            test_id=sessions_have_test["test_id"],
        )
        db.session.add(new_sessions_have_test)
    db.session.commit()
    return True


def create_test_data():
    try:
        create_sessions_have_tests()

    except Exception as e:
        import logging
        logging.getLogger(__name__).error("Error creating test data")
        logging.getLogger(__name__).error(e)
        return False


from .test_data_generator import list_function

list_function.append(create_test_data)
