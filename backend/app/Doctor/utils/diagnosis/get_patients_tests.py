"""
Author: nhoxtin15
Model Description:
    
Date Created: 29/04/2025
Last Updated: 29/04/2025
"""

blood_test_count_normal_range = {
    'WBC': (4.0, 10.0),
    'RBC': (4.5, 6.0),
    'Hemoglobin': (13.5, 17.5),
    'Hematocrit': (38.0, 50.0),
    'MCV': (80.0, 100.0),
    'MCH': (27.0, 31.0),
    'MCHC': (32.0, 36.0),
    'RDW': (11.5, 14.5),
    'Platelets': (150.0, 450.0),
}


def get_patients_tests(session_id):

    from ....database.models import Tests, SessionsHaveTests, Sessions
    from ....database import db
    from sqlalchemy import select


    # Get the session
    session = db.session.query(Sessions).filter(Sessions.id == session_id).first()
    if not session:
        return None
    # Get the tests for the session
    tests = select(
        Tests.test_date,
        Tests.test_type,
        Tests.test_result_path,
        Tests.status,
    ).froms(
        SessionsHaveTests
    ).filter(
        SessionsHaveTests.session_id == session_id
    )

    # Get the tests for the session
    tests = db.session.execute(tests).all()

    if not tests:
        return []

    # Convert the tests to a list of dictionaries
    tests_list = []

    # obtain the test's result
    for test in tests:
        if test.test_type == "Blood Test":
            result_path = test.test_result_path
            file = open(result_path, "r")

    for test in tests:
        test_dict = {
            "test_date": test.test_date,
            "test_type": test.test_type,
            "status": test.status,
        }
        tests_list.append(test_dict)



