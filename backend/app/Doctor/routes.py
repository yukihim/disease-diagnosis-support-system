# For simplicity, assuming direct use of 'app' like the receptionist example
from . import app # Adjust this import based on your project structure
from flask import request, jsonify
from ..authentication import check_role # Assuming check_role decorator exists
from flask_jwt_extended import jwt_required, get_jwt_identity
import datetime
import random
import uuid # For generating unique IDs if needed

# --- Mock Data ---

# Mock data needs to cover the 'test value' sessionID: 'abc-xyz-123' where applicable
mock_sessions = {
    "session_1": {"patientName": "Alice Wonderland", "patientID": "patient_003"},
    "session_2": {"patientName": "Bob The Builder", "patientID": "patient_004"},
    "abc-xyz-123": {"patientName": "Charlie Chaplin (Test)", "patientID": "patient_005"}, # Specific session for testing path params
    "inpatient_session_1": {"patientName": "Diana Prince", "patientID": "patient_in_001"},
    "inpatient_session_2": {"patientName": "Clark Kent", "patientID": "patient_in_002"},
}

mock_incoming_patients = [
    {"sessionID": "session_1", "name": "Alice Wonderland", "sex": "Female", "age": 30, "from": "Reception", "state": "Waiting", "note": "Fever and cough"},
    {"sessionID": "session_2", "name": "Bob The Builder", "sex": "Male", "age": 45, "from": "Emergency", "state": "Waiting", "note": "Minor injury"},
]

mock_todays_appointments = [
    {"name": "Eve Harrington", "time": "14:30", "condition": "Follow-up Check"},
    {"name": "Frank Sinatra", "time": "15:00", "condition": "Consultation"},
    {"name": "Grace Kelly", "time": "15:30", "condition": "Annual Physical"},
]

mock_patients_sent_for_test = [
    {"name": "Harry Potter", "test": "Blood Test", "state": "Pending Results"},
    {"name": "Hermione Granger", "test": "X-Ray", "state": "Completed"},
    {"name": "Ron Weasley", "test": "Urinalysis", "state": "Pending Results"},
]

mock_inpatient_monitoring = [
    {"patientID": "patient_in_001", "name": "Diana Prince", "sex": "Female", "age": 35, "room": "301A", "admissionDate": "2024-07-20", "condition": "Post-surgery recovery", "status": "Stable"},
    {"patientID": "patient_in_002", "name": "Clark Kent", "sex": "Male", "age": 40, "room": "302B", "admissionDate": "2024-07-21", "condition": "Observation", "status": "Improving"},
]

# Reusing receptionist mock patient details, adding test session ID patient
mock_patient_details = {
    "patient_003": {"name": "Alice Wonderland", "dob": "1994-03-15", "gender": "Female", "type": "Outpatient", "phone": "0911223344", "job": "Writer", "ssn": "079300003333", "hic": "HIC-D", "height": "165", "weight": "60", "address": "1 Rabbit Hole, Wonderland", "hasFollowUpAppointment": False},
    "patient_004": {"name": "Bob The Builder", "dob": "1979-08-20", "gender": "Male", "type": "Outpatient", "phone": "0955667788", "job": "Construction Worker", "ssn": "079400004444", "hic": "HIC-E", "height": "178", "weight": "80", "address": "1 Construction Way, Builderville", "hasFollowUpAppointment": True},
    "patient_005": {"name": "Charlie Chaplin (Test)", "dob": "1988-04-16", "gender": "Male", "type": "Outpatient", "phone": "0999888777", "job": "Actor", "ssn": "079500005555", "hic": "HIC-F", "height": "170", "weight": "68", "address": "5 Silent Street, Hollywood", "hasFollowUpAppointment": False},
    "patient_in_001": {"name": "Diana Prince", "dob": "1989-06-01", "gender": "Female", "type": "Inpatient", "phone": "0912121212", "job": "Curator", "ssn": "079600006666", "hic": "HIC-G", "height": "175", "weight": "65", "address": "Themyscira", "hasFollowUpAppointment": False},
    "patient_in_002": {"name": "Clark Kent", "dob": "1984-02-29", "gender": "Male", "type": "Inpatient", "phone": "0934343434", "job": "Reporter", "ssn": "079700007777", "hic": "HIC-H", "height": "190", "weight": "95", "address": "Metropolis", "hasFollowUpAppointment": False},
}

