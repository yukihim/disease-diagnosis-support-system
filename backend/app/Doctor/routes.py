# For simplicity, assuming direct use of 'app' like the receptionist example
from . import app # Adjust this import based on your project structure
from flask import request, jsonify
from ..authentication import check_role # Assuming check_role decorator exists
from flask_jwt_extended import jwt_required, get_jwt_identity
import datetime
import random
import uuid # For generating unique IDs if needed
import time # For mock timestamps

# --- Mock Data ---

# --- START: Data copied/adapted from Receptionist/routes.py for consistency ---
# Mock patient database, date format mm-dd-yyyy
# This DB uses patientID as the key
mock_patients_db = {
    "patient_001": {
        "patientID": "patient_001", # Using userID as patientID for simplicity here
        "patientName": "Nguyen Van A",
        "ssn": "079200001111",
        "hic": "HIC-A",
        "dob": "05-10-1985",
        "gender": "Male",
        "phone": "0912345678",
        "height": "175",
        "weight": "70",
        "job": "Engineer",
        "address": "123 Main St, Hanoi",
        "followUpDate": "04-30-2025",
        "type": "Outpatient"
    },
    "patient_002": {
        "patientID": "patient_002",
        "patientName": "Tran Thi B",
        "ssn": "079200002222",
        "hic": "HIC-B",
        "dob": "11-25-1992",
        "gender": "Female",
        "phone": "0987654321",
        "height": "160",
        "weight": "55",
        "job": "Teacher",
        "address": "456 Oak Ave, HCMC",
        "followUpDate": "",
        "type": "Inpatient"
    },
    "abc-xyz-123": { # Matching test value
        "patientID": "abc-xyz-123",
        "patientName": "Le Van C (Test)",
        "ssn": "079283868386", # Matching test value
        "hic": "HIC-C",
        "dob": "01-15-1978",
        "gender": "Male",
        "phone": "0909913313",
        "height": "180",
        "weight": "85",
        "job": "Manager",
        "address": "789 Pine Ln, Danang",
        "followUpDate": "04-29-2025",
        "type": "Outpatient"
    },
    "patient_jd": {
        "patientID": "patient_jd", "patientName": "John Doe", "ssn": "111223333", "hic": "HIC-JD", "dob": "01-15-1979", "gender": "Male", "phone": "0912345010", "height": "180", "weight": "80", "job": "Unknown", "address": "10 Unknown St", "followUpDate": "", "type": "Outpatient"
    },
    "patient_js": {
        "patientID": "patient_js", "patientName": "Jane Smith", "ssn": "444556666", "hic": "HIC-JS", "dob": "03-20-1992", "gender": "Female", "phone": "0912345011", "height": "165", "weight": "60", "job": "Unknown", "address": "11 Unknown St", "followUpDate": "", "type": "Outpatient"
    },
    "patient_mj": {
        "patientID": "patient_mj", "patientName": "Mike Johnson", "ssn": "777889999", "hic": "HIC-MJ", "dob": "06-10-1996", "gender": "Male", "phone": "0912345012", "height": "170", "weight": "72", "job": "Unknown", "address": "12 Unknown St", "followUpDate": "", "type": "Outpatient"
    },
    "patient_sw": {
        "patientID": "patient_sw", "patientName": "Sarah Williams", "ssn": "121314151", "hic": "HIC-SW", "dob": "09-05-1970", "gender": "Female", "phone": "0912345013", "height": "162", "weight": "65", "job": "Unknown", "address": "13 Unknown St", "followUpDate": "", "type": "Outpatient"
    },
    "patient_rb": {
        "patientID": "patient_rb", "patientName": "Robert Brown", "ssn": "161718191", "hic": "HIC-RB", "dob": "11-25-1957", "gender": "Male", "phone": "0912345014", "height": "173", "weight": "82", "job": "Retired", "address": "14 Unknown St", "followUpDate": "", "type": "Outpatient"
    },
    "patient_ed": {
        "patientID": "patient_ed", "patientName": "Emily Davis", "ssn": "202122232", "hic": "HIC-ED", "dob": "04-15-2005", "gender": "Female", "phone": "0912345015", "height": "168", "weight": "58", "job": "Student", "address": "15 Unknown St", "followUpDate": "", "type": "Outpatient"
    },
    "patient_dw": {
        "patientID": "patient_dw", "patientName": "David Wilson", "ssn": "242526272", "hic": "HIC-DW", "dob": "07-30-1983", "gender": "Male", "phone": "0912345016", "height": "182", "weight": "88", "job": "Unknown", "address": "16 Unknown St", "followUpDate": "", "type": "Outpatient"
    },
    # Add inpatient details here as well if they are distinct patients
    "patient_in_001": {"patientID": "patient_in_001", "patientName": "Diana Prince", "dob": "1989-06-01", "gender": "Female", "phone": "0912121212", "job": "Curator", "ssn": "079600006666", "hic": "HIC-G", "height": "175", "weight": "65", "address": "Themyscira", "followUpDate": "", "type": "Inpatient"},
    "patient_in_002": {"patientID": "patient_in_002", "patientName": "Clark Kent", "dob": "1984-02-29", "gender": "Male", "phone": "0934343434", "job": "Reporter", "ssn": "079700007777", "hic": "HIC-H", "height": "190", "weight": "95", "address": "Metropolis", "followUpDate": "", "type": "Inpatient"},
}

