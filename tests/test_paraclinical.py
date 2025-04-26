import unittest
import requests
import json
from urllib.parse import urljoin, urlencode

# --- Configuration ---
BASE_URL = 'http://localhost:5001/' # Adjust if your server runs elsewhere
# Assuming login is still at /authentication/login based on previous context
LOGIN_URL = urljoin(BASE_URL, '/authentication/login')
# Paraclinical URLs
URL_INCOMING_PATIENTS = urljoin(BASE_URL, '/paraclinical/landing_page/incoming_patient')
# Using template for path parameters
URL_TEST_RELATED_INFO = urljoin(BASE_URL, '/paraclinical/patient_test/') # Add <sessionID> later
URL_DEVICE_MEASURING = urljoin(BASE_URL, '/paraclinical/patient_test/') # Add <sessionID>/measuring?testType=... later

# --- Test Data ---
# Using a generic user for login, adjust if a specific 'paraclinical' role is needed and enforced
PARAMED_CREDENTIALS = {'username': 'paraclinical', 'password': 'test'} # Or use 'doctor' if easier

# Session IDs from mock data
SESSION_ID_MULTI_TEST = "sess_123_abc"
SESSION_ID_SINGLE_TEST = "sess_456_def"
SESSION_ID_NO_INFO = "session_not_in_test_info" # Assumed valid conceptually, but no mock data
INVALID_SESSION_ID = "invalid_session_id_xyz"

# Test Types from mock data
TEST_TYPE_BLOOD_CHEM = "Blood Chemistry"
TEST_TYPE_EKG = "EKG"
TEST_TYPE_INVALID = "MRI Scan" # Assume this type isn't in mock data for the session


class TestParaclinicalAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Login as a paraclinical user once for all tests."""
        print("\n--- Logging in Paraclinical User for Test Suite ---")
        login_payload = PARAMED_CREDENTIALS
        headers = {'Content-Type': 'application/json'}
        try:
            response = requests.post(LOGIN_URL, headers=headers, json=login_payload)
            response.raise_for_status() # Raise exception for bad status codes
            cls.paramed_token = response.json().get('access_token')
            assert cls.paramed_token is not None, "Failed to retrieve access token during login."
            cls.headers = {'Authorization': f'Bearer {cls.paramed_token}'} # No Content-Type needed for GET
            print(f"Paraclinical Login Successful. Token: {cls.paramed_token[:15]}...")
        except requests.exceptions.RequestException as e:
            print(f"FATAL: Paraclinical Login Failed in setUpClass: {e}")
            raise ConnectionError(f"Could not log in user for tests: {e}")

    # --- Landing Page Test ---

    def test_01_get_incoming_patients(self):
        """Test GET /landing_page/incoming_patient"""
        response = requests.get(URL_INCOMING_PATIENTS, headers=self.headers)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("incomingPatient", data)
        self.assertIsInstance(data["incomingPatient"], list)
        if data["incomingPatient"]: # Check first item if list not empty
             self.assertIn("sessionID", data["incomingPatient"][0])
             self.assertIn("name", data["incomingPatient"][0])
             self.assertIn("state", data["incomingPatient"][0])
        print(f"\n[Paramed Incoming OK] Got {len(data.get('incomingPatient',[]))} patients.")

    # --- Test Related Information Tests ---

    def test_02_get_test_related_info_success_multi(self):
        """Test GET /patient_test/<sessionID> - Success with multiple tests."""
        url = urljoin(URL_TEST_RELATED_INFO, SESSION_ID_MULTI_TEST)
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("testRelatedInformation", data)
        self.assertIsInstance(data["testRelatedInformation"], list)
        self.assertGreater(len(data["testRelatedInformation"]), 1, "Expected multiple tests")
        # Check structure of first test info
        first_test = data["testRelatedInformation"][0]
        self.assertIn("sentFromRoom", first_test)
        self.assertIn("note", first_test)
        self.assertIn("testType", first_test)
        self.assertIn("ListOfParameters", first_test)
        self.assertIsInstance(first_test["ListOfParameters"], list)
        print(f"\n[Paramed Test Info Multi OK] Got info for {SESSION_ID_MULTI_TEST}")

    def test_03_get_test_related_info_success_single(self):
        """Test GET /patient_test/<sessionID> - Success with a single test."""
        url = urljoin(URL_TEST_RELATED_INFO, SESSION_ID_SINGLE_TEST)
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("testRelatedInformation", data)
        self.assertIsInstance(data["testRelatedInformation"], list)
        self.assertEqual(len(data["testRelatedInformation"]), 1, "Expected single test")
        print(f"\n[Paramed Test Info Single OK] Got info for {SESSION_ID_SINGLE_TEST}")

    def test_04_get_test_related_info_not_found(self):
        """Test GET /patient_test/<sessionID> - Session ID has no test info."""
        url = urljoin(URL_TEST_RELATED_INFO, SESSION_ID_NO_INFO)
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 404, f"Response: {response.text}")
        data = response.json()
        self.assertIn("message", data)
        self.assertIn("No test information found", data["message"])
        print(f"\n[Paramed Test Info NF OK] Got 404 for {SESSION_ID_NO_INFO}")

    def test_05_get_test_related_info_invalid_session(self):
        """Test GET /patient_test/<sessionID> - Invalid Session ID format (although route handles string)."""
        # This mainly tests if the lookup fails gracefully.
        url = urljoin(URL_TEST_RELATED_INFO, INVALID_SESSION_ID)
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 404, f"Response: {response.text}") # Expect 404 as it won't be in mock data
        print(f"\n[Paramed Test Info Invalid Sess OK] Got 404 for {INVALID_SESSION_ID}")

    # --- Device Measuring Tests ---

    def test_06_get_device_measuring_success(self):
        """Test GET /patient_test/<sessionID>/measuring?testType=... - Success"""
        params = {'testType': TEST_TYPE_BLOOD_CHEM}
        # Need to manually construct the URL with path param and query string
        base_measuring_url = urljoin(URL_DEVICE_MEASURING, f"{SESSION_ID_MULTI_TEST}/measuring")
        full_url = f"{base_measuring_url}?{urlencode(params)}"

        response = requests.get(full_url, headers=self.headers)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("measurements", data)
        self.assertIsInstance(data["measurements"], list)
        self.assertGreater(len(data["measurements"]), 0)
        # Check structure of first measurement
        first_measurement = data["measurements"][0]
        self.assertIn("parameter", first_measurement)
        self.assertIn("value", first_measurement)
        print(f"\n[Paramed Measure OK] Got measurements for {SESSION_ID_MULTI_TEST}, type {TEST_TYPE_BLOOD_CHEM}")

    def test_07_get_device_measuring_success_ekg(self):
        """Test GET /patient_test/<sessionID>/measuring?testType=... - Success EKG"""
        params = {'testType': TEST_TYPE_EKG}
        base_measuring_url = urljoin(URL_DEVICE_MEASURING, f"{SESSION_ID_MULTI_TEST}/measuring")
        full_url = f"{base_measuring_url}?{urlencode(params)}"

        response = requests.get(full_url, headers=self.headers)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("measurements", data)
        self.assertTrue(len(data["measurements"]) > 0)
        print(f"\n[Paramed Measure EKG OK] Got measurements for {SESSION_ID_MULTI_TEST}, type {TEST_TYPE_EKG}")


    def test_08_get_device_measuring_missing_testtype(self):
        """Test GET /patient_test/<sessionID>/measuring - Missing testType query param."""
        # URL without query parameter
        full_url = urljoin(URL_DEVICE_MEASURING, f"{SESSION_ID_MULTI_TEST}/measuring")

        response = requests.get(full_url, headers=self.headers)
        self.assertEqual(response.status_code, 400, f"Response: {response.text}")
        data = response.json()
        self.assertIn("message", data)
        self.assertEqual(data["message"], "Missing 'testType' query parameter.")
        print(f"\n[Paramed Measure Missing Type OK] Got 400")

    def test_09_get_device_measuring_session_not_found(self):
        """Test GET /patient_test/<sessionID>/measuring?testType=... - Session ID not found."""
        params = {'testType': TEST_TYPE_BLOOD_CHEM}
        base_measuring_url = urljoin(URL_DEVICE_MEASURING, f"{INVALID_SESSION_ID}/measuring")
        full_url = f"{base_measuring_url}?{urlencode(params)}"

        response = requests.get(full_url, headers=self.headers)
        self.assertEqual(response.status_code, 404, f"Response: {response.text}")
        data = response.json()
        self.assertIn("message", data)
        self.assertIn("No measurements found for session ID", data["message"])
        print(f"\n[Paramed Measure Session NF OK] Got 404 for {INVALID_SESSION_ID}")

    def test_10_get_device_measuring_testtype_not_found_for_session(self):
        """Test GET /patient_test/<sessionID>/measuring?testType=... - TestType not found for session."""
        params = {'testType': TEST_TYPE_INVALID} # Use a type not mocked for this session
        base_measuring_url = urljoin(URL_DEVICE_MEASURING, f"{SESSION_ID_MULTI_TEST}/measuring")
        full_url = f"{base_measuring_url}?{urlencode(params)}"

        response = requests.get(full_url, headers=self.headers)
        self.assertEqual(response.status_code, 404, f"Response: {response.text}")
        data = response.json()
        self.assertIn("message", data)
        self.assertIn(f"No measurements found for session ID '{SESSION_ID_MULTI_TEST}' and test type '{TEST_TYPE_INVALID}'", data["message"])
        print(f"\n[Paramed Measure TestType NF OK] Got 404 for session {SESSION_ID_MULTI_TEST}, type {TEST_TYPE_INVALID}")

    def test_11_get_device_measuring_no_auth(self):
        """Test GET /patient_test/<sessionID>/measuring?testType=... - No Auth."""
        params = {'testType': TEST_TYPE_BLOOD_CHEM}
        base_measuring_url = urljoin(URL_DEVICE_MEASURING, f"{SESSION_ID_MULTI_TEST}/measuring")
        full_url = f"{base_measuring_url}?{urlencode(params)}"

        response = requests.get(full_url) # No headers
        self.assertEqual(response.status_code, 401, f"Response: {response.text}")
        data = response.json()
        self.assertIn("msg", data) # Expect standard JWT error message
        print(f"\n[Paramed Measure No Auth OK] Got 401")


# --- Test Runner ---
if __name__ == '__main__':
    unittest.main(verbosity=2)