mock_vital_signs = {
    "session_1": [
        {"timeMeasured": "2024-07-22 09:00:00", "bloodPressure": "120/80", "pulse": 75, "breathingRate": 16, "temperature": 38.5, "bmi": 22.0, "oxygenSaturation": 98},
        {"timeMeasured": "2024-07-22 13:00:00", "bloodPressure": "118/78", "pulse": 72, "breathingRate": 15, "temperature": 37.8, "bmi": 22.0, "oxygenSaturation": 99},
    ],
    "abc-xyz-123": [
        {"timeMeasured": "2024-07-22 10:30:00", "bloodPressure": "130/85", "pulse": 80, "breathingRate": 18, "temperature": 37.0, "bmi": 23.5, "oxygenSaturation": 97},
    ]
    # Add more session IDs if needed
}

mock_test_results = {
     "session_1": [
        {
            "timeMeasured": "2024-07-21 11:00:00",
            "testType": "Complete Blood Count",
            "parameters": [
                {"name": "Hemoglobin", "value": "14.5 g/dL"},
                {"name": "WBC Count", "value": "7.5 x 10^9/L"},
                {"name": "Platelet Count", "value": "250 x 10^9/L"}
            ]
        }
    ],
     "abc-xyz-123": [
        {
            "timeMeasured": "2024-07-22 08:00:00",
            "testType": "Urinalysis",
            "parameters": [
                {"name": "pH", "value": "6.0"},
                {"name": "Specific Gravity", "value": "1.015"},
                {"name": "Protein", "value": "Negative"}
            ]
        },
        {
            "timeMeasured": "2024-07-22 14:00:00",
            "testType": "Lipid Panel",
            "parameters": [
                {"name": "Total Cholesterol", "value": "190 mg/dL"},
                {"name": "LDL", "value": "120 mg/dL"},
                {"name": "HDL", "value": "50 mg/dL"}
            ]
        }
    ]
}

mock_medical_device_measurements = {
    "inpatient_session_1": [ # Keyed by sessionID
        {"timeMeasured": "2024-07-22 10:00:00", "name": "ECG - Heart Rate", "value": "72 bpm"},
        {"timeMeasured": "2024-07-22 10:00:00", "name": "Blood Oxygen", "value": "99%"},
        {"timeMeasured": "2024-07-22 11:00:00", "name": "Blood Pressure (Monitor)", "value": "115/75 mmHg"},
    ],
    "abc-xyz-123": [ # Keyed by sessionID (test value)
        {"timeMeasured": "2024-07-23 08:00:00", "name": "Continuous Glucose Monitor", "value": "110 mg/dL"},
        {"timeMeasured": "2024-07-23 08:05:00", "name": "ECG - Heart Rate", "value": "78 bpm"},
    ]
}

# Store added events and notes temporarily for mock purposes
# Keyed by inpatientID now, added mock timestamp
import time # For mock timestamps
mock_inpatient_events = {
    "patient_in_001": { # Keyed by inpatientID
        "event_1": { "event": "Routine Check", "note": "Vitals stable.", "time": time.time() - 3600 }, # Added mock timestamp (1 hour ago)
        "event_2": { "event": "Medication Administered", "note": "", "time": time.time() - 1800 } # Added mock timestamp (30 mins ago)
    },
    "patient_in_002": { # Keyed by inpatientID
        "event_3": { "event": "Initial Assessment", "note": "Patient resting comfortably.", "time": time.time() - 7200 }
    },
    "patient_005": { # Corresponds to session abc-xyz-123 for testing
        "event_test_1": { "event": "Test Event", "note": "Test note.", "time": time.time() - 60}
    }
}

# --- Helper Function ---
def get_patient_id_from_session(sessionID):
    """Helper function to retrieve patientID from mock session data."""
    session_data = mock_sessions.get(sessionID)
    if session_data:
        return session_data.get("patientID")
    return None # Return None if sessionID is not found

# --- API Endpoints ---

# === Landing Page ===

# 7.4.5.1 Landing Page: Get Incoming Patient List
@app.route('/landing_page/incoming_patient', methods=['GET'])
@jwt_required()
@check_role(['doctor'])
def get_incoming_patient_list():
    """Retrieves the list of patients waiting for the doctor."""
    try:
        # In real scenario: Query database for patients assigned to this doctor and status 'Waiting'
        return jsonify({"incomingPatient": mock_incoming_patients}), 200
    except Exception as e:
        print(f"Error in get_incoming_patient_list: {e}")
        return jsonify({"message": "An error occurred retrieving incoming patient list."}), 500

