def checkin_patient(patientID, data):
	from ...database.models import Sessions, HaveSession
	
	new_session = Sessions(
	)

	have_session = HaveSession(
		patient_id = patientID,
		session = new_session,
		user_id= 2,
		nurse_id= 4
	)

	from ...database import db

	db.session.add(new_session)
	db.session.add(have_session)
	db.session.commit()
	
	

