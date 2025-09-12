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
    from ....database.models import Sessions, Patients, HaveSession, Tests, SessionsHaveTests, Test_names

    stmt = select(
        Patients.name, Test_names.test_name, Tests.state
        ).join(
            Patients.have_session.and_(HaveSession.user_id == user_id)
        ).join(
            HaveSession.session.and_(Sessions.state == 5)
        ).join(
            Sessions.sessions_have_tests
        ).join(
            SessionsHaveTests.test
        ).join(
            Tests.test_name
        ).where(
            Tests.state.in_([4, 6, 7, 9])
        )



    from ....database import db
    result = db.session.execute(stmt).all()
    ans = []
    # import logging
    # _logger = logging.getLogger(__name__)
    # _logger.info(stmt)
    # _logger.info(result)
    from app.utils.state_dict import state_dict
    for row in result:
        temp_patient = {
            "name": row[0],
            "test": row[1],
            "state": state_dict[row[2]],
        }
        ans.append(temp_patient)
    return ans
