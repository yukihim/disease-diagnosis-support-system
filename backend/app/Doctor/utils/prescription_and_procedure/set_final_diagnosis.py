def set_final_diagnosis(sessionID, final_diagnosis):
	from ....database.models import Sessions
	from ....database import db
	session = db.session.query(Sessions).filter(Sessions.id == sessionID).first()
	session.final_diagnosis = final_diagnosis
	db.session.commit()