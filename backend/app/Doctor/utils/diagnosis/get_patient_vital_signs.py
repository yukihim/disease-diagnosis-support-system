"""
Author: nhoxtin15
Model Description:
    
Date Created: 28/04/2025
Last Updated: 28/04/2025
"""

def get_patient_vital_signs(session_id):
    """
    Get patient vital signs
    """
    from app.database import db
    from sqlalchemy import select
    from app.database.models import Sessions, HaveSession, Patients, Vital_signs

    # get patient vital signs
    stmt = select(
        Vital_signs.blood_pressure,
        Vital_signs.heart_rate,
        Vital_signs.temperature,
        Vital_signs.breathing_rate,
        Vital_signs.oxygen_saturation,
        Patients.weight,
        Patients.height,
        Vital_signs.time_recorded,
    ).join(
        Vital_signs.session.and_(Sessions.id == session_id)
    ).join(
        Sessions.have_session
    ).join(
        HaveSession.patient
    )




    result = db.session.execute(stmt).all()


    ans =[]
    for row in result:
        temp_vital_sign = {
            # time in format: yyyy-mm-dd hh:mm:ss
            "timeMeasured": row[7].strftime("%Y-%m-%d %H:%M:%S") if row[7] else None,
            "bloodPressure": row[0],
            "pulse": row[1],
            "breathingRate": row[3],
            "temperature": row[2],
            "bmi": row[5] / ((row[6] / 100) ** 2) if row[5] and row[6] else None,
            "oxygenSaturation": row[4],



        }
        ans.append(temp_vital_sign)



    return ans
