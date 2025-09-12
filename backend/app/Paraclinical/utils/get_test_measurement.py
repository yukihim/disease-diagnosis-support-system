def check_if_digit_string(string):
	try:
		float(string)
		return True
	except:
		return False

def get_test_measurement(sessionID, test_name):
	from app.database.models import Tests, Sessions, Test_parameters
	from app.database import db
	

	sessions = Sessions.query.filter_by(id=sessionID).first()

	sessions_have_tests = sessions.sessions_have_tests

	test_obj = None
	for session_have_test in sessions_have_tests:
		if session_have_test.test.test_name.test_name == test_name:
			test_obj = session_have_test.test

	if test_obj is None:
		return jsonify({"error": "Test not found"}), 400





	#calculate the result of the test
	ans_value = []
	import random

	for test_parameter in test_obj.test_name.test_parameters:
		#check if test_parameter is digit string
		if check_if_digit_string(test_parameter.parameter_normal_low):
			normal_low = float(test_parameter.parameter_normal_low)
			normal_high = float(test_parameter.parameter_normal_high)

			generated_value = random.uniform(normal_low, normal_high)
			generated_value = round(generated_value, 2)

			ans_value.append({
				"key": test_parameter.parameter_name,
				"label": test_parameter.parameter_label,
				"value": generated_value,
				"unit": test_parameter.parameter_unit,
				"normal_low": normal_low,
				"normal_high": normal_high
			})
		else:
			random_value = random.choice([True, False])

			ans_value.append({
				"key": test_parameter.parameter_name,
				"label": test_parameter.parameter_label,
				"value": test_parameter.parameter_normal_low if random_value else test_parameter.parameter_normal_high,
				"unit": test_parameter.parameter_unit,
				"normal_low": test_parameter.parameter_normal_low,
				"normal_high": test_parameter.parameter_normal_high
			})
	

	#save the result 

	parameters = []
	for parameter in ans_value:
		parameters.append({
			"name": parameter["key"],
			"value": parameter["value"],
		})
	test_obj.save_test_result(parameters)
	test_obj.state = 7

	
	
	


	
	
	
	
	
	return ans_value
	
	