# Mock mapping from a current sessionID to its associated patientID
# Consistent with Paraclinical and Pass_Session modules
session_to_patient_map = {
    "sess_pxt_001": "patient_001",
    "sess_px1_002": "patient_001",
    "sess_px2_003": "patient_001",
    "sess_px3_004": "patient_002",
    "sess_px4_005": "patient_002",
    "sess_pxb_006": "patient_002",
    "sess_pxc_007": "abc-xyz-123",
    "sess_pxb_008": "abc-xyz-123",
    "sess_pxt_009": "patient_001",
    "sess_jd_010": "patient_jd",
    "sess_js_011": "patient_js",
    "sess_mj_012": "patient_mj",
    "sess_sw_013": "patient_sw",
    "sess_rb_014": "patient_rb",
    "sess_ed_015": "patient_ed",
    "sess_dw_016": "patient_dw",
    # Add mappings for the original patient_001, patient_002, abc-xyz-123 if they can also be session IDs
    "patient_001": "patient_001",
    "patient_002": "patient_002",
    "abc-xyz-123": "abc-xyz-123",
    # Add mappings for inpatient sessions if needed
    "inpatient_session_1": "patient_in_001",
    "inpatient_session_2": "patient_in_002",
    # Add mappings for doctor-specific sessions if they differ
    "session_1": "patient_jd", # Example: Doctor's session_1 maps to John Doe
    "session_2": "patient_js", # Example: Doctor's session_2 maps to Jane Smith
}
# --- END: Data copied/adapted from Receptionist/routes.py ---


# --- Helper function to calculate age ---
def calculate_age(dob_str):
    """Calculates age from a MM-DD-YYYY date string."""
    if not dob_str:
        return None
    try:
        # Try parsing MM-DD-YYYY first
        birth_date = datetime.datetime.strptime(dob_str, '%m-%d-%Y').date()
    except ValueError:
        try:
            # Fallback to YYYY-MM-DD if the first format fails
            birth_date = datetime.datetime.strptime(dob_str, '%Y-%m-%d').date()
        except ValueError:
            print(f"Warning: Could not parse DOB string with known formats: {dob_str}")
            return None

    today = datetime.date.today()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    return age

# --- Helper function to create incoming patient entry ---
def create_doctor_incoming_patient_entry(session_id, from_location, state, note, patient_db, session_map):
    """Creates a structured dictionary for the doctor's incoming patient list."""
    patient_id = session_map.get(session_id)
    if not patient_id:
        print(f"Warning: Session ID '{session_id}' not found in session_map for Doctor incoming list.")
        return None # Skip this session if no patient mapping

    patient_details = patient_db.get(patient_id)
    if not patient_details:
        print(f"Warning: Patient ID '{patient_id}' (from session '{session_id}') not found in patient_db for Doctor incoming list.")
        return None # Skip this session if patient details are missing

    age = calculate_age(patient_details.get("dob"))
    sex = patient_details.get("gender") # Use 'gender' directly or map if needed

    return {
        "sessionID": session_id,
        "name": patient_details.get("patientName"),
        "sex": sex,
        "age": age if age is not None else "N/A",
        "from": from_location, # Session specific
        "state": state,         # Session specific
        "note": note            # Session specific
        # Add other fields from patient_db if needed by Doctor's incoming list view
        # e.g., "ssn": patient_details.get("ssn"), "hic": patient_details.get("hic")
    }

# --- Define the incoming sessions relevant to the Doctor ---
# These define which sessions appear in the doctor's list and their current state/origin.
# Use session IDs that exist in the session_to_patient_map
doctor_incoming_sessions_info = [
    {"sessionID": "sess_jd_010", "from": "Reception", "state": "Waiting", "note": "Fever and cough"},
    {"sessionID": "sess_js_011", "from": "Emergency", "state": "Waiting", "note": "Minor injury"},
    {"sessionID": "sess_mj_012", "from": "Paraclinic", "state": "Back from test", "note": "Blood test completed"},
    {"sessionID": "sess_sw_013", "from": "Reception", "state": "Nurse measured", "note": "High blood pressure"},
    {"sessionID": "sess_rb_014", "from": "Reception", "state": "Waiting", "note": "Chronic condition check"},
    {"sessionID": "sess_ed_015", "from": "Paraclinic", "state": "Sending for test", "note": "X-ray needed"},
    {"sessionID": "sess_dw_016", "from": "Reception", "state": "Waiting", "note": "Follow-up visit"},
    # Add session_1, session_2 if they are also meant to be incoming for the doctor
    {"sessionID": "session_1", "from": "Reception", "state": "Waiting", "note": "Fever and cough"}, # Re-added based on original mock
    {"sessionID": "session_2", "from": "Emergency", "state": "Waiting", "note": "Minor injury"}, # Re-added based on original mock
]

