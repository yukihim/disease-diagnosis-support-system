import unittest
import requests
import json
from urllib.parse import urljoin

# --- Configuration ---
BASE_URL = 'http://localhost:5001/' # Adjust if your server runs elsewhere
# Assuming login is still at /authentication/login based on previous context
LOGIN_URL = urljoin(BASE_URL, '/authentication/login')
# Pass Session URL (template for sessionID)
PASS_SESSIONS_URL = urljoin(BASE_URL, '/pass_sessions/') # Add <sessionID> later

# --- Test Data ---
# Using doctor credentials, as they are likely users of this endpoint
USER_CREDENTIALS = {'username': 'doctor', 'password': 'test'}

# Session IDs from mock data
SESSION_ID_VALID = "sess_patient_001_checkup"
SESSION_ID_EXAMPLE = "abc-xyz-123" # From documentation
SESSION_ID_NOT_FOUND = "non_existent_session_id_456"

class TestPassSessionAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Login as a user (e.g., doctor) once for all tests."""
        print("\n--- Logging in User for Pass Session Test Suite ---")
        login_payload = USER_CREDENTIALS
        headers = {'Content-Type': 'application/json'}
        try:
            response = requests.post(LOGIN_URL, headers=headers, json=login_payload)
            response.raise_for_status() # Raise exception for bad status codes
            cls.auth_token = response.json().get('access_token')
            assert cls.auth_token is not None, "Failed to retrieve access token during login."
            cls.headers = {'Authorization': f'Bearer {cls.auth_token}'} # No Content-Type needed for GET
            print(f"User Login Successful. Token: {cls.auth_token[:15]}...")
        except requests.exceptions.RequestException as e:
            print(f"FATAL: User Login Failed in setUpClass: {e}")
            raise ConnectionError(f"Could not log in user for tests: {e}")

    def test_01_get_pass_session_success(self):
        """Test GET /pass_sessions/<sessionID> - Success"""
        url = urljoin(PASS_SESSIONS_URL, SESSION_ID_VALID)
        response = requests.get(url, headers=self.headers)

        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("passSessions", data)
        self.assertIsInstance(data["passSessions"], list)
        # Based on mock data, expect 1 item in the list for this sessionID
        self.assertEqual(len(data["passSessions"]), 1)

        # Check the structure of the session data
        session_data = data["passSessions"][0]
        self.assertIn("sessionDate", session_data)
        self.assertIn("sessionType", session_data)
        self.assertIn("personInCharged", session_data)
        self.assertIn("department", session_data)
        self.assertIn("result", session_data)
        print(f"\n[Pass Session OK] Successfully retrieved session for {SESSION_ID_VALID}")

    def test_02_get_pass_session_success_example_id(self):
        """Test GET /pass_sessions/<sessionID> - Success for example ID"""
        url = urljoin(PASS_SESSIONS_URL, SESSION_ID_EXAMPLE)
        response = requests.get(url, headers=self.headers)

        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()
        self.assertIn("passSessions", data)
        self.assertIsInstance(data["passSessions"], list)
        self.assertEqual(len(data["passSessions"]), 1) # Mock data has one entry for this ID
        print(f"\n[Pass Session Example ID OK] Successfully retrieved session for {SESSION_ID_EXAMPLE}")


    def test_03_get_pass_session_not_found(self):
        """Test GET /pass_sessions/<sessionID> - Session ID Not Found"""
        url = urljoin(PASS_SESSIONS_URL, SESSION_ID_NOT_FOUND)
        response = requests.get(url, headers=self.headers)

        self.assertEqual(response.status_code, 404, f"Response: {response.text}")
        data = response.json()
        self.assertIn("message", data)
        self.assertIn(f"Session with ID '{SESSION_ID_NOT_FOUND}' not found", data["message"])
        print(f"\n[Pass Session NF OK] Got expected 404 for {SESSION_ID_NOT_FOUND}")

    def test_04_get_pass_session_no_auth(self):
        """Test GET /pass_sessions/<sessionID> - Without Authorization"""
        url = urljoin(PASS_SESSIONS_URL, SESSION_ID_VALID)
        # No headers sent
        response = requests.get(url)

        self.assertEqual(response.status_code, 401, f"Response: {response.text}") # Expect Unauthorized
        data = response.json()
        self.assertIn("msg", data) # Flask-JWT-Extended uses 'msg'
        print(f"\n[Pass Session No Auth OK] Got expected 401")

# --- Test Runner ---
if __name__ == '__main__':
    unittest.main(verbosity=2)