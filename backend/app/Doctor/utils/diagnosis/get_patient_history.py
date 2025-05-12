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
        Users.name
    ).join(
        Patients.sessions
    ).where(
        Patients.id == patient_id,
        Sessions.date < now
    ).join(
        Sessions.have_session
    ).join(
        HaveSession.user
    )
    result = db.session.execute(stmt).all()
    ans = []

    for row in result:
        ans.append({
            'date': row[0],
            'type': row[1],
            'doctor_name': row[2]
        })

    return ans