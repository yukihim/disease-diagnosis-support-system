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
    from sqlalchemy import select

    stmt = select(
        Patients.name, Patients.gender, Sessions.status, Sessions.from_room, Sessions.note, Patients.date_of_birth, Sessions.id
    ).join(
        Patients.have_session.and_(HaveSession.user_id == user_id)
    ).join(
        HaveSession.session.and_(
            Sessions.status.in_(["incoming", "coming_back_from_test"]),
        )
    )


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
            "name": row[0],
            "sex": row[1],
            "age": datetime.today().year - row[5].year - ((datetime.today().month, datetime.today().day) < (row[5].month, row[5].day)),
            "from_room": row[3],
            "status": row[2],
            "note": row[4],
            "session_id": row[6],
        }
        ans.append(temp_patient)
    return ans








