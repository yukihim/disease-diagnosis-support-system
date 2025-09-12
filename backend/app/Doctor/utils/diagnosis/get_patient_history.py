"""
Author: nhoxtin15
Model Description:
    
Date Created: 26/04/2025
Last Updated: 26/04/2025
"""

from ....database import db

from ....database.models import Patients, Sessions, HaveSession,Users

def get_patient_history(patient_id: int):
    """
    Get all sessions of a patient
    Args:
        patient_id (int): id of the patient
    Returns:
        list: list of sessions
    """
    from sqlalchemy import select
    import datetime

    now = datetime.datetime.now()

    stmt = select(
        Sessions.date,
        Sessions.type,
        Users.name,
        Users.department,
        Sessions.final_diagnosis,
        Sessions.id
    ).join(
        Patients.have_session
    ).join(
        HaveSession.user
    ).where(
        Patients.id == patient_id,
        Sessions.date < now,
        Sessions.state == 9
    )
    result = db.session.execute(stmt).all()
    ans = []

    for row in result:
        ans.append({
            'sessionID': row[5],
            'sessionDate': row[0].strftime('%d-%m-%Y'),
            'sessionType': row[1],
            'personInCharged': row[2],
            'department': row[3],
            'result': row[4]
        })

    return ans