# --- Generate the mock_incoming_patients list using the helper ---
mock_incoming_patients = [
    entry for session_info in doctor_incoming_sessions_info
    if (entry := create_doctor_incoming_patient_entry(
            session_info["sessionID"],
            session_info["from"],
            session_info["state"],
            session_info["note"],
            mock_patients_db,
            session_to_patient_map
        )) is not None
]


# --- Other Mock Data (Using consolidated patient/session data) ---

mock_sessions = {
    # Generate mock sessions based on the consolidated map and patient DB
    **{sid: {"patientName": mock_patients_db[pid].get("patientName"), "patientID": pid}
       for sid, pid in session_to_patient_map.items() if pid in mock_patients_db}
}


mock_todays_appointments = [
    # These are independent for now, but could be linked to patient IDs if needed
    {"name": "Eve Harrington", "time": "14:30", "condition": "Follow-up Check"},
    {"name": "Frank Sinatra", "time": "15:00", "condition": "Consultation"},
    {"name": "Grace Kelly", "time": "15:30", "condition": "Annual Physical"},
]

mock_patients_sent_for_test = [
    # Use patient IDs from the consolidated DB
    {"name": mock_patients_db.get("patient_jd", {}).get("patientName", "John Doe"), "test": "Blood Test", "state": "Completed"},
    {"name": mock_patients_db.get("patient_js", {}).get("patientName", "Jane Smith"), "test": "X-Ray", "state": "Completed"},
    {"name": mock_patients_db.get("patient_mj", {}).get("patientName", "Mike Johnson"), "test": "Urinalysis", "state": "Pending Results"},
]

mock_inpatient_monitoring = [
    # Use patientIDs defined in the consolidated mock_patients_db
    {
        "patientID": "patient_in_001",
        "name": mock_patients_db.get("patient_in_001", {}).get("patientName", "Diana Prince"),
        "sex": "Female",
        "age": calculate_age(mock_patients_db.get("patient_in_001", {}).get("dob")),
        "room": "301A",
        "admissionDate": "2024-07-20",
        "condition": "Post-surgery recovery",
        "status": "Stable",
    },
    {
        "patientID": "patient_in_002",
        "name": mock_patients_db.get("patient_in_002", {}).get("patientName", "Clark Kent"),
        "sex": "Male", "age": calculate_age(mock_patients_db.get("patient_in_002", {}).get("dob")),
        "room": "302B", "admissionDate": "2024-07-21",
        "condition": "Observation",
        "status": "Improving"
    },
]

# Use the unified patient DB for details view
mock_doctor_patient_details_view = mock_patients_db

mock_vital_signs = {
    # Use session IDs from the consolidated session_to_patient_map
    "sess_jd_010": [
        {
            "timeMeasured": "2024-07-22 09:00:00",
            "bloodPressure": "120/80",
            "pulse": 75,
            "breathingRate": 16,
            "temperature": 38.5,
            "bmi": 22.0,
            "oxygenSaturation": 98},
        {
            "timeMeasured": "2024-07-22 13:00:00",
            "bloodPressure": "118/78",
            "pulse": 72,
            "breathingRate": 15,
            "temperature": 37.8,
            "bmi": 22.0,
            "oxygenSaturation": 99
        },
    ],
    "abc-xyz-123": [ # Test session ID
        {"timeMeasured": "2024-07-22 10:30:00", "bloodPressure": "130/85", "pulse": 80, "breathingRate": 18, "temperature": 37.0, "bmi": 23.5, "oxygenSaturation": 97},
    ],
    "session_1": [ # Example using doctor's specific session ID
         {"timeMeasured": "2024-07-23 09:00:00", "bloodPressure": "125/82", "pulse": 70, "breathingRate": 17, "temperature": 37.1, "bmi": 21.0, "oxygenSaturation": 99},
    ]
}