# 7.4.5.2 Landing Page: Get Today’s Appointment List
@app.route('/landing_page/todays_appointment', methods=['GET'])
@jwt_required()
@check_role(['doctor'])
def get_todays_appointment_list():
    """Retrieves the list of today's appointments for the doctor."""
    try:
        # In real scenario: Query database for appointments scheduled for today for this doctor
        return jsonify({"appointments": mock_todays_appointments}), 200
    except Exception as e:
        print(f"Error in get_todays_appointment_list: {e}")
        return jsonify({"message": "An error occurred retrieving today's appointment list."}), 500

# 7.4.5.3 Landing Page: Get Patient Sent For Paraclinical Test List
@app.route('/landing_page/patient_sent_for_test', methods=['GET'])
@jwt_required()
@check_role(['doctor'])
def get_patient_sent_for_test_list():
    """Retrieves the list of patients sent for tests by this doctor."""
    try:
        # In real scenario: Query database for patients associated with this doctor and having pending/recent tests
        return jsonify({"patientSentForTest": mock_patients_sent_for_test}), 200
    except Exception as e:
        print(f"Error in get_patient_sent_for_test_list: {e}")
        return jsonify({"message": "An error occurred retrieving patient test list."}), 500

# 7.4.5.4 Landing Page: Get Inpatient Monitoring List
@app.route('/landing_page/inpatient_monitoring', methods=['GET'])
@jwt_required()
@check_role(['doctor'])
def get_inpatient_monitoring_list():
    """Retrieves the list of inpatients assigned to this doctor."""
    try:
        # In real scenario: Query database for inpatients under this doctor's care
        return jsonify({"inpatientMonitoring": mock_inpatient_monitoring}), 200
    except Exception as e:
        print(f"Error in get_inpatient_monitoring_list: {e}")
        return jsonify({"message": "An error occurred retrieving inpatient monitoring list."}), 500

# === Diagnosis ===

# 7.4.5.5 Diagnosis: Patient Information
@app.route('/diagnosis/patient_information/<string:sessionID>', methods=['GET'])
@jwt_required()
@check_role(['doctor'])
def get_diagnosis_patient_information(sessionID):
    """Retrieves detailed information for a patient based on sessionID."""
    try:
        patientID = get_patient_id_from_session(sessionID)
        if not patientID or patientID not in mock_patient_details:
            return jsonify({"error": f"Patient information not found for session '{sessionID}'."}), 404 # Use 404

        patient_info = mock_patient_details[patientID]

        # Format response according to documentation
        response_data = {
            "name": patient_info.get("name"),
            "dob": patient_info.get("dob"),
            "gender": patient_info.get("gender"),
            "type": patient_info.get("type", "Unknown"), # Added default
            "phone": patient_info.get("phone"),
            "job": patient_info.get("job"),
            "ssn": patient_info.get("ssn"),
            "hic": patient_info.get("hic"),
            "height": patient_info.get("height"),
            "weight": patient_info.get("weight"),
            "address": patient_info.get("address"),
            "hasFollowUpAppointment": patient_info.get("hasFollowUpAppointment", False)
        }
        return jsonify(response_data), 200

    except Exception as e:
        print(f"Error retrieving patient info for session {sessionID}: {e}")
        return jsonify({"error": "Error while retrieving patient information."}), 400 # Doc says 400 for errors

# 7.4.5.6 Diagnosis: Patient Vital Signs
@app.route('/diagnosis/vital_signs/<string:sessionID>', methods=['GET'])
@jwt_required()
@check_role(['doctor'])
def get_patient_vital_signs(sessionID):
    """Retrieves vital signs recorded during the patient's session."""
    try:
        vitals = mock_vital_signs.get(sessionID)
        if vitals is None: # Check if key exists, even if value is empty list
             # Decide if session not found is 404 or 200 with empty list
             # Let's return 200 with empty list if session is conceptually valid but has no vitals
             if sessionID not in mock_sessions:
                 return jsonify({"message": f"Session '{sessionID}' not found."}), 404
             else:
                 return jsonify({"vitalSigns": []}), 200 # Session exists, no vitals recorded

        return jsonify({"vitalSigns": vitals}), 200

    except Exception as e:
        print(f"Error retrieving vital signs for session {sessionID}: {e}")
        # Doc says 400 for invalid query, but this is a server error
        return jsonify({"message": "An error occurred retrieving vital signs."}), 500

