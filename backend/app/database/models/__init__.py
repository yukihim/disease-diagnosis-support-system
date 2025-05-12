"""
Author: nhoxtin15
Model Description:
    
Date Created: 17/04/2025
Last Updated: 17/04/2025
"""

from .base_model import BaseModel

from .users import Users
from .patients import Patients
from .sessions import Sessions
from .have_session import HaveSession
from .tests import Tests, Test_names, Test_types
from .sessions_have_tests import SessionsHaveTests
from .inpatient_session import Inpatient_session
from .appointments import Appointments



# from .diseases import Diseases


# from .symptoms import Symptoms
# from .diseases_have_symptoms import DiseasesHaveSymptoms
# from .medicines import Medicines