mock_test_results = {
    # Use session IDs from the consolidated session_to_patient_map
    "sess_jd_010": [
        {
            "timeMeasured": "2024-07-21 11:00:00",
            "testType": "Complete Blood Count", # Matches label in frontend
            "parameters": [
                # Names MUST match frontend grouped_test_options['Blood Tests'][0].parameters[...].name
                {"name": "Hemoglobin (Hgb)", "value": "14.5"},
                {"name": "Hematocrit (Hct)", "value": "42"},
                {"name": "White Blood Cell Count (WBC)", "value": "7500"}, # Value without unit
                {"name": "Platelet Count", "value": "250000"} # Value without unit
            ]
        }
    ],
    "abc-xyz-123": [ # Test session ID
        {
            "timeMeasured": "2024-07-22 08:00:00",
            "testType": "Urinalysis (UA)", # Matches label in frontend
            "parameters": [
                # Names MUST match frontend grouped_test_options['Urine & Stool Tests'][0].parameters[...].name
                {"name": "Protein", "value": "10"}, # Value without unit
                {"name": "Glucose", "value": "0"}, # Value without unit
                {"name": "Ketones", "value": "0"}, # Value without unit
                {"name": "Blood", "value": "Negative"} # String value, matches unit: 'presence'
            ]
        },
        {
            "timeMeasured": "2024-07-22 14:00:00",
            "testType": "Lipid Panel", # Matches label in frontend
            "parameters": [
                 # Names MUST match frontend grouped_test_options['Blood Tests'][2].parameters[...].name
                {"name": "Total Cholesterol", "value": "190"},
                {"name": "LDL Cholesterol", "value": "120"}, # Name matches frontend
                {"name": "HDL Cholesterol", "value": "50"},  # Name matches frontend
                {"name": "Triglycerides", "value": "140"}
            ]
        }
    ],
    # Add more sessions and tests as needed, ensuring 'name' matches frontend
    "sess_js_011": [
        {
            "timeMeasured": "2024-07-23 10:00:00",
            "testType": "Basic Metabolic Panel (BMP)", # Matches label in frontend
            "parameters": [
                # Names MUST match frontend grouped_test_options['Blood Tests'][1].parameters[...].name
                {"name": "Blood Urea Nitrogen (BUN)", "value": "20"},
                {"name": "Serum Creatinine", "value": "1.0"},
                {"name": "Glucose", "value": "95"},
                {"name": "Calcium", "value": "9.5"},
                {"name": "Sodium", "value": "140"},
                {"name": "Potassium", "value": "4.1"},
                {"name": "Chloride", "value": "102"},
                {"name": "Bicarbonate (CO2)", "value": "25"}
            ]
        }
    ],
     "sess_mj_012": [ # Example for LFTs
        {
            "timeMeasured": "2024-07-24 09:00:00",
            "testType": "Liver Function Tests (LFTs)", # Matches label in frontend
            "parameters": [
                # Names MUST match frontend grouped_test_options['Blood Tests'][5].parameters[...].name
                {"name": "Alanine Aminotransferase (ALT)", "value": "45"}, # Example: Slightly high
                {"name": "Aspartate Aminotransferase (AST)", "value": "32"}, # Example: Slightly high
                {"name": "Alkaline Phosphatase (ALP)", "value": "110"},
                {"name": "Total Bilirubin", "value": "1.0"},
                {"name": "Direct Bilirubin", "value": "0.2"},
                {"name": "Albumin", "value": "3.8"}
            ]
        }
    ]
}

mock_medical_device_measurements = {
    # Use inpatient session IDs (which map to patient_in_XXX IDs via consolidated map)
    "inpatient_session_1": [
        {"timeMeasured": "2024-07-22 10:00:00", "name": "ECG - Heart Rate", "value": "72 bpm"},
        {"timeMeasured": "2024-07-22 10:00:00", "name": "Blood Oxygen", "value": "99%"},
        {"timeMeasured": "2024-07-22 11:00:00", "name": "Blood Pressure (Monitor)", "value": "115/75 mmHg"},
    ],
    "abc-xyz-123": [ # Test session ID (present in consolidated map)
        {"timeMeasured": "2024-07-23 08:00:00", "name": "Continuous Glucose Monitor", "value": "110 mg/dL"},
        {"timeMeasured": "2024-07-23 08:05:00", "name": "ECG - Heart Rate", "value": "78 bpm"},
    ]
}

# Store added events and notes temporarily for mock purposes
# Keyed by patientID (present in consolidated DB), added mock timestamp
mock_inpatient_events = {
    # Use patientIDs defined in consolidated mock_patients_db
    "patient_in_001": {
        "event_1": { "event": "Routine Check", "note": "Vitals stable.", "time": time.time() - 3600 },
        "event_2": { "event": "Medication Administered", "note": "", "time": time.time() - 1800 }
    },
    "patient_in_002": {
        "event_3": { "event": "Initial Assessment", "note": "Patient resting comfortably.", "time": time.time() - 7200 }
    },
    "abc-xyz-123": { # Test patient ID (present in consolidated DB)
        "event_test_1": { "event": "Test Event", "note": "Test note.", "time": time.time() - 60}
    }
}

