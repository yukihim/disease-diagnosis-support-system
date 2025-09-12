def get_patient_test(sessionID):
	from ...database import db
	from ...database.models import Tests, SessionsHaveTests, Test_names, Test_parameters
	from sqlalchemy import select

	stmt = select(
		Test_names.id,
		Tests.id
	).join(
		Test_names.tests
	).join(
		Tests.sessions_have_tests
	).join(
		SessionsHaveTests.session
	).where(
		SessionsHaveTests.session_id == sessionID
	)


	
	results = db.session.execute(stmt).fetchall()

	results = [{"test": result[1], "test_name":Test_names.query.filter_by(id=result[0]).first()} for result in results]

	ans = []
	
	for test in results:

		test_object = Tests.query.filter_by(id=test["test"]).first()
		if(test_object.state in [7,8]):
			test_result = test_object.get_test_result()
			values = {}
			for parameter in test_result["parameters"]:
				values[parameter["name"]] = parameter["value"]
			ans.append({
				"testID": test["test"],
				"testName": test["test_name"].test_name,
				"testFields": [
					{
						"key": parameter.parameter_name,
						"label": parameter.parameter_label,
						"unit": parameter.parameter_unit,
						"range": {
							"low": parameter.parameter_normal_low,
							"high": parameter.parameter_normal_high,
						},
						"value": values[parameter.parameter_name]
					}
					for parameter in test["test_name"].test_parameters
				]
			})
			test_object.state = 8
			db.session.commit()
		else:
			ans.append({
				"testID": test["test"],
				"testName": test["test_name"].test_name,
				"testFields": [
					{
						"key": parameter.parameter_name,
						"label": parameter.parameter_label,
						"unit": parameter.parameter_unit,
						"range": {
							"low": parameter.parameter_normal_low,
							"high": parameter.parameter_normal_high,
						}
					}
				for parameter in test["test_name"].test_parameters
				]
			})
		

	return ans
	