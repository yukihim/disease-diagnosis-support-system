import unittest
import requests
import json
from urllib.parse import urljoin, urlencode
import datetime

# --- Configuration ---
BASE_URL = 'http://localhost:5001/' # Adjust if your server runs elsewhere
LOGIN_URL = urljoin(BASE_URL, '/authentication/login')
CALENDAR_URL = urljoin(BASE_URL, '/calendar_events')

# --- Test Data ---
DOCTOR_CREDENTIALS = {'username': 'doctor', 'password': 'test'} # User needs to be logged in

# Dates from mock data
DATE_WITH_EVENTS = {'year': '2025', 'month': '04', 'day': '21'}
DATE_WITHOUT_EVENTS = {'year': '2025', 'month': '04', 'day': '23'} # Exists conceptually but no mock data
DATE_INVALID_FORMAT = {'year': '2025', 'month': '13', 'day': '01'} # Invalid month

class TestEventsCalendarAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Login as doctor once for all tests in this class."""
        print("\n--- Logging in User for Events Calendar Test Suite ---")
        login_payload = DOCTOR_CREDENTIALS # Or any valid user
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

    def test_01_get_calendar_events_success_with_data(self):
        """Test GET /calendar_events with a date that has events."""
        # Construct URL with query parameters
        query_params = urlencode(DATE_WITH_EVENTS)
        full_url = f"{CALENDAR_URL}?{query_params}"

        response = requests.get(full_url, headers=self.headers)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()

        self.assertIn("time", data)
        self.assertIsInstance(data["time"], str) # Should be HH:MM:SS format

        self.assertIn("events", data)
        self.assertIsInstance(data["events"], list)
        self.assertGreater(len(data["events"]), 0, "Expected events for this date")

        # Check structure of the first event
        first_event = data["events"][0]
        self.assertIn("time", first_event)
        self.assertIn("description", first_event)
        print(f"\n[Events Success] Got {len(data['events'])} events for {DATE_WITH_EVENTS}")

    def test_02_get_calendar_events_success_no_data(self):
        """Test GET /calendar_events with a valid date that has no events."""
        query_params = urlencode(DATE_WITHOUT_EVENTS)
        full_url = f"{CALENDAR_URL}?{query_params}"

        response = requests.get(full_url, headers=self.headers)
        self.assertEqual(response.status_code, 200, f"Response: {response.text}")
        data = response.json()

        self.assertIn("time", data)
        self.assertIn("events", data)
        self.assertIsInstance(data["events"], list)
        self.assertEqual(len(data["events"]), 0, "Expected empty events list for this date")
        print(f"\n[Events Success No Data] Got empty list for {DATE_WITHOUT_EVENTS}")

    def test_03_get_calendar_events_missing_parameter(self):
        """Test GET /calendar_events with a missing query parameter."""
        # Missing 'day'
        incomplete_date = {'year': '2025', 'month': '04'}
        query_params = urlencode(incomplete_date)
        full_url = f"{CALENDAR_URL}?{query_params}"

        response = requests.get(full_url, headers=self.headers)
        self.assertEqual(response.status_code, 400, f"Response: {response.text}")
        data = response.json()
        self.assertIn("message", data)
        self.assertIn("Missing required query parameters", data["message"])
        print(f"\n[Events Missing Param] Got error: {data.get('message')}")

    def test_04_get_calendar_events_invalid_date_format(self):
        """Test GET /calendar_events with invalid date values (e.g., month 13)."""
        query_params = urlencode(DATE_INVALID_FORMAT)
        full_url = f"{CALENDAR_URL}?{query_params}"

        response = requests.get(full_url, headers=self.headers)
        self.assertEqual(response.status_code, 400, f"Response: {response.text}")
        data = response.json()
        self.assertIn("message", data)
        self.assertEqual(data["message"], "Invalid date parameters provided.")
        print(f"\n[Events Invalid Date] Got error: {data.get('message')}")

    def test_05_get_calendar_events_no_auth(self):
        """Test GET /calendar_events without providing Authorization header."""
        query_params = urlencode(DATE_WITH_EVENTS)
        full_url = f"{CALENDAR_URL}?{query_params}"

        response = requests.get(full_url) # No headers sent
        self.assertEqual(response.status_code, 401, f"Response: {response.text}") # Expect Unauthorized
        data = response.json()
        self.assertIn("msg", data) # Flask-JWT-Extended usually uses 'msg' for auth errors
        print(f"\n[Events No Auth] Got error: {data.get('msg')}")

# --- Test Runner ---
if __name__ == '__main__':
    unittest.main(verbosity=2)