# --- Helper Function (get_patient_id_from_session) ---
# Uses the consolidated session_to_patient_map now
def get_patient_id_from_session(sessionID):
    """Helper function to retrieve patientID from mock session data."""
    return session_to_patient_map.get(sessionID) # Return patientID or None

# --- API Endpoints ---

# === Landing Page ===

# 7.4.5.1 Landing Page: Get Incoming Patient List
@app.route('/landing_page/incoming_patient', methods=['GET'])
@jwt_required()
@check_role(['doctor', 'nurse'])
def get_incoming_patient_list():
    """Retrieves the list of patients waiting for the doctor."""
    try:
        # Now uses the dynamically generated mock_incoming_patients list based on consolidated data
        return jsonify({"incomingPatient": mock_incoming_patients}), 200
    except Exception as e:
        print(f"Error in get_incoming_patient_list: {e}")
        return jsonify({"message": "An error occurred retrieving incoming patient list."}), 500

# 7.4.5.2 Landing Page: Get Today’s Appointment List
@app.route('/landing_page/todays_appointment', methods=['GET'])
@jwt_required()
@check_role(['doctor', 'nurse'])
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
@check_role(['doctor', 'nurse'])
def get_patient_sent_for_test_list():
    """Retrieves the list of patients sent for tests by this doctor."""
    try:
        # Uses mock_patients_sent_for_test which references the consolidated mock_patients_db
        return jsonify({"patientSentForTest": mock_patients_sent_for_test}), 200 # Changed key to match frontend expectation
    except Exception as e:
        print(f"Error in get_patient_sent_for_test_list: {e}")
        return jsonify({"message": "An error occurred retrieving patient test list."}), 500

# 7.4.5.4 Landing Page: Get Inpatient Monitoring List
@app.route('/landing_page/inpatient_monitoring', methods=['GET'])
@jwt_required()
@check_role(['doctor', 'nurse'])
def get_inpatient_monitoring_list():
    """Retrieves the list of inpatients assigned to this doctor, including sessionID."""
    try:
        # Create a reverse map for easier lookup (patientID -> sessionID)
        # Note: This assumes one primary session per inpatient for this list.
        # If multiple sessions map to the same patient, this picks one arbitrarily (last one in iteration).
        # A more robust solution might involve defining a specific 'current inpatient session' map.
        patient_to_session_map = {pid: sid for sid, pid in session_to_patient_map.items()}

        # Enhance the mock data with sessionID
        enhanced_inpatient_list = []
        for inpatient in mock_inpatient_monitoring:
            patient_id = inpatient.get("patientID")
            # Find the corresponding sessionID from the reversed map
            session_id = patient_to_session_map.get(patient_id) # Get sessionID using patientID

            # Create a new dictionary including the sessionID
            enhanced_inpatient = inpatient.copy() # Avoid modifying the original mock data
            enhanced_inpatient["sessionID"] = session_id # Add sessionID (will be None if not found)
            enhanced_inpatient_list.append(enhanced_inpatient)

        return jsonify({"inpatientMonitoring": enhanced_inpatient_list}), 200
    except Exception as e:
        print(f"Error in get_inpatient_monitoring_list: {e}")
        return jsonify({"message": "An error occurred retrieving inpatient monitoring list."}), 500

# Example modification for get_diagnosis_patient_information:
# 7.4.5.5 Diagnosis: Patient Information
# @app.route('/diagnosis/patient_information/<string:sessionID>', methods=['GET'])
# @jwt_required()
# @check_role(['doctor'])
# def get_diagnosis_patient_information(sessionID):
#     """Retrieves detailed information for a patient based on sessionID."""
#     try:
#         patientID = get_patient_id_from_session(sessionID) # Use helper with consolidated map
#         if not patientID or patientID not in mock_patients_db: # Check consolidated DB
#             return jsonify({"error": f"Patient information not found for session '{sessionID}'."}), 404

#         patient_info = mock_patients_db[patientID] # Get from consolidated DB

#         # Format response according to documentation
#         response_data = {
#             "name": patient_info.get("patientName"),
#             "dob": patient_info.get("dob"),
#             "gender": patient_info.get("gender"),
#             "type": patient_info.get("type", "Unknown"), # Include type from consolidated DB
#             "phone": patient_info.get("phone"),
#             "job": patient_info.get("job"),
#             "ssn": patient_info.get("ssn"),
#             "hic": patient_info.get("hic"),
#             "height": patient_info.get("height"),
#             "weight": patient_info.get("weight"),
#             "address": patient_info.get("address"),
#             "followUpDate": patient_info.get("followUpDate") # Get followUpDate from patient record
#             # "hasFollowUpAppointment": bool(patient_info.get("followUpDate")) # Or derive from followUpDate
#         }
#         return jsonify(response_data), 200

