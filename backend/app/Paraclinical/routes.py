from . import app
# Remove unused imports if overview and test modules are not used by these new routes
# from . import overview, test
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, jsonify
import random # For generating mock data

# --- Mock Data ---

# Mock data for incoming patients
mock_incoming_patients = [
    {
        "sessionID": "sess_123_abc",
        "name": "Nguyen Van A",
        "sex": "Male",
        "age": 45,
        "from": "Emergency Room",
        "state": "Waiting",
        "note": "Chest pain, suspect heart issue."
    },
    {
        "sessionID": "sess_456_def",
        "name": "Tran Thi B",
        "sex": "Female",
        "age": 32,
        "from": "Outpatient Clinic",
        "state": "Waiting",
        "note": "Routine blood work requested."
    },
    {
        "sessionID": "sess_789_ghi",
        "name": "Le Van C",
        "sex": "Male",
        "age": 68,
        "from": "Cardiology Ward",
        "state": "In Progress",
        "note": "Post-op EKG check."
    }
]

# Mock data for test related information, keyed by sessionID
mock_test_related_info = {
    "sess_123_abc": [ # Can have multiple tests per session
        {
            "sentFromRoom": "ER-Bed 5",
            "note": "Urgent Troponin T test needed.",
            "amountOfTests": 1,
            "testType": "Blood Chemistry",
            "ListOfParameters": ["Troponin T", "CK-MB", "Potassium"]
        },
        {
            "sentFromRoom": "ER-Bed 5",
            "note": "Standard EKG.",
            "amountOfTests": 1,
            "testType": "EKG",
            "ListOfParameters": ["12-lead EKG"]
        }
    ],
    "sess_456_def": [
        {
            "sentFromRoom": "Clinic Room 3",
            "note": "Annual checkup blood panel.",
            "amountOfTests": 1,
            "testType": "Blood Count",
            "ListOfParameters": ["WBC", "RBC", "Hemoglobin", "Hematocrit", "Platelets"]
        }
    ],
     "sess_789_ghi": [
        {
            "sentFromRoom": "Cardiology-Room 201",
            "note": "Follow-up EKG after bypass.",
            "amountOfTests": 1,
            "testType": "EKG",
            "ListOfParameters": ["12-lead EKG"]
        }
    ]
}

# Mock data for device measurements, keyed by sessionID and testType
mock_measurements = {
    "sess_123_abc": {
        "Blood Chemistry": [
            {"parameter": "Troponin T", "value": f"{random.uniform(0.01, 0.05):.2f} ng/mL"}, # Mock value
            {"parameter": "CK-MB", "value": f"{random.uniform(2, 5):.1f} ng/mL"},
            {"parameter": "Potassium", "value": f"{random.uniform(3.5, 5.0):.1f} mEq/L"}
        ],
        "EKG": [
             {"parameter": "Rhythm", "value": "Sinus Tachycardia"},
             {"parameter": "Rate", "value": f"{random.randint(100, 120)} bpm"},
             {"parameter": "ST Segment", "value": "Possible elevation"}
        ]
    },
    "sess_456_def": {
        "Blood Count": [
            {"parameter": "WBC", "value": f"{random.uniform(4.5, 11.0):.1f} x10^9/L"},
            {"parameter": "RBC", "value": f"{random.uniform(4.2, 5.9):.2f} x10^12/L"},
            {"parameter": "Hemoglobin", "value": f"{random.uniform(13.0, 17.5):.1f} g/dL"},
            {"parameter": "Hematocrit", "value": f"{random.uniform(38, 50):.1f} %"},
            {"parameter": "Platelets", "value": f"{random.randint(150, 450)} x10^9/L"}
        ]
    },
    "sess_789_ghi": {
        "EKG": [
             {"parameter": "Rhythm", "value": "Normal Sinus Rhythm"},
             {"parameter": "Rate", "value": f"{random.randint(60, 90)} bpm"},
             {"parameter": "ST Segment", "value": "Normal"}
        ]
    }
}

# 7.4.7.1 LandingPage: Get Incoming Patient For Test List
@app.route('/landing_page/incoming_patient', methods=['GET'])
@jwt_required()
def get_incoming_patient_list():
    """
    Retrieves a list of incoming patients waiting for or undergoing tests.
    """
    try:
        # In a real application, query the database for patients with relevant test statuses.
        # Returning mock data for now.
        # Add filtering/pagination based on query parameters if needed (e.g., request.args.get('page'))
        return jsonify({"incomingPatient": mock_incoming_patients}), 200
    except Exception as e:
        # Log the exception e
        return jsonify({"message": "An error occurred retrieving incoming patient list."}), 500

# 7.4.7.2 PatientTest: Get Test Related Information
@app.route('/patient_test/<string:sessionID>', methods=['GET'])
@jwt_required()
def get_test_related_information(sessionID):
    """
    Retrieves test-related details for a specific patient session.
    """
    try:
        # In a real application, query the database based on sessionID.
        test_info = mock_test_related_info.get(sessionID)

        if test_info is None:
            return jsonify({"message": f"No test information found for session ID: {sessionID}"}), 404

        # The doc asks for an Array, even if there's potentially only one session.
        # Assuming it means an array of tests *within* that session.
        return jsonify({"testRelatedInformation": test_info}), 200
    except Exception as e:
        # Log the exception e
        return jsonify({"message": "An error occurred retrieving test related information."}), 500

# 7.4.7.3 PatientTest: Get Device Measuring
@app.route('/patient_test/<string:sessionID>/measuring', methods=['GET'])
@jwt_required()
def get_device_measuring(sessionID):
    """
    Retrieves specific measurements for a test type within a patient session.
    """
    try:
        test_type = request.args.get('testType') # Get testType from query parameters

        if not test_type:
            return jsonify({"message": "Missing 'testType' query parameter."}), 400

        # In a real application, query the database based on sessionID and testType.
        session_measurements = mock_measurements.get(sessionID)
        if session_measurements is None:
             return jsonify({"message": f"No measurements found for session ID: {sessionID}"}), 404

        specific_measurements = session_measurements.get(test_type)
        if specific_measurements is None:
            return jsonify({"message": f"No measurements found for session ID '{sessionID}' and test type '{test_type}'"}), 404

        return jsonify({"measurements": specific_measurements}), 200
    except Exception as e:
        # Log the exception e
        return jsonify({"message": "An error occurred retrieving device measurements."}), 500