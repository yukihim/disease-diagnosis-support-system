"""
Author: nhoxtin15
Model Description:
    This module is used to store test data for the Sessions model

Date Created: 31/03/2025
Last Updated: 31/03/2025
"""

from ..models import Sessions

collumn = ['status', 'follow_up_date']

# list_test_data = [
#     {
#         'status': 'incoming',
#         'follow_up_date': '2025-04-01',
#     },
#     {
#         'status': 'incoming',
#         'follow_up_date': '2025-04-01',
#     },
#     {
#         'status': 'on_test',
#         'follow_up_date': None,
#     },
#     {
#         'status': 'on_test',
#         'follow_up_date': None,
#     },
#     {
#         'status': 'on_test',
#         'follow_up_date': '2025-04-01',
#     },
#     {
#         'status': 'coming_back_from_test',
#         'follow_up_date': '2025-04-01',
#     },
#
# ]

import os
file_path = os.path.join(os.path.dirname(__file__), 'csv', 'sessions.csv')

def create_session():
    from ... import db
    import pandas as pd
    # to list of dict
    df = pd.read_csv(file_path)
    list_test_data = df.to_dict(orient='records')
    # change nanl to None

    for session in list_test_data:
        for key, value in session.items():
            if pd.isna(value):
                session[key] = None
        current_session = Sessions(
            status=session['status'],
            follow_up_date=session['follow_up_date'],
        )

        db.session.add(current_session)
    db.session.commit()
    return True


def create_test_data():
    try:
        create_session()

    except Exception as e:
        import logging
        logging.getLogger(__name__).error("Error creating test data")
        logging.getLogger(__name__).error(e)
        return False

from .test_data_generator import list_function

list_function.append(create_test_data)