#     except Exception as e:
#         print(f"Error retrieving patient info for session {sessionID}: {e}")
#         return jsonify({"error": "Error while retrieving patient information."}), 400 # Doc says 400 for errors


# ... (Rest of the routes remain largely the same, as they already use helper functions
#      or reference mock data structures that now point to the consolidated data) ...


# 7.4.5.6 Diagnosis: Patient Vital Signs
@app.route('/diagnosis/vital_signs/<string:sessionID>', methods=['GET'])
@jwt_required()
@check_role(['doctor', 'nurse'])
def get_patient_vital_signs(sessionID):
    """Retrieves vital signs recorded during the patient's session."""
    try:
        vitals = mock_vital_signs.get(sessionID)
        if vitals is None: # Check if key exists, even if value is empty list
            # Decide if session not found is 404 or 200 with empty list
            # Let's return 200 with empty list if session is conceptually valid but has no vitals
            if sessionID not in session_to_patient_map: # Check consolidated map
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
            if sessionID not in session_to_patient_map: # Check consolidated map
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
        if sessionID not in session_to_patient_map: # Check consolidated map
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
        if sessionID not in session_to_patient_map: # Check consolidated map
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
        if sessionID not in session_to_patient_map: # Check consolidated map
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
        if sessionID not in session_to_patient_map: # Check consolidated map
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
        patientID = get_patient_id_from_session(sessionID) # Use helper with consolidated map
        if not patientID or patientID not in mock_patients_db: # Check consolidated DB
             return jsonify({"message": f"Patient session '{sessionID}' not found or patient details missing."}), 404

        data = request.get_json()
        if not data or 'date' not in data:
            return jsonify({"message": "Missing 'date' field in request body."}), 400
        if not isinstance(data['date'], str) or not data['date'].strip():
            # Add more specific date format validation here if needed (e.g., using datetime.strptime)
            return jsonify({"message": "'date' field must be a non-empty string (e.g., DD/MM/YYYY)."}), 400

        follow_up_date = data['date']

        # In real scenario: Save the follow-up date, potentially create appointment
        print(f"Doctor set follow-up date for session {sessionID} (Patient {patientID}): {follow_up_date}")
        # Update the mock patient details in the consolidated DB
        mock_patients_db[patientID]['followUpDate'] = follow_up_date
        print(f"Updated followUpDate for patient {patientID}")


        return jsonify({"message": "Set follow up date successfully"}), 200

    except Exception as e:
        print(f"Error setting follow-up date for session {sessionID}: {e}")
        return jsonify({"message": "An error occurred while setting the follow-up date."}), 500


# === Inpatient Monitoring ===
# Note: Doc title for 7.4.5.13 is Diagnosis, but path is inpatient_monitoring


# --- MODIFICATION: Adjust mock_medical_device_measurements keys ---
# Ensure all patients have all 5 measurement types
mock_medical_device_measurements_by_patientID = {
    "patient_in_001": [
        {"timeMeasured": "2024-07-22 10:00:00", "name": "ECG - Heart Rate", "value": "72 bpm"},
        # {"timeMeasured": "2024-07-22 10:00:00", "name": "Blood Oxygen", "value": "99%"}, # Removed as it's not one of the 5 core types for display
        {"timeMeasured": "2024-07-22 11:00:00", "name": "Blood Pressure", "value": "115/75 mmHg"},
        {"timeMeasured": "2024-07-22 11:00:00", "name": "Body Temperature", "value": "36.8 °C"},
        {"timeMeasured": "2024-07-22 11:00:00", "name": "Respiratory Rate", "value": "16 rpm"},
        {"timeMeasured": "2024-07-22 10:00:00", "name": "Blood Sugar", "value": "112 mg/dL"},
    ],
    "patient_in_002": [
        {"timeMeasured": "2024-07-23 09:00:00", "name": "Blood Sugar", "value": "105 mg/dL"},
        {"timeMeasured": "2024-07-23 09:00:00", "name": "ECG - Heart Rate", "value": "68 bpm"},
        {"timeMeasured": "2024-07-23 09:00:00", "name": "Blood Pressure", "value": "122/78 mmHg"},
        {"timeMeasured": "2024-07-23 09:00:00", "name": "Body Temperature", "value": "37.1 °C"},
        {"timeMeasured": "2024-07-23 09:00:00", "name": "Respiratory Rate", "value": "14 rpm"},
    ],
     "abc-xyz-123": [ # This patient was missing several types
        {"timeMeasured": "2024-07-23 08:00:00", "name": "Blood Sugar", "value": "110 mg/dL"},
        {"timeMeasured": "2024-07-23 08:05:00", "name": "ECG - Heart Rate", "value": "78 bpm"},
        # *** ADDED Missing Measurements for abc-xyz-123 ***
        {"timeMeasured": "2024-07-23 08:00:00", "name": "Blood Pressure", "value": "120/80 mmHg"},
        {"timeMeasured": "2024-07-23 08:00:00", "name": "Body Temperature", "value": "37.0 °C"},
        {"timeMeasured": "2024-07-23 08:00:00", "name": "Respiratory Rate", "value": "15 rpm"},
    ]
    # Add other patients here, ensuring all 5 types are present
}
# --- END MODIFICATION ---

