"""
Author: nhoxtin15
Model Description:
    
Date Created: 26/04/2025
Last Updated: 26/04/2025
"""


from ....database import db
from ....database.models import Appointments, Patients

def get_appointments(doctor_id:int):
    """
    Get all appointments of a doctor
    Args:
        doctor_id (int): id of the doctor
    Returns:
        list: list of appointments
    """
    from sqlalchemy import select
    stmt = select(Patients.name, Appointments.appointment_time, Appointments.type).join(Patients.appointments.and_(Appointments.doctor_id == doctor_id))
    result = db.session.execute(stmt).all()
    ans = []

    for row in result:
        ans.append({
            'name': row[0],
            'time': row[1].time().strftime("%H:%M"),
            'condition': row[2]
        })

    return ans
