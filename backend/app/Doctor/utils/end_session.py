def end_session(sessionID):
	from ...database.models import Sessions
	from ...database import db
	session = db.session.query(Sessions).filter(Sessions.id == sessionID).first()
	session.state = 9
	db.session.commit()