import traceback
# --- Helper Function to generate dynamic measurement values ---
def generate_dynamic_measurement(base_measurement):
    """Generates a new measurement with current time and slightly randomized value."""
    new_measurement = base_measurement.copy()
    name = base_measurement.get("name", "").lower()
    value_str_orig = base_measurement.get("value", "")

    print(f"--- Processing measurement: Name='{name}', Original Value='{value_str_orig}' ---")

    # *** Ensure consistent timestamp format (MM-DD-YYYY HH:MM:SS) ***
    new_measurement["timeMeasured"] = datetime.datetime.now().strftime("%m-%d-%Y %H:%M:%S")
    value_str = value_str_orig.strip()

    try:
        if "heart rate" in name and "bpm" in value_str:
            print(f"Attempting to parse as Heart Rate...")
            try:
                base_val = int(value_str.replace("bpm", "").strip())
                new_val = base_val + random.randint(-2, 2)
                new_measurement["value"] = f"{new_val} bpm"
                print(f"-> Parsed Heart Rate: {new_measurement['value']}")
            except ValueError as e:
                print(f"ValueError parsing heart rate '{value_str_orig}': {e}")
                new_measurement["value"] = value_str_orig
        elif ("glucose" in name or "blood sugar" in name) and "mg/dL" in value_str:
            print(f"Attempting to parse as Blood Sugar/Glucose...")
            try:
                base_val = float(value_str.replace("mg/dL", "").strip())
                new_val = base_val + random.uniform(-5.0, 5.0)
                new_measurement["value"] = f"{new_val:.1f} mg/dL"
                print(f"-> Parsed Blood Sugar/Glucose: {new_measurement['value']}")
            except ValueError as e:
                print(f"ValueError parsing blood sugar/glucose '{value_str_orig}': {e}")
                new_measurement["value"] = value_str_orig
        elif "blood pressure" in name and "mmHg" in value_str:
            print(f"Attempting to parse as Blood Pressure...")
            try:
                parts = value_str.replace("mmHg", "").strip().split('/')
                if len(parts) == 2:
                    base_sys = int(parts[0].strip())
                    base_dia = int(parts[1].strip())
                    new_sys = base_sys + random.randint(-4, 4)
                    new_dia = base_dia + random.randint(-3, 3)
                    new_measurement["value"] = f"{new_sys}/{new_dia} mmHg"
                    print(f"-> Parsed Blood Pressure: {new_measurement['value']}")
                else:
                     print(f"FormatError parsing blood pressure '{value_str_orig}': Unexpected parts")
                     new_measurement["value"] = value_str_orig
            except ValueError as e:
                print(f"ValueError parsing blood pressure '{value_str_orig}': {e}")
                new_measurement["value"] = value_str_orig
        elif "temperature" in name and "°C" in value_str:
             print(f"Attempting to parse as Temperature...")
             try:
                 base_val = float(value_str.replace("°C", "").strip())
                 new_val = base_val + random.uniform(-0.2, 0.2)
                 new_measurement["value"] = f"{new_val:.1f} °C"
                 print(f"-> Parsed Temperature: {new_measurement['value']}")
             except ValueError as e:
                 print(f"ValueError parsing temperature '{value_str_orig}': {e}")
                 new_measurement["value"] = value_str_orig
        elif "respiratory rate" in name and "rpm" in value_str:
             print(f"Attempting to parse as Respiratory Rate...")
             try:
                 base_val = int(value_str.replace("rpm", "").strip())
                 new_val = base_val + random.randint(-1, 1)
                 new_measurement["value"] = f"{max(10, new_val)} rpm"
                 print(f"-> Parsed Respiratory Rate: {new_measurement['value']}")
             except ValueError as e:
                 print(f"ValueError parsing respiratory rate '{value_str_orig}': {e}")
                 new_measurement["value"] = value_str_orig
        # Removed Oxygen parsing as it's not one of the 5 core types displayed
        # elif "oxygen" in name and "%" in value_str: ...
        else:
            # Log if a measurement type doesn't match expected parsing
            print(f"-> No specific parsing logic for measurement: '{name}'. Keeping original value.")
            pass
    except Exception as e:
        print(f"!!! Unexpected error processing measurement '{name}' with value '{value_str_orig}': {e}")
        traceback.print_exc()
        new_measurement["value"] = value_str_orig

    print(f"--- Finished processing measurement: Name='{name}', New Value='{new_measurement.get('value')}' ---")
    return new_measurement
