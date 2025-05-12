"""
Author: nhoxtin15
Model Description:
    
Date Created: 28/04/2025
Last Updated: 28/04/2025
"""

def get_patient_vital_signs(patient_id):
    """
    Get patient vital signs
    """
    from app.database import db
    from sqlalchemy import select
    from app.database.models import Sessions, HaveSession,Patients

    # get patient vital signs
    vital_signs = (select(
        Sessions.blood_pressure,
        Sessions.heart_rate,
        Sessions.temperature,
        Sessions.breathing_rate,
        Sessions.oxygen_saturation,
        Patients.weight,
        Patients.height,
    ).join(
        Sessions.have_session
    ).join(
        HaveSession.patient
    ).where(
        Sessions.id == patient_id
    ))


    # convert to dict
    vital_signs = [vital_sign.to_dict() for vital_sign in vital_signs]

    return vital_signs
