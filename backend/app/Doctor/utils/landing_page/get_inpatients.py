"""
Author: nhoxtin15
Model Description:
    
Date Created: 23/04/2025
Last Updated: 23/04/2025
"""
from sqlalchemy import select
from ....database.models import Sessions, Patients, HaveSession

def get_inpatients(user_id):
    """
    Function to get inpatients.
    """
    from ....database.models import Sessions, Patients, HaveSession, Inpatient_session
    from sqlalchemy import select

    stmt = select(
        Patients.name,
        Patients.gender,
        Patients.date_of_birth,
        Inpatient_session.condition,
        Inpatient_session.room_number,
        Inpatient_session.status,
        Inpatient_session.note,
        Inpatient_session.admission_date,
        Inpatient_session.id
    ).join(
        Inpatient_session.patient
    ).where(
        Inpatient_session.doctor_id == user_id,
        Inpatient_session.discharge_date == None
    )

    from ....database import db
    result = db.session.execute(stmt).all()
    ans = []
    import logging
    # _logger = logging.getLogger(__name__)
    # _logger.info(stmt)
    # _logger.info(result)

    
    from datetime import datetime
    for row in result:
        ans.append({
            'admissionDate': row[7].strftime('%d/%m/%Y'),
            'age': datetime.today().year - row[2].year - ((datetime.today().month, datetime.today().day) < (row[2].month, row[2].day)),
            'condition': row[3],
            'name': row[0],
            'room': row[4],
            'sessionID': row[8],
            'sex': row[1],
            'status': row[5],
            'note': row[6],
            
        })
    return ans
