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

    from ....database.models import Tests, SessionsHaveTests, Sessions, Test_names
    from ....database import db
    from sqlalchemy import select


    # Get the session
    session = db.session.query(Sessions).filter(Sessions.id == session_id).first()
    if not session:
        return None
    # Get the tests for the session
    tests = (select(
        Tests.test_date,
        Test_names.test_name,
        Tests.id,
        Test_names.test_format,
    ).join(
        Test_names.tests
    ).join(
        Tests.sessions_have_tests
    ).join(
        SessionsHaveTests.session.and_(SessionsHaveTests.session_id == session_id)
    ).filter(
        Tests.state.in_([4, 6, 7, 9])
    ))

    # Get the tests for the session
    tests = db.session.execute(tests).all()

    if not tests:
        return []





    # Convert the tests to a list of dictionaries
    tests_list = []




    for row in tests:
        test_dict = {
            "timeMeasured": row[0].strftime("%Y-%m-%d %H:%M:%S") if row[0] else None,
            "testType": row[1],
        }
        import logging
        logging.getLogger(__name__).info(row[3])
        if row[3] == "json":
            import os

            file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), 'database','file_system','test', str(row[2]) + ".json")
            logging.getLogger(__name__).info("Reading json file: " + file_path)
            if os.path.exists(file_path):
                #     read json into dict
                import json
                with open(file_path, "r") as f:
                    # import logging
                    logging.getLogger(__name__).info("Reading json file: " + file_path)
                    test_result = json.load(f)
                    test_dict['parameters'] = test_result["parameters"]

            else:
                logging.getLogger(__name__).info("concac")
                test_dict["parameters"] = None
        else:
            test_dict["parameters"] = 'image.png'
        tests_list.append(test_dict)

        return tests_list



