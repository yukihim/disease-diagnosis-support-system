"""
Author: nhoxtin15
Model Description:
    
Date Created: 03/05/2025
Last Updated: 03/05/2025
"""

def send_for_test(session_id, test_ids,user_id):

    """
    Function to send a patient for a test.

    Args:
        session_id (str): The ID of the session.
        test_types (list): A list of test types to be performed.

    Returns:
        dict: A dictionary containing the status and message of the operation.
    """

    # Check if the session ID is valid
    if not session_id:
        return {"status": "error", "message": "Invalid session ID."}

    if not test_ids:
        return {"status": "error", "message": "No test IDs provided."}

    # Process the request to send for tests
    from .... import db
    for test_id in test_ids:
        # find test name
        from ....database.models import Tests, Test_names,Test_types, Sessions, SessionsHaveTests

        test_name = Test_names.query.filter_by(id=test_id).first()
        test_type = test_name.test_type
        

        import datetime

        new_test = Tests(
            test_date=datetime.datetime.now(),
            test_name=test_name,
            paraclinical_technician_id=3,
            state=4,
            note="",
        )

        session = Sessions.query.filter_by(id=session_id).first()
        if session is None:
            return {"status": "error", "message": "Session not found."}

        new_session_have_test = SessionsHaveTests(
            session=session,
            test=new_test,
        )

        


        # Add the new test to the database session
        import logging
        _logger = logging.getLogger(__name__)

        db.session.add(new_test)
        db.session.add(new_session_have_test)
    from ....database.models import Sessions
    session.state = 5
    from ....database.models import Users
    user = Users.query.filter_by(id=user_id).first()
    session.from_room = user.department
    db.session.add(session)

    db.session.commit()












    return {"status": "success", "message": "Patient sent for tests successfully."}
