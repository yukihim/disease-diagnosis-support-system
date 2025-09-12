"""
Author: nhoxtin15
Model Description:
    This module is used to store test data for the Sessions model

Date Created: 31/03/2025
Last Updated: 31/03/2025
"""

from ..models import Sessions

collumn = ['status', 'follow_up_date']


import os
file_path = os.path.join(os.path.dirname(__file__), 'csv', 'sessions.csv')

def create_session():
    from ... import db
    import pandas as pd
    # to list of dict
    df = pd.read_csv(file_path, chunksize=1000, encoding='utf-8')
    for chunk in df:
        list_test_data = chunk.to_dict(orient='records')
        # change nanl to None
        for session in list_test_data:
            for key, value in session.items():
                if pd.isna(value):
                    session[key] = None
        # change state to int
        for session in list_test_data:
            for key, value in session.items():
                if pd.isna(value):
                    session[key] = None
            current_session = Sessions(
                state=session['state'],
                follow_up_date=session['follow_up_date'],
                preliminary_diagnosis=session['preliminary_diagnosis'] if session['preliminary_diagnosis'] else '',
                final_diagnosis=session['final_diagnosis'] if session['final_diagnosis'] else '',
                note=session['note'],
                from_room=session['from_room'],
                department=session['department'] if session['department'] else 'Cardiology',
            )
            db.session.add(current_session)
        db.session.commit()

    # change nanl to None





    return True


def create_test_data():
    create_session()



from .test_data_generator import list_function

list_function.append(create_test_data)
