from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import app # Import the blueprint 'app' defined in Nurse/__init__.py
import datetime

# --- Mock Data ---
# Store vital signs keyed by sessionID.
# In a real app, this would interact with a database table linking vitals to sessions/patients.
mock_vital_signs_db = {
    "sess_patient_001_checkup": {}, # Existing session, no vitals yet
    "sess_patient_002_emergency": { # Existing session with some previous vitals
        "bloodPressure": "130/85",
        "pulse": "88",
        "temperature": "37.2",
        "recorded_at": "2025-04-01T10:00:00Z"
    },
    "abc-xyz-123": {} # Session ID from the example
}

# List of known valid session IDs for 404 checking (replace with DB check)
valid_session_ids = list(mock_vital_signs_db.keys())


# 7.4.6.1 Diagnosis: Input Vital Signs
@app.route('/input_vital_sign/<string:sessionID>', methods=['POST'])
@jwt_required()
def input_vital_signs(sessionID):
    """
    Sets or updates the vital signs for a specific patient session.
    """
    try:
        # Check if the sessionID exists (mock check)
        if sessionID not in valid_session_ids:
             return jsonify({"message": f"Session with ID '{sessionID}' not found."}), 404

        # Get the JSON payload
        data = request.get_json()
        if not data:
            return jsonify({"message": "Missing JSON payload."}), 400

        # Extract vital signs from payload
        blood_pressure = data.get('bloodPressure')
        pulse = data.get('pulse')
        breathing_rate = data.get('breathingRate')
        temperature = data.get('temperature')
        bmi = data.get('bmi')
        oxygen_saturation = data.get('oxygenSaturation')

        # Basic validation: Check if at least one vital sign is provided
        # More specific validation (e.g., format, range) should be added in a real app.
        if not any([blood_pressure, pulse, breathing_rate, temperature, bmi, oxygen_saturation]):
             return jsonify({"message": "Missing vital sign data in payload."}), 400

        # In a real application, save these vital signs to the database,
        # associating them with the sessionID and potentially the patientID.
        # Also record the timestamp and the user who entered the data.
        nurse_identity = get_jwt_identity() # Get the logged-in nurse's identity
        timestamp = datetime.datetime.now(datetime.timezone.utc).isoformat()

        # Update mock database
        vitals_entry = mock_vital_signs_db.get(sessionID, {})
        if blood_pressure: vitals_entry['bloodPressure'] = blood_pressure
        if pulse: vitals_entry['pulse'] = pulse
        if breathing_rate: vitals_entry['breathingRate'] = breathing_rate
        if temperature: vitals_entry['temperature'] = temperature
        if bmi: vitals_entry['bmi'] = bmi
        if oxygen_saturation: vitals_entry['oxygenSaturation'] = oxygen_saturation
        vitals_entry['recorded_at'] = timestamp
        vitals_entry['recorded_by'] = nurse_identity # Store who recorded it

        mock_vital_signs_db[sessionID] = vitals_entry

        print(f"Updated vitals for session {sessionID}: {vitals_entry}") # Server log for confirmation

        return jsonify({"message": "Set patient's vital signs successfully"}), 200

    except Exception as e:
        # Log the exception e for debugging
        print(f"Error inputting vital signs for session {sessionID}: {e}")
        return jsonify({"message": "An error occurred while inputting vital signs."}), 500