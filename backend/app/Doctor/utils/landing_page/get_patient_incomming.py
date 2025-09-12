"""
Author: nhoxtin15
Model Description:
   This module contains the function to get incoming patients.
Date Created: 15/04/2025
Last Updated: 15/04/2025
"""


def get_incomming_patient(user_id):
    """
    Function to get incoming patients.
    """
    from ....database.models import Sessions, Patients, HaveSession
    from sqlalchemy import select, or_

    stmt = select(
        Patients.name,
        Patients.gender,
        Sessions.state,
        Sessions.from_room,
        Sessions.note,
        Patients.date_of_birth,
        Sessions.id
    ).join(
        Patients.have_session.and_(or_(HaveSession.user_id == user_id,HaveSession.nurse_id == user_id))
    ).join(
        HaveSession.session.and_(
            Sessions.state.in_([
                1,# 1: Waiting for Nurse Measure
                2,# 2: Waiting for Diagnosis
                3,# 3: Diagonosing
                8,# 8: Back for Test
            ]),
        )
    )

    from app.utils.state_dict import state_dict
    from ....database import db
    result = db.session.execute(stmt).all()
    # convert to list of dict
    ans = []
    import logging
    _logger = logging.getLogger(__name__)
    _logger.info(stmt)
    _logger.info(result)
    from datetime import datetime
    for row in result:
        temp_patient = {
            "age": datetime.today().year - row[5].year - ((datetime.today().month, datetime.today().day) < (row[5].month, row[5].day)),
            "from": row[3],
            "name": row[0],
            "note": row[4],
            "sessionID": row[6],
            "sex": row[1],
            "state": state_dict[row[2]],
        }
        ans.append(temp_patient)
    return ans








