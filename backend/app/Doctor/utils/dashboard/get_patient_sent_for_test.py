"""
Author: nhoxtin15
Model Description:
    
Date Created: 23/04/2025
Last Updated: 23/04/2025
"""
from sqlalchemy import select
def get_patient_sent_for_test(user_id):
    """
    Function to get patients sent for tests.
    """
    from ....database.models import Sessions, Patients, HaveSession, Tests, SessionsHaveTests

    stmt = (select(
        Patients.name, Tests.test_type, Tests.status
        ).join(
            Patients.have_session.and_(HaveSession.user_id == user_id)
        ).join(
            HaveSession.session
        ).join(
            Sessions.sessions_have_tests
        ).join(
            SessionsHaveTests.test.and_(Tests.status.in_(['waiting_for_test', 'on_going', 'waiting_for_result'])))
        )

    from ....database import db
    result = db.session.execute(stmt).all()
    ans = []
    import logging
    _logger = logging.getLogger(__name__)
    _logger.info(stmt)
    _logger.info(result)
    for row in result:
        temp_patient = {
            "name": row[0],
            "test_type": row[1],
            "status": row[2],
        }
        ans.append(temp_patient)
    return ans
