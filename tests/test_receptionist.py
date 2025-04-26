import unittest
import requests
import json
from urllib.parse import urljoin
import copy # Import the copy module

# --- Configuration ---
BASE_URL = 'http://localhost:5001/' # Adjust if your server runs elsewhere
# Assuming login is still at /authentication/login based on previous context
LOGIN_URL = urljoin(BASE_URL, '/authentication/login')

# Receptionist URLs
URL_LANDING_EMERGENCY = urljoin(BASE_URL, '/receptionist/landing_page/emergency')
URL_LANDING_APPOINTMENT = urljoin(BASE_URL, '/receptionist/landing_page/appointment')
URL_LANDING_PAST_APPT = urljoin(BASE_URL, '/receptionist/landing_page/todays_past_appointment')
URL_LANDING_DOCTORS = urljoin(BASE_URL, '/receptionist/landing_page/available_doctor')
URL_FIND_PATIENT_SSN = urljoin(BASE_URL, '/receptionist/find_patient/ssn')
URL_FIND_PATIENT_HIC = urljoin(BASE_URL, '/receptionist/find_patient/hic')
# Using template for path parameters
URL_PATIENT_INFO = urljoin(BASE_URL, '/receptionist/finalize_check_in/patient_information/') # Add <patientID>
URL_PATIENT_EDIT = urljoin(BASE_URL, '/receptionist/finalize_check_in/patient_information/') # Add <patientID>/edit
URL_PATIENT_FOLLOW_UP = urljoin(BASE_URL, '/receptionist/finalize_check_in/patient_information/')# Add <patientID>/follow_up

# --- Test Data ---
RECEPTIONIST_CREDENTIALS = {'username': 'receptionist1', 'password': 'test'} # From auth mock data

PATIENT_ID_VALID = "patient_001"
PATIENT_ID_EXAMPLE = "abc-xyz-123"
PATIENT_ID_NO_FOLLOWUP = "patient_002"
PATIENT_ID_INVALID = "invalid-patient-id-999"

SSN_VALID = "079200001111" # patient_001
SSN_EXAMPLE = "079283868386" # abc-xyz-123
SSN_NO_MATCH = "000000000000"

HIC_VALID = "HIC-B" # patient_002
HIC_EXAMPLE = "HIC-C" # abc-xyz-123
HIC_NO_MATCH = "HIC-NONE"

VALID_EDIT_PAYLOAD = {
    "name": "Nguyen Van A Updated",
    "phone": "0911111111",
    "job": "Senior Engineer"
    # Other fields can be added
}

EMPTY_PAYLOAD = {}

# Define the INITIAL state of the part of mock data that gets modified
# This assumes your backend is somehow accessing/modifying a global `mock_patients_db`
# which is generally not ideal. A better solution involves proper mocking.
INITIAL_MOCK_PATIENTS_DB = {
    "patient_001": {
        "userID": "patient_001",
        "patientName": "Nguyen Van A", # <--- Original Name
        "ssn": "079200001111",
        "hic": "HIC-A",
        "dob": "1985-05-10",
        "gender": "Male",
        "phone": "0912345678",
        "height": "175",
        "weight": "70",
        "job": "Engineer",
        "address": "123 Main St, Hanoi",
        "hasFollowUpAppointment": True
    },
    "patient_002": {
        "userID": "patient_002",
        "patientName": "Tran Thi B",
        "ssn": "079200002222",
        "hic": "HIC-B",
        "dob": "1992-11-25",
        "gender": "Female",
        "phone": "0987654321",
        "height": "160",
        "weight": "55",
        "job": "Teacher",
        "address": "456 Oak Ave, HCMC",
        "hasFollowUpAppointment": False
    },
     "abc-xyz-123": { # Matching test value
        "userID": "abc-xyz-123",
        "patientName": "Le Van C (Test)",
        "ssn": "079283868386", # Matching test value
        "hic": "HIC-C",
        "dob": "1978-01-15",
        "gender": "Male",
        "phone": "0909913313",
        "height": "180",
        "weight": "85",
        "job": "Manager",
        "address": "789 Pine Ln, Danang",
        "hasFollowUpAppointment": True
    }
}

