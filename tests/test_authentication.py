import unittest
import requests
import json
from urllib.parse import urljoin # To safely join URL parts

# --- Configuration ---
BASE_URL = 'http://localhost:5001/' # Adjust if your server runs elsewhere
LOGIN_URL = urljoin(BASE_URL, '/authentication/login')
LOGOUT_URL = urljoin(BASE_URL, '/authentication/logout')

# --- Test Data (Valid credentials based on your mock data) ---
VALID_CREDENTIALS = {
    'doctor': 'test',
    'receptionist1': 'test',
    'admin': 'test',
    'paraclinical': 'test',
    'nurse': 'test',
}
INVALID_PASSWORD = 'wrongpassword'
UNKNOWN_USER = 'nonexistentuser'

class TestAuthenticationAPI(unittest.TestCase):

    def test_01_login_success_doctor(self):
        """Test successful login for a doctor user."""
        payload = {
            'username': 'doctor',
            'password': VALID_CREDENTIALS['doctor']
        }
        headers = {'Content-Type': 'application/json'}
        response = requests.post(LOGIN_URL, headers=headers, json=payload)

        self.assertEqual(response.status_code, 200, f"Expected 200 OK, got {response.status_code}")
        response_data = response.json()
        self.assertIn('access_token', response_data, "Response JSON should contain 'access_token'")
        self.assertTrue(isinstance(response_data['access_token'], str), "'access_token' should be a string")
        self.assertGreater(len(response_data['access_token']), 10, "'access_token' seems too short")
        print(f"\n[Login Success Doctor] Token received: {response_data['access_token'][:10]}...") # Print part of token

    def test_02_login_success_receptionist(self):
        """Test successful login for a receptionist user."""
        payload = {
            'username': 'receptionist1',
            'password': VALID_CREDENTIALS['receptionist1']
        }
        headers = {'Content-Type': 'application/json'}
        response = requests.post(LOGIN_URL, headers=headers, json=payload)

        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertIn('access_token', response_data)
        print(f"\n[Login Success Receptionist] Token received: {response_data['access_token'][:10]}...")

    def test_03_login_failure_wrong_password(self):
        """Test login failure with incorrect password."""
        payload = {
            'username': 'doctor',
            'password': INVALID_PASSWORD
        }
        headers = {'Content-Type': 'application/json'}
        response = requests.post(LOGIN_URL, headers=headers, json=payload)

        # According to Table 7.2, error is 400
        self.assertEqual(response.status_code, 400, f"Expected 400 Bad Request, got {response.status_code}")
        response_data = response.json()
        self.assertIn('message', response_data, "Error response should contain 'message'")
        print(f"\n[Login Fail Wrong Password] Message: {response_data.get('message')}")

    def test_04_login_failure_unknown_user(self):
        """Test login failure with a non-existent username."""
        payload = {
            'username': UNKNOWN_USER,
            'password': 'anypassword'
        }
        headers = {'Content-Type': 'application/json'}
        response = requests.post(LOGIN_URL, headers=headers, json=payload)

        self.assertEqual(response.status_code, 400) # Based on Table 7.2
        response_data = response.json()
        self.assertIn('message', response_data)
        print(f"\n[Login Fail Unknown User] Message: {response_data.get('message')}")

    def test_05_login_failure_missing_password(self):
        """Test login failure when password field is missing."""
        payload = {
            'username': 'doctor'
            # 'password' is intentionally missing
        }
        headers = {'Content-Type': 'application/json'}
        response = requests.post(LOGIN_URL, headers=headers, json=payload)

        # Expecting a 400 Bad Request due to missing data validation server-side
        self.assertEqual(response.status_code, 400)
        response_data = response.json()
        self.assertIn('message', response_data)
        print(f"\n[Login Fail Missing Field] Message: {response_data.get('message')}")

    def test_06_logout_success(self):
        """Test successful logout requires a valid token."""
        # Step 1: Log in to get a valid token
        login_payload = {
            'username': 'nurse',
            'password': VALID_CREDENTIALS['nurse']
        }
        login_headers = {'Content-Type': 'application/json'}
        login_response = requests.post(LOGIN_URL, headers=login_headers, json=login_payload)
        self.assertEqual(login_response.status_code, 200, "Login failed, cannot proceed with logout test")
        token = login_response.json().get('access_token')
        self.assertIsNotNone(token, "Failed to get token from login response")
        print(f"\n[Logout Test] Logged in as nurse, got token: {token[:10]}...")

        # Step 2: Use the token to logout
        logout_headers = {'Authorization': f'Bearer {token}'}
        logout_response = requests.post(LOGOUT_URL, headers=logout_headers)

        self.assertEqual(logout_response.status_code, 200, f"Expected 200 OK for logout, got {logout_response.status_code} - Response: {logout_response.text}")
        logout_data = logout_response.json()
        # *** THIS IS THE KEY CHANGE: Check for 'message', not 'token' ***
        self.assertIn('message', logout_data, "Successful logout response should contain 'message'")
        self.assertEqual(logout_data['message'], 'Logout success', "Logout message mismatch")
        print(f"[Logout Success] Message: {logout_data.get('message')}") # Updated print

    def test_07_logout_failure_invalid_token(self):
        """Test logout failure with an invalid/malformed token."""
        invalid_token = "this.is.not.a.valid.jwt.token"
        headers = {'Authorization': f'Bearer {invalid_token}'}
        response = requests.post(LOGOUT_URL, headers=headers)

        # *** THIS IS THE KEY CHANGE: Expect 422, not 401 ***
        self.assertEqual(response.status_code, 422, f"Expected 422 Unprocessable Entity, got {response.status_code} - Response: {response.text}")
        response_data = response.json()
        # Flask-JWT-Extended usually returns 'msg' for errors
        self.assertIn('msg', response_data, "Unauthorized/Invalid response should contain 'msg'")
        print(f"\n[Logout Fail Invalid Token] Message: {response_data.get('msg')}")

    def test_08_logout_failure_no_token(self):
        """Test logout failure when no Authorization header is provided."""
        # No headers provided for this request
        response = requests.post(LOGOUT_URL)

        self.assertEqual(response.status_code, 401) # Based on Table 7.4
        response_data = response.json()
        self.assertIn('msg', response_data) # Based on Table 7.4
        print(f"\n[Logout Fail No Token] Message: {response_data.get('msg')}")

# --- Test Runner ---
if __name__ == '__main__':
    unittest.main(verbosity=2) # verbosity=2 provides more detailed output