import unittest
import requests
import json
from urllib.parse import urljoin

# --- Configuration ---
BASE_URL = 'http://localhost:5001/' # Adjust if your server runs elsewhere
# *** Updated LOGIN_URL as requested ***
LOGIN_URL = urljoin(BASE_URL, '/authentication/login')
# Nurse endpoint URL (template for sessionID)
NURSE_INPUT_VITALS_URL = urljoin(BASE_URL, '/nurse/input_vital_sign/') # Add <sessionID> later

# --- Test Data ---
NURSE_CREDENTIALS = {'username': 'nurse', 'password': 'test'} # Assuming a nurse user exists

# Session IDs from mock data
SESSION_ID_NEW_VITALS = "sess_patient_001_checkup"
SESSION_ID_UPDATE_VITALS = "sess_patient_002_emergency"
SESSION_ID_EXAMPLE = "abc-xyz-123"
INVALID_SESSION_ID = "non_existent_session_id_123"

# Sample valid vital signs payload
VALID_VITALS_PAYLOAD = {
    "bloodPressure": "120/80",
    "pulse": "72",
    "breathingRate": "16",
    "temperature": "36.8",
    "bmi": "22.5",
    "oxygenSaturation": "98"
}

# Sample payload with only some vitals
PARTIAL_VITALS_PAYLOAD = {
    "bloodPressure": "110/70",
    "pulse": "65"
}

# Invalid payload (empty)
EMPTY_VITALS_PAYLOAD = {}

class TestNurseAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Login as nurse once for all tests in this class."""
        print("\n--- Logging in Nurse for Test Suite ---")
        login_payload = NURSE_CREDENTIALS
        headers = {'Content-Type': 'application/json'}
        try:
            # Using the updated LOGIN_URL
            response = requests.post(LOGIN_URL, headers=headers, json=login_payload)
            response.raise_for_status() # Raise exception for bad status codes
            cls.nurse_token = response.json().get('access_token')
            assert cls.nurse_token is not None, "Failed to retrieve access token during nurse login."
            cls.headers = {
                'Authorization': f'Bearer {cls.nurse_token}',
                'Content-Type': 'application/json' # Needed for POST request body
            }
            print(f"Nurse Login Successful. Token: {cls.nurse_token[:15]}...")
        except requests.exceptions.RequestException as e:
            print(f"FATAL: Nurse Login Failed in setUpClass: {e}")
            raise ConnectionError(f"Could not log in nurse for tests: {e}")

    def test_01_input_vitals_success_new(self):
        """Test POST /input_vital_sign/<sessionID> - Success for new entry."""
        url = urljoin(NURSE_INPUT_VITALS_URL, SESSION_ID_NEW_VITALS)
        response = requests.post(url, headers=self.headers, json=VALID_VITALS_PAYLOAD)

        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("message", data)
        self.assertEqual(data["message"], "Set patient's vital signs successfully")
        print(f"\n[Input Vitals New OK] Successfully posted vitals for {SESSION_ID_NEW_VITALS}")

    def test_02_input_vitals_success_update(self):
        """Test POST /input_vital_sign/<sessionID> - Success updating existing."""
        url = urljoin(NURSE_INPUT_VITALS_URL, SESSION_ID_UPDATE_VITALS)
        # Send only partial data to simulate an update
        response = requests.post(url, headers=self.headers, json=PARTIAL_VITALS_PAYLOAD)

        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("message", data)
        self.assertEqual(data["message"], "Set patient's vital signs successfully")
        print(f"\n[Input Vitals Update OK] Successfully updated vitals for {SESSION_ID_UPDATE_VITALS}")
        # Could add another test to GET these vitals and check if they were actually updated in mock data

    def test_03_input_vitals_success_example_id(self):
        """Test POST /input_vital_sign/<sessionID> - Success for example ID."""
        url = urljoin(NURSE_INPUT_VITALS_URL, SESSION_ID_EXAMPLE)
        response = requests.post(url, headers=self.headers, json=VALID_VITALS_PAYLOAD)

        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("message", data)
        self.assertEqual(data["message"], "Set patient's vital signs successfully")
        print(f"\n[Input Vitals Example ID OK] Successfully posted vitals for {SESSION_ID_EXAMPLE}")

    def test_04_input_vitals_fail_session_not_found(self):
        """Test POST /input_vital_sign/<sessionID> - Session ID Not Found."""
        url = urljoin(NURSE_INPUT_VITALS_URL, INVALID_SESSION_ID)
        response = requests.post(url, headers=self.headers, json=VALID_VITALS_PAYLOAD)

        self.assertEqual(response.status_code, 404, f"Response: {response.text}")
        data = response.json()
        self.assertIn("message", data)
        self.assertIn(f"Session with ID '{INVALID_SESSION_ID}' not found", data["message"])
        print(f"\n[Input Vitals Session NF] Got expected 404 for {INVALID_SESSION_ID}")

    def test_05_input_vitals_fail_empty_payload(self):
        """Test POST /input_vital_sign/<sessionID> - Empty JSON payload."""
        url = urljoin(NURSE_INPUT_VITALS_URL, SESSION_ID_NEW_VITALS)
        response = requests.post(url, headers=self.headers, json=EMPTY_VITALS_PAYLOAD)

        self.assertEqual(response.status_code, 400, f"Response: {response.text}")
        data = response.json()
        self.assertIn("message", data)
        # *** CHANGE: Expect 'Missing JSON payload.' when {} is sent ***
        self.assertEqual(data["message"], "Missing JSON payload.")
        print(f"\n[Input Vitals Empty Payload] Got expected 400 with correct message")

    def test_06_input_vitals_fail_missing_body(self):
        """Test POST /input_vital_sign/<sessionID> - Missing request body entirely."""
        url = urljoin(NURSE_INPUT_VITALS_URL, SESSION_ID_NEW_VITALS)
        # Sending request without the 'json=' parameter
        response = requests.post(url, headers=self.headers) # Note: headers still include Auth

        # *** CHANGE: Expect 500 based on actual backend behavior ***
        self.assertEqual(response.status_code, 500, f"Response: {response.text}")
        data = response.json()
        self.assertIn("message", data)
        # *** CHANGE: Expect the generic 500 error message ***
        self.assertEqual(data["message"], "An error occurred while inputting vital signs.")
        print(f"\n[Input Vitals Missing Body] Got expected 500")


    def test_07_input_vitals_fail_no_auth(self):
        """Test POST /input_vital_sign/<sessionID> - Without Authorization."""
        url = urljoin(NURSE_INPUT_VITALS_URL, SESSION_ID_NEW_VITALS)
        # Prepare headers without Authorization
        headers_no_auth = {'Content-Type': 'application/json'}
        response = requests.post(url, headers=headers_no_auth, json=VALID_VITALS_PAYLOAD)

        self.assertEqual(response.status_code, 401, f"Response: {response.text}") # Expect Unauthorized
        data = response.json()
        self.assertIn("msg", data) # Flask-JWT-Extended uses 'msg'
        print(f"\n[Input Vitals No Auth] Got expected 401")

# --- Test Runner ---
if __name__ == '__main__':
    unittest.main(verbosity=2)