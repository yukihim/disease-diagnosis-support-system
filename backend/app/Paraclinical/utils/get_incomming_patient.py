def get_incomming_patient(user_id):
	from ...database import db
	from ...database.models import Tests, Patients, Sessions,SessionsHaveTests, HaveSession
	from sqlalchemy import select

	# 	sessionID,
	# name, sex, age, from,
	# state, note

	stmt = select(
		Sessions.id,
		Patients.name,
		Patients.gender,
		Patients.date_of_birth,
		Sessions.from_room,
		Tests.state,
		Tests.note
	).join(
		Tests.sessions_have_tests
	).join(
		SessionsHaveTests.session
	).join(
		Sessions.have_session
	).join(
		HaveSession.patient
	).where(
		Tests.paraclinical_technician_id == user_id
	)

	results = db.session.execute(stmt).fetchall()

	ans = []
	from datetime import datetime
	from app.utils.state_dict import state_dict

	for result in results:
		ans.append({
			"sessionID": result[0],
			"name": result[1],
			"sex": result[2],
			"age": datetime.today().year - result[3].year - ((datetime.today().month, datetime.today().day) < (result[3].month, result[3].day)),	
			"from": result[4],
			"state": state_dict[result[5]],
			"note": result[6]
		})
	
	return ans
	
	
	
	
	
	
	