# --- END Helper Function ---


# 7.4.5.13 Get Medical Device Measurements (Path uses inpatientID, which should map to a patient_in_XXX ID)
@app.route('/inpatient_monitoring/medical_device_measurement/<string:inpatientID>', methods=['GET'])
@jwt_required()
@check_role(['doctor', 'nurse'])
def get_medical_device_measurements(inpatientID):
    """
    Retrieves measurements from medical devices for a specific inpatient.
    MODIFIED: Returns dynamically generated data based on mock structure.
    """
    try:
        # Get the base mock measurements for this patient
        base_measurements = mock_medical_device_measurements_by_patientID.get(inpatientID)

        if base_measurements is None:
            if inpatientID not in mock_patients_db:
                return jsonify({"message": f"Inpatient '{inpatientID}' not found."}), 404
            else:
                return jsonify({"testResults": []}), 200

        # --- Generate dynamic data ---
        # Use a list comprehension, errors inside generate_dynamic_measurement are handled
        dynamic_measurements = [generate_dynamic_measurement(m) for m in base_measurements]
        # --- End dynamic data generation ---

        return jsonify({"testResults": dynamic_measurements}), 200

    except Exception as e:
        # This outer catch is now less likely to be hit by parsing errors,
        # but catches other potential issues (e.g., issues before the loop).
        print(f"Error retrieving/generating medical device measurements for inpatient {inpatientID}: {e}")
        traceback.print_exc() # Print full traceback for debugging
        return jsonify({"message": "An error occurred retrieving medical device measurements."}), 500

# 7.4.5.14 Inpatient Monitoring: Get Event List (Uses inpatientID)
@app.route('/inpatient_monitoring/event_list/<string:inpatientID>', methods=['GET'])
@jwt_required()
@check_role(['doctor', 'nurse'])
def get_event_list(inpatientID):
    """Retrieves the list of clinical events for a specific inpatient."""
    try:
        # Check if inpatient exists in our mock event data (keyed by patientID)
        events_dict = mock_inpatient_events.get(inpatientID)
        if events_dict is None:
            # Check if the inpatientID is known at all in the patient details
            if inpatientID not in mock_patients_db: # Check consolidated DB
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
@check_role(['doctor', 'nurse'])
def add_inpatient_event_note(inpatientID):
    """Adds or updates a note for a specific clinical event for an inpatient."""
    try:
        # Check if inpatient exists in event data (keyed by patientID)
        if inpatientID not in mock_inpatient_events:
            # Check if the inpatientID is known at all
            if inpatientID not in mock_patients_db: # Check consolidated DB
                return jsonify({"message": f"Patient with ID '{inpatientID}' not found."}), 404 # Use 404 as per doc
            else:
                # Inpatient exists but has no events yet. Create the structure.
                mock_inpatient_events[inpatientID] = {}
                print(f"Created event structure for existing patient '{inpatientID}'.")


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
            # If event doesn't exist, should we create it or return error?
            # Let's assume we update/create the note for the given eventID.
            # If the event itself needs creating first, that's a different endpoint/logic.
            # For now, just update/add the note to the specified event ID.
            # If the event ID doesn't exist, this will effectively create it with just a note.
            # A better approach might be to have separate 'add event' and 'add/edit note' endpoints.
            # Let's stick to the current logic: update note if event exists, otherwise error?
            # Doc implies adding a note to an *existing* event. Let's return 404 if event ID not found.
            # return jsonify({"message": f"Event ID '{event_id}' not found for patient '{inpatientID}'."}), 404 # Event not found for this patient
            # --- OR --- Allow creating the note even if eventID is new for this patient
            if 'event' not in mock_inpatient_events[inpatientID].get(event_id, {}):
                # If the event doesn't exist, create a placeholder
                mock_inpatient_events[inpatientID][event_id] = {"event": "Note Added", "time": time.time()}
                print(f"Created placeholder event '{event_id}' for patient '{inpatientID}' to add note.")


        # Store note in mock data - Replace the existing note string
        mock_inpatient_events[inpatientID][event_id]['note'] = note_text

        print(f"Doctor added/updated note for event {event_id} in inpatient {inpatientID}: {note_text}")

        return jsonify({"message": "Event note added successfully"}), 200

    except Exception as e:
        # Need to define event_id before the exception block if it's used in the error message
        event_id_for_error = data.get('eventID', 'unknown') if 'data' in locals() else 'unknown'
        print(f"Error adding inpatient event note for inpatient {inpatientID}, event {event_id_for_error}: {e}")
        return jsonify({"message": "An error occurred while adding the event note."}), 500