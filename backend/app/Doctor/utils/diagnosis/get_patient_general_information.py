"""
Author: nhoxtin15
Model Description:
    
Date Created: 26/04/2025
Last Updated: 26/04/2025
"""


def get_patient_general_information(session_id: int):
    """
    Get general information of a patient by id
    """
    from ....database.models import Patients, Sessions, HaveSession
    from sqlalchemy import select

    stmt = select(
        Patients.name,
        Patients.gender,
        Patients.phone,
        Patients.ssn,
        Patients.height,
        Patients.weight,
        Patients.street, Patients.district, Patients.city,
        Patients.health_insurance_number,
        Patients.job,
        Patients.date_of_birth,
        Sessions.follow_up_date,
        Sessions.type
    ).join(
        Sessions.have_session
    ).join(
        HaveSession.patient
    ).where(
        Sessions.id == session_id
    )

    from ....database import db
    result = db.session.execute(stmt).all()
    ans = None
    import logging
    _logger = logging.getLogger(__name__)
    _logger.info(stmt)
    _logger.info(result)
    from datetime import datetime


    for row in result:
        ans= {
            'name': row[0],
            'gender': row[1],
            'phone': row[2],
            'ssn': row[3],
            'height': row[4],
            'weight': row[5],
            'address': f"{row[6]}, {row[7]}, {row[8]}",
            'hic': row[9],
            'job': row[10],
            'dob': row[11].strftime('%Y-%m-%d'),
            'age': datetime.today().year - row[11].year - ((datetime.today().month, datetime.today().day) < (row[11].month, row[11].day)),
            'followUpDate': row[12] if row[12] else None,
            'type': row[13]
        }
    return ans

