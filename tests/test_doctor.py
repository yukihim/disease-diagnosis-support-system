import unittest
import requests
import json
from urllib.parse import urljoin
import time # For checking timestamp formats if needed

# --- Configuration ---
BASE_URL = 'http://localhost:5001/' # Adjust if your server runs elsewhere
LOGIN_URL = urljoin(BASE_URL, '/authentication/login') # Needed for setUpClass

# Doctor Landing Page URLs
URL_INCOMING_PATIENTS = urljoin(BASE_URL, '/doctor/landing_page/incoming_patient')
URL_TODAYS_APPOINTMENTS = urljoin(BASE_URL, '/doctor/landing_page/todays_appointment')
URL_PATIENTS_SENT_TEST = urljoin(BASE_URL, '/doctor/landing_page/patient_sent_for_test')
URL_INPATIENT_MONITORING_LIST = urljoin(BASE_URL, '/doctor/landing_page/inpatient_monitoring')

# Diagnosis URLs (Using template for path parameters)
URL_DIAGNOSIS_PATIENT_INFO = urljoin(BASE_URL, '/doctor/diagnosis/patient_information/') # Add <sessionID> later
URL_DIAGNOSIS_VITALS = urljoin(BASE_URL, '/doctor/diagnosis/vital_signs/')       # Add <sessionID> later
URL_DIAGNOSIS_TEST_RESULTS = urljoin(BASE_URL, '/doctor/diagnosis/test_results/')   # Add <sessionID> later

# Send For Test URL
URL_SEND_FOR_TEST = urljoin(BASE_URL, '/doctor/send_for_test/test_list/')       # Add <sessionID> later

# Finalize Diagnosis URL
URL_FINALIZE_DIAGNOSIS = urljoin(BASE_URL, '/doctor/finalize_diagnosis/set_final_diagnosis/') # Add <sessionID> later

# Prescription & Procedure URLs
URL_SET_PRESCRIPTION = urljoin(BASE_URL, '/doctor/prescription_and_procedure/set_prescription/') # Add <sessionID> later
URL_SET_PROCEDURE = urljoin(BASE_URL, '/doctor/prescription_and_procedure/set_procedure/')     # Add <sessionID> later
URL_SET_FOLLOW_UP = urljoin(BASE_URL, '/doctor/prescription_and_procedure/set_follow_up/')     # Add <sessionID> later

# Inpatient Monitoring URLs (Using template for path parameters)
URL_GET_DEVICE_MEASUREMENTS = urljoin(BASE_URL, '/doctor/inpatient_monitoring/medical_device_measurement/') # Add <inpatientID> later
URL_GET_EVENT_LIST = urljoin(BASE_URL, '/doctor/inpatient_monitoring/event_list/')                 # Add <inpatientID> later
URL_ADD_EVENT_NOTE = urljoin(BASE_URL, '/doctor/inpatient_monitoring/add_event_note/')             # Add <inpatientID> later


# --- Test Data ---
DOCTOR_CREDENTIALS = {'username': 'doctor', 'password': 'test'}
# Session ID from mock data and documentation examples
TEST_SESSION_ID = "abc-xyz-123"
VALID_SESSION_ID = "session_1"
INVALID_SESSION_ID = "invalid-session-does-not-exist"
# Inpatient ID from mock data (corresponds to TEST_SESSION_ID's patient)
TEST_INPATIENT_ID = "patient_005" # Mock patient info exists, but no device/event data keyed by this inpatientID yet
VALID_INPATIENT_ID = "patient_in_001" # Inpatient with event and device data
INVALID_INPATIENT_ID = "invalid-inpatient-id"
VALID_EVENT_ID_FOR_NOTE = "event_1" # Belongs to VALID_INPATIENT_ID
INVALID_EVENT_ID_FOR_NOTE = "event_xxx"

class TestDoctorAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Login as doctor once for all tests in this class."""
        print("\n--- Logging in Doctor for Test Suite ---")
        login_payload = DOCTOR_CREDENTIALS
        headers = {'Content-Type': 'application/json'}
        try:
            response = requests.post(LOGIN_URL, headers=headers, json=login_payload)
            response.raise_for_status() # Raise exception for bad status codes (4xx or 5xx)
            cls.doctor_token = response.json().get('access_token')
            assert cls.doctor_token is not None, "Failed to retrieve access token during login."
            cls.headers = {
                'Authorization': f'Bearer {cls.doctor_token}',
                'Content-Type': 'application/json'
            }
            print(f"Doctor Login Successful. Token: {cls.doctor_token[:15]}...")
        except requests.exceptions.RequestException as e:
            print(f"FATAL: Doctor Login Failed in setUpClass: {e}")
            # If login fails, skip all tests or handle appropriately
            raise ConnectionError(f"Could not log in doctor for tests: {e}")

    # --- Landing Page Tests ---

    def test_01_get_incoming_patients(self):
        """Test GET /landing_page/incoming_patient"""
        response = requests.get(URL_INCOMING_PATIENTS, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("incomingPatient", data)
        self.assertIsInstance(data["incomingPatient"], list)
        if data["incomingPatient"]: # Check first item if list not empty
             self.assertIn("sessionID", data["incomingPatient"][0])
             self.assertIn("name", data["incomingPatient"][0])

    def test_02_get_todays_appointments(self):
        """Test GET /landing_page/todays_appointment"""
        response = requests.get(URL_TODAYS_APPOINTMENTS, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("appointments", data)
        self.assertIsInstance(data["appointments"], list)
        if data["appointments"]:
            self.assertIn("name", data["appointments"][0])
            self.assertIn("time", data["appointments"][0])

    def test_03_get_patients_sent_for_test(self):
        """Test GET /landing_page/patient_sent_for_test"""
        response = requests.get(URL_PATIENTS_SENT_TEST, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("patientSentForTest", data)
        self.assertIsInstance(data["patientSentForTest"], list)
        if data["patientSentForTest"]:
            self.assertIn("name", data["patientSentForTest"][0])
            self.assertIn("test", data["patientSentForTest"][0])

    def test_04_get_inpatient_monitoring_list(self):
        """Test GET /landing_page/inpatient_monitoring"""
        response = requests.get(URL_INPATIENT_MONITORING_LIST, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("inpatientMonitoring", data)
        self.assertIsInstance(data["inpatientMonitoring"], list)
        if data["inpatientMonitoring"]:
            self.assertIn("patientID", data["inpatientMonitoring"][0])
            self.assertIn("name", data["inpatientMonitoring"][0])

    # --- Diagnosis Tests ---

    def test_05_get_diagnosis_patient_info_success(self):
        """Test GET /diagnosis/patient_information/<sessionID> - Success"""
        url = urljoin(URL_DIAGNOSIS_PATIENT_INFO, TEST_SESSION_ID)
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("name"), "Charlie Chaplin (Test)")
        self.assertIn("dob", data)
        self.assertIn("ssn", data)
        self.assertIn("hasFollowUpAppointment", data) # Check a boolean field

    def test_06_get_diagnosis_patient_info_not_found(self):
        """Test GET /diagnosis/patient_information/<sessionID> - Not Found"""
        url = urljoin(URL_DIAGNOSIS_PATIENT_INFO, INVALID_SESSION_ID)
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 404) # Based on Flask code
        self.assertIn("error", response.json())

    def test_07_get_vital_signs_success(self):
        """Test GET /diagnosis/vital_signs/<sessionID> - Success"""
        url = urljoin(URL_DIAGNOSIS_VITALS, TEST_SESSION_ID)
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("vitalSigns", data)
        self.assertIsInstance(data["vitalSigns"], list)
        self.assertTrue(len(data["vitalSigns"]) > 0) # Expecting data for this ID
        self.assertIn("timeMeasured", data["vitalSigns"][0])
        self.assertIn("bloodPressure", data["vitalSigns"][0])

    def test_08_get_vital_signs_empty(self):
        """Test GET /diagnosis/vital_signs/<sessionID> - Valid Session, No Vitals"""
        # Assuming session_2 exists but has no vitals in mock_vital_signs
        valid_session_no_vitals = "session_2"
        url = urljoin(URL_DIAGNOSIS_VITALS, valid_session_no_vitals)
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 200) # Backend returns 200 with empty list
        data = response.json()
        self.assertIn("vitalSigns", data)
        self.assertIsInstance(data["vitalSigns"], list)
        self.assertEqual(len(data["vitalSigns"]), 0)

    def test_09_get_vital_signs_not_found(self):
        """Test GET /diagnosis/vital_signs/<sessionID> - Session Not Found"""
        url = urljoin(URL_DIAGNOSIS_VITALS, INVALID_SESSION_ID)
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 404) # Based on Flask code check
        self.assertIn("message", response.json())

    def test_10_get_test_results_success(self):
        """Test GET /diagnosis/test_results/<sessionID> - Success"""
        url = urljoin(URL_DIAGNOSIS_TEST_RESULTS, TEST_SESSION_ID)
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("testResults", data)
        self.assertIsInstance(data["testResults"], list)
        self.assertTrue(len(data["testResults"]) > 0)
        self.assertIn("timeMeasured", data["testResults"][0])
        self.assertIn("testType", data["testResults"][0])
        self.assertIn("parameters", data["testResults"][0])
        self.assertIsInstance(data["testResults"][0]["parameters"], list)

    # Add tests for empty results and not found for test_results similar to vital_signs if desired

    # --- Send For Test ---

    def test_11_send_for_test_success(self):
        """Test POST /send_for_test/test_list/<sessionID> - Success"""
        url = urljoin(URL_SEND_FOR_TEST, TEST_SESSION_ID)
        payload = {"tests": ["Complete Blood Count", "Urinalysis"]}
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("message", data)
        self.assertEqual(data["message"], "Set tests successfully")

    def test_12_send_for_test_missing_data(self):
        """Test POST /send_for_test/test_list/<sessionID> - Missing 'tests'"""
        url = urljoin(URL_SEND_FOR_TEST, TEST_SESSION_ID)
        payload = {} # Missing 'tests'
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 400)
        self.assertIn("message", response.json())

    def test_13_send_for_test_invalid_data(self):
        """Test POST /send_for_test/test_list/<sessionID> - Invalid 'tests' type"""
        url = urljoin(URL_SEND_FOR_TEST, TEST_SESSION_ID)
        payload = {"tests": "Just a string"} # Should be list
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 400)
        self.assertIn("message", response.json())

    def test_14_send_for_test_session_not_found(self):
        """Test POST /send_for_test/test_list/<sessionID> - Session Not Found"""
        url = urljoin(URL_SEND_FOR_TEST, INVALID_SESSION_ID)
        payload = {"tests": ["X-Ray"]}
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 404)
        self.assertIn("message", response.json())

    # --- Finalize Diagnosis ---

    def test_15_finalize_diagnosis_success(self):
        """Test POST /finalize_diagnosis/set_final_diagnosis/<sessionID> - Success"""
        url = urljoin(URL_FINALIZE_DIAGNOSIS, TEST_SESSION_ID)
        payload = {"diagnosis": "Acute Bronchitis"}
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("message"), "Set final diagnosis successfully")

    def test_16_finalize_diagnosis_missing_data(self):
        """Test POST /finalize_diagnosis/set_final_diagnosis/<sessionID> - Missing 'diagnosis'"""
        url = urljoin(URL_FINALIZE_DIAGNOSIS, TEST_SESSION_ID)
        payload = {}
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 400)

    def test_17_finalize_diagnosis_session_not_found(self):
        """Test POST /finalize_diagnosis/set_final_diagnosis/<sessionID> - Not Found"""
        url = urljoin(URL_FINALIZE_DIAGNOSIS, INVALID_SESSION_ID)
        payload = {"diagnosis": "Test"}
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 404)

    # --- Prescription and Procedure ---

    def test_18_set_prescription_success(self):
        """Test POST /prescription_and_procedure/set_prescription/<sessionID> - Success"""
        url = urljoin(URL_SET_PRESCRIPTION, TEST_SESSION_ID)
        # From documentation example
        payload = {
            "prescription": [
                {"medicine": "Paracetamol", "morning": "1", "noon": "1", "afternoon": "1", "evening": "1", "duration": "5 days", "note": "Take with food"},
                {"medicine": "Aspirin", "morning": "1", "noon": "0", "afternoon": "1", "evening": "1", "duration": "4 days", "note": "Take after food"}
            ]
        }
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get("message"), "Set patient prescription successfully")

    def test_19_set_prescription_invalid_structure(self):
        """Test POST /prescription_and_procedure/set_prescription/<sessionID> - Missing fields"""
        url = urljoin(URL_SET_PRESCRIPTION, TEST_SESSION_ID)
        payload = {
            "prescription": [
                {"medicine": "Paracetamol", "morning": "1", "note": "Take with food"} # Missing fields
            ]
        }
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 400) # Validation catches missing fields

    def test_20_set_procedure_success(self):
        """Test POST /prescription_and_procedure/set_procedure/<sessionID> - Success"""
        url = urljoin(URL_SET_PROCEDURE, TEST_SESSION_ID)
        # From documentation example
        payload = {
            "procedure": [
                {"procedureName": "Nasal Irrigation", "dateTime": "24/04/2025, 07:00 AM", "note": "Patient is allergic to penicillin"},
                {"procedureName": "Cortisone Injection - Right Knee", "dateTime": "25/04/2025, 09:00 AM", "note": "Use preservative-free solution due to patient sensitivity."}
            ]
        }
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get("message"), "Set patient procedure successfully")

    def test_21_set_follow_up_success(self):
        """Test POST /prescription_and_procedure/set_follow_up/<sessionID> - Success"""
        url = urljoin(URL_SET_FOLLOW_UP, TEST_SESSION_ID)
        payload = {"date": "25/04/2025"}
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get("message"), "Set follow up date successfully")
        # Add a check to see if hasFollowUpAppointment changed if possible/needed

    # --- Inpatient Monitoring ---

    def test_22_get_device_measurements_success(self):
        """Test GET /inpatient_monitoring/medical_device_measurement/<inpatientID> - Success"""
        # Note: Using VALID_INPATIENT_ID which has data keyed by sessionID in mock data
        # The API path uses inpatientID, but the mock data is keyed by sessionID.
        # Adjusting test to use the sessionID corresponding to VALID_INPATIENT_ID for mock data access
        session_id_for_valid_inpatient = "inpatient_session_1" # Map VALID_INPATIENT_ID back to its session for mock data
        url = urljoin(URL_GET_DEVICE_MEASUREMENTS, session_id_for_valid_inpatient) # Using session ID for path param due to mock data structure
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("testResults", data) # API returns this key
        self.assertIsInstance(data["testResults"], list)
        self.assertTrue(len(data["testResults"]) > 0)
        self.assertIn("timeMeasured", data["testResults"][0])
        self.assertIn("name", data["testResults"][0])
        self.assertIn("value", data["testResults"][0])

    def test_23_get_device_measurements_not_found(self):
        """Test GET /inpatient_monitoring/medical_device_measurement/<inpatientID> - Not Found"""
        url = urljoin(URL_GET_DEVICE_MEASUREMENTS, INVALID_INPATIENT_ID) # Using truly invalid ID
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 404) # Session not found check
        self.assertIn("message", response.json())

    def test_24_get_event_list_success(self):
        """Test GET /inpatient_monitoring/event_list/<inpatientID> - Success"""
        url = urljoin(URL_GET_EVENT_LIST, VALID_INPATIENT_ID)
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        # API uses 'vitalSigns' key for events list based on code!
        self.assertIn("vitalSigns", data)
        self.assertIsInstance(data["vitalSigns"], list)
        self.assertTrue(len(data["vitalSigns"]) > 0)
        self.assertIn("eventID", data["vitalSigns"][0])
        self.assertIn("time", data["vitalSigns"][0]) # Should be ISO format str
        self.assertIn("name", data["vitalSigns"][0])
        self.assertIn("note", data["vitalSigns"][0])

    def test_25_get_event_list_inpatient_not_found(self):
        """Test GET /inpatient_monitoring/event_list/<inpatientID> - Inpatient Not Found"""
        url = urljoin(URL_GET_EVENT_LIST, INVALID_INPATIENT_ID)
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 404) # Inpatient ID not in mock_patient_details
        self.assertIn("error", response.json())

    def test_26_add_event_note_success(self):
        """Test POST /inpatient_monitoring/add_event_note/<inpatientID> - Success"""
        url = urljoin(URL_ADD_EVENT_NOTE, VALID_INPATIENT_ID)
        payload = {"eventID": VALID_EVENT_ID_FOR_NOTE, "note": "Updated note via test."}
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("message"), "Event note added successfully")
        # Could add a GET event list check here to verify the note changed in mock data if needed

    def test_27_add_event_note_event_not_found(self):
        """Test POST /inpatient_monitoring/add_event_note/<inpatientID> - Event ID Not Found"""
        url = urljoin(URL_ADD_EVENT_NOTE, VALID_INPATIENT_ID)
        payload = {"eventID": INVALID_EVENT_ID_FOR_NOTE, "note": "This shouldn't work."}
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 404) # Event ID not found for this patient
        self.assertIn("message", response.json())

    def test_28_add_event_note_inpatient_not_found(self):
        """Test POST /inpatient_monitoring/add_event_note/<inpatientID> - Inpatient Not Found"""
        url = urljoin(URL_ADD_EVENT_NOTE, INVALID_INPATIENT_ID)
        payload = {"eventID": "any_event", "note": "Test note."}
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 404) # Inpatient ID not found
        self.assertIn("message", response.json())

    def test_29_add_event_note_missing_data(self):
        """Test POST /inpatient_monitoring/add_event_note/<inpatientID> - Missing Fields"""
        url = urljoin(URL_ADD_EVENT_NOTE, VALID_INPATIENT_ID)
        payload = {"note": "Missing eventID"} # Missing eventID
        response = requests.post(url, headers=self.headers, json=payload)
        self.assertEqual(response.status_code, 400)
        self.assertIn("message", response.json())

# --- Test Runner ---
if __name__ == '__main__':
    unittest.main(verbosity=2)