def end_test(sessionID):
	from app.database.models import Sessions
	from app.database import db

	session_obj = Sessions.query.filter_by(id=sessionID).first()
	session_obj.state = 8
	

	session_have_test_obj = session_obj.sessions_have_tests

	for test in session_have_test_obj:
		test_obj = test.test
		test_obj.state = 8
	db.session.commit()

	return True
	