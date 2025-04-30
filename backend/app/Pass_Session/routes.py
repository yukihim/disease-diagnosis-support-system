from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
# Removed check_role import as it's no longer used
# from ..authentication import check_role
from . import app
import traceback # Import traceback for better error logging

# --- No Mock Data Needed for this specific endpoint logic ---

# --- API Endpoint ---

# MODIFIED: Always returns a fixed detailed response, ignoring sessionID,
#           and containing only the requested fields + prescriptions/procedures.
@app.route('/pass_sessions/<string:sessionID>', methods=['GET'])
@jwt_required()
def get_pass_session_details(sessionID): # Keep function name for consistency
    """
    Retrieves a FIXED, hardcoded detailed information object, simulating
    a past medical session lookup. Includes session summary fields,
    prescriptions, and procedures.
    The provided sessionID parameter is ignored.
    """
    try:
        # --- Define the Fixed Hardcoded Response ---
        fixed_response_data = {
            # Session Summary Fields (based on requested headers)
            "sessionID": "patient_001",
            "sessionDate": "2024-10-15",
            "sessionType": "Annual Checkup (Fixed)",
            "personInCharged": "Dr. Fixed Data",
            "department": "General Practice (Fixed)",
            "result": "Routine check, all clear (Fixed)",
            
            "finalDiagnosis": {
                "symptoms": "Fever, fatigue, and pallor (Fixed)",
                "diagnosis": "Iron deficiency anemia (Fixed)",
            },

            # Prescription Array
            "prescriptions": [
                {"medicine": "Ferrous Sulfate 325mg", "morning": "1", "noon": "0", "afternoon": "0", "evening": "0", "duration": "60 days", "note": "Take with Vitamin C or orange juice."},
                {"medicine": "Multivitamin (OTC)", "morning": "1", "noon": "0", "afternoon": "0", "evening": "0", "duration": "Ongoing", "note": "General supplement."},
            ],

            # Procedure Array
            "procedures": [
                {"procedureName": "Blood Draw for CBC", "dateTime": "2024-01-10 10:30 AM", "note": "Standard venipuncture."},
                {"procedureName": "Nutritional Counseling", "dateTime": "2024-01-10 11:00 AM", "note": "Discussed iron-rich foods."},
            ]
            # Removed patientInformation, vitalSigns, testResults, finalDiagnosis
        }
        # --- End Fixed Hardcoded Response ---

        # Ignore the sessionID parameter and just return the fixed data
        print(f"Accessed /pass_sessions/{sessionID}, returning fixed detailed data (summary + prescriptions/procedures).")
        return jsonify(fixed_response_data), 200

    except Exception as e:
        # Log the full traceback for better debugging in container logs
        print(f"Error in get_pass_session_details (fixed response) for requested session {sessionID}:")
        traceback.print_exc()
        return jsonify({"message": "An internal error occurred while retrieving fixed session details."}), 500

# Removed the previous mock data definitions as they are no longer needed here
# Removed the previous route implementation