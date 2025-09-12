def check_follow_up(patientID):
    from ...database.models import Patients,Sessions, HaveSession, Users
    from sqlalchemy import select
    stmt = select(
        Sessions.final_diagnosis,
        Users.name,
        Users.department
    ).join(
        Sessions.have_session
    ).join(
        HaveSession.patient
	).join(
        HaveSession.user
	).where(
        Patients.id == patientID
    ).order_by(
        Sessions.date.desc()
	)
    from ...database import db
    result = db.session.execute(stmt)
    ans = result.scalar_one_or_none()
    if ans:
        return {
            "reasonToVisit": f"Follow up for {ans[0]}",
            "doctor": ans[1],
            "department": ans[2]
		}
    else:
        return {
            "reasonToVisit": "No follow up date",
            "doctor": "No doctor",
            "department": "No department"
		}
    
    
    
    
    

    
    
    
	