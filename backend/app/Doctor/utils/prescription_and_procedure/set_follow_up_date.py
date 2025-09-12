def set_follow_up_date(sessionID, follow_up_date, user_id):
	from ....database.models import Appointments, Sessions, HaveSession, Patients, Users
	from ....database import db

	from sqlalchemy import select

	

	#change session follow up date
	# session = Sessions.query.filter(id = sessionID).first()
	session = db.session.query(Sessions).filter(Sessions.id == sessionID).first()
	session.follow_up_date = follow_up_date
	

	stmt = select(
		Patients.id,
	).where(
		Sessions.id == sessionID
	).join(
		Sessions.have_session
	).join(
		HaveSession.patient
	)

	# result 
	patient_id = db.session.execute(stmt).scalar_one()
	
	user = db.session.query(Users).filter(Users.id == user_id).first()
	
	appointment = Appointments(
		appointment_time = follow_up_date,
		patient_id = patient_id,
		doctor = user,
		department = user.department,
		type = "follow_up",
		status = "Unchecked"
	)

	db.session.add(appointment)
	

	db.session.commit()

	
	