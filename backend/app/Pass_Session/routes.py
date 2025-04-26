from flask import jsonify
from flask_jwt_extended import jwt_required
from . import app # Import the blueprint 'app' defined in Pass_Session/__init__.py

# --- Mock Data ---
# Dictionary where keys are sessionIDs (as per updated request)
# and values are lists of their past sessions (Note: This structure might need rethinking
# if a sessionID should only map to a single session's details).
# Keeping the structure for now, assuming the key represents the ID requested.
mock_pass_sessions_db = {
    "sess_patient_001_checkup": [ # Example session ID
        {
            "sessionDate": "2025-03-15",
            "sessionType": "Check-up",
            "personInCharged": "Dr. Smith",
            "department": "General Medicine",
            "result": "Stable condition"
        }
    ],
     "sess_patient_001_followup": [
         {
            "sessionDate": "2024-11-20",
            "sessionType": "Follow-up",
            "personInCharged": "Dr. Jones",
            "department": "Cardiology",
            "result": "Blood pressure controlled"
        }
    ],
    "sess_patient_002_emergency": [
        {
            "sessionDate": "2025-04-01",
            "sessionType": "Emergency",
            "personInCharged": "Dr. Davis",
            "department": "Emergency Room",
            "result": "Treated for minor injury"
        }
    ],
    "abc-xyz-123": [ # Matching the test value in the doc - assuming this is now a sessionID
         {
            "sessionDate": "2025-01-10",
            "sessionType": "Consultation",
            "personInCharged": "Dr. Quan",
            "department": "Neurology",
            "result": "Initial assessment"
        },
    ]
    # Add more session IDs and their details as needed
}


# 7.4.3.1 Pass Sessions Table: Get List for Page (Path updated to use sessionID)
@app.route('/pass_sessions/<string:sessionID>', methods=['GET']) # Changed patientID to sessionID
@jwt_required()
def get_patient_pass_sessions(sessionID): # Changed patientID to sessionID
    """
    Retrieves details for a specific past medical session based on sessionID.
    (Note: The original implementation returned a list based on patientID.
     This is adjusted based on the path change, but mock data structure might need review.)
    """
    try:
        # In a real application, query the database for the session with the given sessionID
        # The mock data structure might need adjustment if a sessionID maps to a single session object.
        session_data = mock_pass_sessions_db.get(sessionID) # Changed patientID to sessionID

        if session_data is None:
            # Session ID not found in our mock database
            return jsonify({"message": f"Session with ID '{sessionID}' not found."}), 404 # Changed message

        # Return the session data found.
        # If sessionID maps to a single session, the response might just be the object itself,
        # or still wrapped in a list/object as required by the frontend.
        # Returning the list as per the current mock data structure.
        return jsonify({"passSessions": session_data}), 200

    except Exception as e:
        # Log the exception e for debugging
        print(f"Error retrieving pass session for session {sessionID}: {e}") # Changed message
        return jsonify({"message": "An error occurred while retrieving pass session."}), 500