# 7.4.5.7 Diagnosis: Patient Test Results
@app.route('/diagnosis/test_results/<string:sessionID>', methods=['GET'])
@jwt_required()
@check_role(['doctor'])
def get_patient_test_results(sessionID):
    """Retrieves paraclinical test results for the patient's session."""
    try:
        results = mock_test_results.get(sessionID)
        if results is None:
            if sessionID not in mock_sessions:
                 return jsonify({"message": f"Session '{sessionID}' not found."}), 404
            else:
                 return jsonify({"testResults": []}), 200 # Session exists, no results

        return jsonify({"testResults": results}), 200

    except Exception as e:
        print(f"Error retrieving test results for session {sessionID}: {e}")
        return jsonify({"message": "An error occurred retrieving test results."}), 500


# === Send For Test ===

# 7.4.5.8 Send For Test: Test List
@app.route('/send_for_test/test_list/<string:sessionID>', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def set_patient_test_list(sessionID):
    """Sets the list of tests requested for the patient."""
    try:
        if sessionID not in mock_sessions:
            return jsonify({"message": f"Patient session '{sessionID}' not found."}), 404

        data = request.get_json()
        if not data or 'tests' not in data:
            return jsonify({"message": "Missing 'tests' field in request body."}), 400
        if not isinstance(data['tests'], list):
             return jsonify({"message": "'tests' field must be an array of strings."}), 400
        if not all(isinstance(test, str) for test in data['tests']):
             return jsonify({"message": "All items in 'tests' array must be strings."}), 400

        requested_tests = data['tests']

        # In real scenario: Save these requested tests to the database for this session/patient
        print(f"Doctor requested tests for session {sessionID}: {requested_tests}")

        return jsonify({"message": "Set tests successfully"}), 200

    except Exception as e:
        print(f"Error setting test list for session {sessionID}: {e}")
        return jsonify({"message": "An error occurred while setting the test list."}), 500

# === Finalize Diagnosis ===

# 7.4.5.9 Finalize Diagnosis: Set Final Diagnosis
@app.route('/finalize_diagnosis/set_final_diagnosis/<string:sessionID>', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def set_final_diagnosis(sessionID):
    """Sets the final diagnosis for the patient's session."""
    try:
        if sessionID not in mock_sessions:
            return jsonify({"message": f"Patient session '{sessionID}' not found."}), 404

        data = request.get_json()
        if not data or 'diagnosis' not in data:
            return jsonify({"message": "Missing 'diagnosis' field in request body."}), 400
        if not isinstance(data['diagnosis'], str) or not data['diagnosis'].strip():
             return jsonify({"message": "'diagnosis' field must be a non-empty string."}), 400

        final_diagnosis = data['diagnosis']

        # In real scenario: Save the final diagnosis to the database for this session
        print(f"Doctor set final diagnosis for session {sessionID}: {final_diagnosis}")

        return jsonify({"message": "Set final diagnosis successfully"}), 200

    except Exception as e:
        print(f"Error setting final diagnosis for session {sessionID}: {e}")
        return jsonify({"message": "An error occurred while setting the final diagnosis."}), 500

# === Prescription And Procedure ===

# 7.4.5.10 Prescription And Procedure: Set Patient Prescription
@app.route('/prescription_and_procedure/set_prescription/<string:sessionID>', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def set_patient_prescription(sessionID):
    """Sets the medication prescription for the patient."""
    try:
        if sessionID not in mock_sessions:
            return jsonify({"message": f"Patient session '{sessionID}' not found."}), 404

        data = request.get_json()
        if not data or 'prescription' not in data:
            return jsonify({"message": "Missing 'prescription' field in request body."}), 400
        if not isinstance(data['prescription'], list):
            return jsonify({"message": "'prescription' must be an array of prescription objects."}), 400

        prescriptions = data['prescription']
        # Add validation for each object in the prescription array if needed
        for item in prescriptions:
            if not all(k in item for k in ["medicine", "morning", "noon", "afternoon", "evening", "duration", "note"]):
                return jsonify({"message": "Each prescription object is missing required fields (medicine, morning, noon, afternoon, evening, duration, note)."}), 400

        # In real scenario: Save the prescription details to the database
        print(f"Doctor set prescription for session {sessionID}: {prescriptions}")

        return jsonify({"message": "Set patient prescription successfully"}), 200

    except Exception as e:
        print(f"Error setting prescription for session {sessionID}: {e}")
        return jsonify({"message": "An error occurred while setting the prescription."}), 500

# 7.4.5.11 Prescription And Procedure: Set Patient Procedure
@app.route('/prescription_and_procedure/set_procedure/<string:sessionID>', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def set_patient_procedure(sessionID):
    """Sets procedures scheduled for the patient."""
    try:
        if sessionID not in mock_sessions:
            return jsonify({"message": f"Patient session '{sessionID}' not found."}), 404

        data = request.get_json()
        if not data or 'procedure' not in data:
            return jsonify({"message": "Missing 'procedure' field in request body."}), 400
        if not isinstance(data['procedure'], list):
            return jsonify({"message": "'procedure' must be an array of procedure objects."}), 400

        procedures = data['procedure']
        # Add validation for each object in the procedure array if needed
        for item in procedures:
            if not all(k in item for k in ["procedureName", "dateTime", "note"]):
                return jsonify({"message": "Each procedure object is missing required fields (procedureName, dateTime, note)."}), 400

        # In real scenario: Save the procedure details to the database
        print(f"Doctor set procedures for session {sessionID}: {procedures}")

        return jsonify({"message": "Set patient procedure successfully"}), 200

    except Exception as e:
        print(f"Error setting procedures for session {sessionID}: {e}")
        return jsonify({"message": "An error occurred while setting procedures."}), 500

# 7.4.5.12 Prescription And Procedure: Set Follow Up Examination Date
@app.route('/prescription_and_procedure/set_follow_up/<string:sessionID>', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def set_follow_up_date(sessionID):
    """Sets the follow-up examination date for the patient."""
    try:
        if sessionID not in mock_sessions:
            return jsonify({"message": f"Patient session '{sessionID}' not found."}), 404

        data = request.get_json()
        if not data or 'date' not in data:
            return jsonify({"message": "Missing 'date' field in request body."}), 400
        if not isinstance(data['date'], str) or not data['date'].strip():
            # Add more specific date format validation here if needed (e.g., using datetime.strptime)
            return jsonify({"message": "'date' field must be a non-empty string (e.g., DD/MM/YYYY)."}), 400

        follow_up_date = data['date']

        # In real scenario: Save the follow-up date, potentially create appointment
        print(f"Doctor set follow-up date for session {sessionID}: {follow_up_date}")
        # Optionally update the mock patient details
        patientID = get_patient_id_from_session(sessionID)
        if patientID and patientID in mock_patient_details:
            mock_patient_details[patientID]['hasFollowUpAppointment'] = True
            print(f"Updated hasFollowUpAppointment for patient {patientID}")


        return jsonify({"message": "Set follow up date successfully"}), 200

    except Exception as e:
        print(f"Error setting follow-up date for session {sessionID}: {e}")
        return jsonify({"message": "An error occurred while setting the follow-up date."}), 500


# === Inpatient Monitoring ===
# Note: Doc title for 7.4.5.13 is Diagnosis, but path is inpatient_monitoring

# 7.4.5.13 Get Medical Device Measurements (Path uses sessionID as per doc)
@app.route('/inpatient_monitoring/medical_device_measurement/<string:inpatientID>', methods=['GET'])
@jwt_required()
@check_role(['doctor'])
def get_medical_device_measurements(inpatientID):
    """Retrieves measurements from medical devices for a specific session."""
    try:
        measurements = mock_medical_device_measurements.get(inpatientID)
        if measurements is None:
            # Check if session conceptually exists
            if inpatientID not in mock_sessions:
                return jsonify({"message": f"Session '{inpatientID}' not found."}), 404
            else:
                # Check if the session corresponds to an inpatient (optional, depends on requirements)
                # patientID = get_patient_id_from_session(inpatientID)
                # if not patientID or not patientID.startswith("patient_in_"):
                #     return jsonify({"message": f"Session '{inpatientID}' does not correspond to a known inpatient."}), 400 # Or 404
                return jsonify({"testResults": []}), 200 # Session exists, no measurements recorded for it

        # Doc specifies 'testResults' as the response field name
        return jsonify({"testResults": measurements}), 200

    except Exception as e:
        print(f"Error retrieving medical device measurements for session {inpatientID}: {e}")
        return jsonify({"message": "An error occurred retrieving medical device measurements."}), 500

# 7.4.5.14 Inpatient Monitoring: Get Event List (New Endpoint, uses inpatientID)
@app.route('/inpatient_monitoring/event_list/<string:inpatientID>', methods=['GET'])
@jwt_required()
@check_role(['doctor'])
def get_event_list(inpatientID):
    """Retrieves the list of clinical events for a specific inpatient."""
    try:
        # Check if inpatient exists in our mock event data
        events_dict = mock_inpatient_events.get(inpatientID)
        if events_dict is None:
             # Check if the inpatientID is known at all in the patient details
             if inpatientID not in mock_patient_details:
                 return jsonify({"error": f"Inpatient with ID '{inpatientID}' not found."}), 404 # Use 404 as per doc example
             else:
                 # Inpatient exists but has no recorded events
                 return jsonify({"vitalSigns": []}), 200 # Return empty list as per doc structure (using 'vitalSigns' field name)

        # Format the events into the desired list structure
        event_list = []
        for event_id, event_data in events_dict.items():
            # Convert timestamp to a readable format (e.g., ISO 8601)
            event_time_iso = datetime.datetime.fromtimestamp(event_data.get("time", time.time())).isoformat() + "Z"
            event_list.append({
                "eventID": event_id,
                "time": event_time_iso, # Use formatted timestamp
                "name": event_data.get("event"), # 'name' field in doc response corresponds to 'event' description
                "note": event_data.get("note")
            })

        # Sort by time, newest first (optional, but common)
        event_list.sort(key=lambda x: x["time"], reverse=True)

        # Doc specifies 'vitalSigns' as the response field name, which is confusing but followed here.
        return jsonify({"vitalSigns": event_list}), 200

    except Exception as e:
        print(f"Error retrieving event list for inpatient {inpatientID}: {e}")
        # Doc specifies 400 for errors like invalid ID, using 500 for general server error
        return jsonify({"error": "An error occurred while retrieving the event list."}), 500


# 7.4.5.15 Inpatient Monitoring: Add Event Note (Path uses inpatientID)
@app.route('/inpatient_monitoring/add_event_note/<string:inpatientID>', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def add_inpatient_event_note(inpatientID):
    """Adds or updates a note for a specific clinical event for an inpatient."""
    try:
        # Check if inpatient exists in event data
        if inpatientID not in mock_inpatient_events:
             # Check if the inpatientID is known at all
             if inpatientID not in mock_patient_details:
                 return jsonify({"message": f"Patient with ID '{inpatientID}' not found."}), 404 # Use 404 as per doc
             else:
                  # Inpatient exists but has no events yet to add a note to
                  return jsonify({"message": f"No events found for patient '{inpatientID}' to add a note."}), 400 # Or 404

        data = request.get_json()
        if not data:
            return jsonify({"message": "Missing JSON payload."}), 400

        event_id = data.get('eventID')
        note_text = data.get('note') # Note text can be empty string to clear a note

        if not event_id or not isinstance(event_id, str):
            return jsonify({"message": "Invalid or missing 'eventID' field in request body."}), 400
        if note_text is None or not isinstance(note_text, str): # Allow empty string "" but not null
            return jsonify({"message": "Invalid or missing 'note' field in request body. Must be a string."}), 400

        # Check if the specific event exists for this inpatient
        if event_id not in mock_inpatient_events[inpatientID]:
             return jsonify({"message": f"Event ID '{event_id}' not found for patient '{inpatientID}'."}), 404 # Event not found for this patient

        # Store note in mock data - Replace the existing note string
        mock_inpatient_events[inpatientID][event_id]['note'] = note_text

        print(f"Doctor added/updated note for event {event_id} in inpatient {inpatientID}: {note_text}")

        return jsonify({"message": "Event note added successfully"}), 200

    except Exception as e:
        # Need to define event_id before the exception block if it's used in the error message
        event_id_for_error = data.get('eventID', 'unknown') if 'data' in locals() else 'unknown'
        print(f"Error adding inpatient event note for inpatient {inpatientID}, event {event_id_for_error}: {e}")
        return jsonify({"message": "An error occurred while adding the event note."}), 500