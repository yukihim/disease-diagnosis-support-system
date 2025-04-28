from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
# Removed check_role import as it's no longer used on the remaining route
# from ..authentication import check_role
from . import app

# --- Mock Data ---
# Using patientID as key, mapping to a list of sessions
mock_patient_sessions_map = {
    "patient_001": [
        {
            "sessionID": "sess_patient_001_checkup",
            "sessionDate": "2025-03-15",
            "sessionType": "Check-up",
            "personInCharged": "Dr. Smith",
            "department": "General Medicine",
            "result": "Stable condition"
        },
        {
            "sessionID": "sess_patient_001_followup",
            "sessionDate": "2024-11-20",
            "sessionType": "Follow-up",
            "personInCharged": "Dr. Jones",
            "department": "Cardiology",
            "result": "Blood pressure controlled"
        }
    ],
    "patient_002": [
        {
            "sessionID": "sess_patient_002_emergency",
            "sessionDate": "2025-04-01",
            "sessionType": "Emergency",
            "personInCharged": "Dr. Davis",
            "department": "Emergency Room",
            "result": "Treated for minor injury"
        }
    ],
    "abc-xyz-123": [
         {
            "sessionID": "sess_abc-xyz-123_consult",
            "sessionDate": "2025-01-10",
            "sessionType": "Consultation",
            "personInCharged": "Dr. Quan",
            "department": "Neurology",
            "result": "Initial assessment"
        },
    ]
    # Add more patient IDs and their sessions as needed
}

# --- API Endpoints ---

# 7.4.3.1 Pass Sessions Table: Get List by PatientID
# Changed path parameter from sessionID to patientID
@app.route('/pass_sessions/<string:patientID>', methods=['GET'])
@jwt_required()
# Removed role check - assuming any authenticated user can get sessions by patient ID
def get_patient_pass_sessions(patientID): # Changed function parameter name
    """
    Retrieves a list of past medical sessions for a specific patient based on patientID.
    Uses the mock_patient_sessions_map.
    """
    try:
        # Directly look up the patientID in the map
        patient_sessions = mock_patient_sessions_map.get(patientID, []) # Default to empty list if not found

        # Optional: Validate patientID against a central patient DB if needed
        # if patientID not in mock_patients_db: # Assuming mock_patients_db is accessible
        #     return jsonify({"message": f"Patient with ID '{patientID}' not found."}), 404

        # Return the list of sessions found for the patient (can be empty).
        return jsonify({"passSessions": patient_sessions}), 200

    except Exception as e:
        print(f"Error retrieving pass sessions for patient {patientID}: {e}")
        return jsonify({"message": "An error occurred while retrieving pass sessions."}), 500