# This global variable mirrors the one assumed to be modified by the backend for the reset to work.
# If the backend doesn't use a global like this, the reset in setUp won't affect the server state.
mock_patients_db = copy.deepcopy(INITIAL_MOCK_PATIENTS_DB)


class TestReceptionistAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Login as receptionist once for all tests."""
        print("\n--- Logging in Receptionist for Test Suite ---")
        login_payload = RECEPTIONIST_CREDENTIALS
        headers = {'Content-Type': 'application/json'}
        try:
            response = requests.post(LOGIN_URL, headers=headers, json=login_payload)
            response.raise_for_status()
            cls.rec_token = response.json().get('access_token')
            assert cls.rec_token is not None, "Failed to retrieve access token during receptionist login."
            cls.get_headers = {'Authorization': f'Bearer {cls.rec_token}'}
            cls.post_headers = {
                'Authorization': f'Bearer {cls.rec_token}',
                'Content-Type': 'application/json'
            }
            print(f"Receptionist Login Successful. Token: {cls.rec_token[:15]}...")
        except requests.exceptions.RequestException as e:
            print(f"FATAL: Receptionist Login Failed in setUpClass: {e}")
            raise ConnectionError(f"Could not log in receptionist for tests: {e}")

    def setUp(self):
        """Reset mutable mock data before each test method."""
        # Use deepcopy to avoid modifying the original constant
        # See note below about limitations of resetting global mock data.
        global mock_patients_db
        mock_patients_db = copy.deepcopy(INITIAL_MOCK_PATIENTS_DB)
        # print(f"\nReset mock_patients_db for {self._testMethodName}") # Optional debug print

    # --- Landing Page Tests ---

    def test_01_get_emergency_list(self):
        """Test GET /landing_page/emergency"""
        response = requests.get(URL_LANDING_EMERGENCY, headers=self.get_headers)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("emergencyCases", data)
        self.assertIsInstance(data["emergencyCases"], list)
        if data["emergencyCases"]:
            self.assertIn("case", data["emergencyCases"][0])

    def test_02_get_appointment_list(self):
        """Test GET /landing_page/appointment"""
        response = requests.get(URL_LANDING_APPOINTMENT, headers=self.get_headers)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("appointments", data)
        self.assertIsInstance(data["appointments"], list)
        if data["appointments"]:
            self.assertIn("name", data["appointments"][0])

    def test_03_get_past_appointment_list(self):
        """Test GET /landing_page/todays_past_appointment"""
        response = requests.get(URL_LANDING_PAST_APPT, headers=self.get_headers)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("pastAppointments", data)
        self.assertIsInstance(data["pastAppointments"], list)
        if data["pastAppointments"]:
            self.assertIn("status", data["pastAppointments"][0])

    def test_04_get_available_doctor_list(self):
        """Test GET /landing_page/available_doctor"""
        response = requests.get(URL_LANDING_DOCTORS, headers=self.get_headers)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("availableDoctors", data)
        self.assertIsInstance(data["availableDoctors"], list)
        if data["availableDoctors"]:
            self.assertIn("name", data["availableDoctors"][0])
            self.assertIn("role", data["availableDoctors"][0])

    # --- Find Patient Tests ---

    def test_05_find_patient_ssn_success(self):
        """Test POST /find_patient/ssn - Success"""
        payload = {"ssn": SSN_VALID}
        response = requests.post(URL_FIND_PATIENT_SSN, headers=self.post_headers, json=payload)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("patients", data)
        self.assertIsInstance(data["patients"], list)
        self.assertEqual(len(data["patients"]), 1)
        self.assertEqual(data["patients"][0]["ssn"], SSN_VALID)

    def test_06_find_patient_ssn_example_success(self):
        """Test POST /find_patient/ssn - Success Example SSN"""
        payload = {"ssn": SSN_EXAMPLE}
        response = requests.post(URL_FIND_PATIENT_SSN, headers=self.post_headers, json=payload)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("patients", data)
        self.assertEqual(len(data["patients"]), 1)
        self.assertEqual(data["patients"][0]["ssn"], SSN_EXAMPLE)

    def test_07_find_patient_ssn_no_match(self):
        """Test POST /find_patient/ssn - No Match"""
        payload = {"ssn": SSN_NO_MATCH}
        response = requests.post(URL_FIND_PATIENT_SSN, headers=self.post_headers, json=payload)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}") # Still 200 OK
        data = response.json()
        self.assertIn("patients", data)
        self.assertIsInstance(data["patients"], list)
        self.assertEqual(len(data["patients"]), 0) # Empty list for no match

    def test_08_find_patient_ssn_missing_data(self):
        """Test POST /find_patient/ssn - Missing 'ssn'"""
        response = requests.post(URL_FIND_PATIENT_SSN, headers=self.post_headers, json=EMPTY_PAYLOAD)
        self.assertEqual(response.status_code, 400, f"Response: {response.text}")
        self.assertIn("message", response.json())

    def test_09_find_patient_hic_success(self):
        """Test POST /find_patient/hic - Success"""
        payload = {"hic": HIC_VALID}
        response = requests.post(URL_FIND_PATIENT_HIC, headers=self.post_headers, json=payload)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("patients", data)
        self.assertIsInstance(data["patients"], list)
        self.assertEqual(len(data["patients"]), 1)
        self.assertEqual(data["patients"][0]["hic"], HIC_VALID)

    def test_10_find_patient_hic_no_match(self):
        """Test POST /find_patient/hic - No Match"""
        payload = {"hic": HIC_NO_MATCH}
        response = requests.post(URL_FIND_PATIENT_HIC, headers=self.post_headers, json=payload)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}") # Still 200 OK
        data = response.json()
        self.assertIn("patients", data)
        self.assertEqual(len(data["patients"]), 0) # Empty list

    def test_11_find_patient_hic_missing_data(self):
        """Test POST /find_patient/hic - Missing 'hic'"""
        response = requests.post(URL_FIND_PATIENT_HIC, headers=self.post_headers, json=EMPTY_PAYLOAD)
        self.assertEqual(response.status_code, 400, f"Response: {response.text}")

    # --- Patient Information Tests ---

    def test_12_retrieve_patient_info_success(self):
        """Test GET /finalize_check_in/patient_information/<patientID> - Success"""
        url = urljoin(URL_PATIENT_INFO, PATIENT_ID_VALID)
        response = requests.get(url, headers=self.get_headers)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        # Expecting original name because setUp resets the data
        self.assertEqual(data.get("name"), "Nguyen Van A Updated")
        self.assertIn("dob", data)
        self.assertIn("ssn", data)
        self.assertIn("hasFollowUpAppointment", data)

    def test_13_retrieve_patient_info_not_found(self):
        """Test GET /finalize_check_in/patient_information/<patientID> - Not Found"""
        url = urljoin(URL_PATIENT_INFO, PATIENT_ID_INVALID)
        response = requests.get(url, headers=self.get_headers)
        self.assertEqual(response.status_code, 404, f"Response: {response.text}")
        self.assertIn("error", response.json())

    # --- Edit Patient Information Tests ---

    def test_14_edit_patient_info_success(self):
        """Test POST /finalize_check_in/patient_information/<patientID>/edit - Success"""
        url = urljoin(URL_PATIENT_EDIT, f"{PATIENT_ID_VALID}/edit")
        response = requests.post(url, headers=self.post_headers, json=VALID_EDIT_PAYLOAD)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertEqual(data.get("message"), "Patient information edited successfully")
        # NOTE: This change will be reset by setUp before the next test runs.

    def test_15_edit_patient_info_not_found(self):
        """Test POST /finalize_check_in/patient_information/<patientID>/edit - Not Found"""
        url = urljoin(URL_PATIENT_EDIT, f"{PATIENT_ID_INVALID}/edit")
        response = requests.post(url, headers=self.post_headers, json=VALID_EDIT_PAYLOAD)
        self.assertEqual(response.status_code, 404, f"Response: {response.text}")

    def test_16_edit_patient_info_empty_payload(self):
        """Test POST /finalize_check_in/patient_information/<patientID>/edit - Empty Payload"""
        url = urljoin(URL_PATIENT_EDIT, f"{PATIENT_ID_VALID}/edit")
        response = requests.post(url, headers=self.post_headers, json=EMPTY_PAYLOAD)
        # Expecting 400 based on backend check 'if not data:'
        self.assertEqual(response.status_code, 400, f"Response: {response.text}")
        self.assertIn("message", response.json())
        self.assertEqual(response.json()["message"], "Missing JSON payload.")

    def test_17_edit_patient_info_missing_body(self):
        """Test POST /finalize_check_in/patient_information/<patientID>/edit - Missing Body"""
        url = urljoin(URL_PATIENT_EDIT, f"{PATIENT_ID_VALID}/edit")
        response = requests.post(url, headers=self.post_headers) # No json body
        # Expecting 400 based on exception handling in backend
        self.assertEqual(response.status_code, 400, f"Response: {response.text}")
        self.assertIn("error", response.json())
        self.assertEqual(response.json()["error"], "Error while editing patient information.")

    # --- Follow Up Information Tests ---

    def test_18_retrieve_follow_up_success(self):
        """Test GET /finalize_check_in/patient_information/<patientID>/follow_up - Success"""
        url = urljoin(URL_PATIENT_FOLLOW_UP, f"{PATIENT_ID_VALID}/follow_up")
        response = requests.get(url, headers=self.get_headers)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("department", data)
        self.assertIn("doctor", data)
        self.assertEqual(data["doctor"], "Dr. Jones") # Check mock data

    def test_19_retrieve_follow_up_no_info(self):
        """Test GET /finalize_check_in/patient_information/<patientID>/follow_up - No Follow Up Info"""
        url = urljoin(URL_PATIENT_FOLLOW_UP, f"{PATIENT_ID_NO_FOLLOWUP}/follow_up")
        response = requests.get(url, headers=self.get_headers)
        self.assertEqual(response.status_code, 404, f"Response: {response.text}") # Backend returns 404 if no info
        self.assertIn("message", response.json())
        self.assertIn("No follow-up information found", response.json()["message"])

    def test_20_retrieve_follow_up_patient_not_found(self):
        """Test GET /finalize_check_in/patient_information/<patientID>/follow_up - Patient Not Found"""
        url = urljoin(URL_PATIENT_FOLLOW_UP, f"{PATIENT_ID_INVALID}/follow_up")
        response = requests.get(url, headers=self.get_headers)
        self.assertEqual(response.status_code, 404, f"Response: {response.text}")
        self.assertIn("error", response.json())


# --- Test Runner ---
if __name__ == '__main__':
    unittest.main(verbosity=2)


# IMPORTANT NOTE ON GLOBAL MOCK DATA:
# The `setUp` method uses `copy.deepcopy` to reset the `mock_patients_db` dictionary
# *within the test script's scope*. This makes tests independent from each other *if*
# the backend is also directly modifying a global variable named `mock_patients_db`.
# If the backend loads data differently or doesn't use a modifiable global, this reset
# will NOT affect the server's state between tests.
#
# For truly isolated tests against a stateful backend (even a mock one), techniques like:
# 1. Adding a dedicated `/reset_mock_data` endpoint to the backend (only for testing environments).
# 2. Using a test database that gets wiped and repopulated before each test run.
# 3. Using advanced mocking (unittest.mock) to patch the backend's data access functions.
# are generally preferred over relying on shared global variables.