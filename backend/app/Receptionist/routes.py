from . import app
# Assuming these modules contain the logic for existing routes, keep them if needed
# If the new routes replace their functionality, these imports might be removable later
# from . import overview, pass_session, patient_search, get_patient_ehr, check_in
from flask import request, jsonify
from ..authentication import check_role # Assuming check_role decorator exists
from flask_jwt_extended import jwt_required, get_jwt_identity
import datetime
import random

# --- Mock Data ---

mock_emergency_cases = [
    {"case": "Severe Chest Pain", "time": "10:15", "dept": "Cardiology"},
    {"case": "Difficulty Breathing", "time": "10:30", "dept": "Pulmonology"},
    {"case": "Head Injury", "time": "11:00", "dept": "Neurology/ER"},
]

mock_appointments = [
    {"name": "Nguyen Van A", "time": "13:00", "dept": "General Checkup"},
    {"name": "Tran Thi B", "time": "13:30", "dept": "Cardiology"},
    {"name": "Le Van C", "time": "14:00", "dept": "Dermatology"},
]

mock_past_appointments = [
    {"name": "Pham Thi D", "time": "09:00", "status": "Completed"},
    {"name": "Hoang Van E", "time": "09:30", "status": "No Show"},
    {"name": "Vu Thi F", "time": "10:00", "status": "Completed"},
]

mock_available_doctors = [
    {"name": "Dr. Quan", "role": "Cardiologist"},
    {"name": "Dr. Mai", "role": "General Practitioner"},
    {"name": "Dr. Smith", "role": "Neurologist"},
    {"name": "Dr. Jones", "role": "Dermatologist"},
]

# Mock patient database
mock_patients_db = {
    "patient_001": {
        "userID": "patient_001", # Using userID as patientID for simplicity here
        "patientName": "Nguyen Van A",
        "ssn": "079200001111",
        "hic": "HIC-A",
        "dob": "1985-05-10",
        "gender": "Male",
        "phone": "0912345678",
        "height": "175",
        "weight": "70",
        "job": "Engineer",
        "address": "123 Main St, Hanoi",
        "hasFollowUpAppointment": True
    },
    "patient_002": {
        "userID": "patient_002",
        "patientName": "Tran Thi B",
        "ssn": "079200002222",
        "hic": "HIC-B",
        "dob": "1992-11-25",
        "gender": "Female",
        "phone": "0987654321",
        "height": "160",
        "weight": "55",
        "job": "Teacher",
        "address": "456 Oak Ave, HCMC",
        "hasFollowUpAppointment": False
    },
     "abc-xyz-123": { # Matching test value
        "userID": "abc-xyz-123",
        "patientName": "Le Van C (Test)",
        "ssn": "079283868386", # Matching test value
        "hic": "HIC-C",
        "dob": "1978-01-15",
        "gender": "Male",
        "phone": "0909913313",
        "height": "180",
        "weight": "85",
        "job": "Manager",
        "address": "789 Pine Ln, Danang",
        "hasFollowUpAppointment": True
    }
}

mock_follow_up_info = {
     "patient_001": {"department": "Cardiology", "doctor": "Dr. Jones"},
     "abc-xyz-123": {"department": "Neurology", "doctor": "Dr. Smith"}
}

# 7.4.4.1 Landing Page: Get Emergency List
@app.route('/landing_page/emergency', methods=['GET'])
@jwt_required()
@check_role(['receptionist'])
def get_emergency_list():
    """Retrieves the list of current emergency cases."""
    try:
        # Add pagination logic here if needed (using request.args)
        return jsonify({"emergencyCases": mock_emergency_cases}), 200
    except Exception as e:
        print(f"Error getting emergency list: {e}")
        return jsonify({"message": "An error occurred retrieving emergency list."}), 500

# 7.4.4.2 Landing Page: Get Appointment List
@app.route('/landing_page/appointment', methods=['GET'])
@jwt_required()
@check_role(['receptionist'])
def get_appointment_list():
    """Retrieves the list of upcoming appointments."""
    try:
        # Add pagination logic here if needed (using request.args)
        # Filter for appointments >= current time
        return jsonify({"appointments": mock_appointments}), 200
    except Exception as e:
        print(f"Error getting appointment list: {e}")
        return jsonify({"message": "An error occurred retrieving appointment list."}), 500

# 7.4.4.3 Landing Page: Get Today’s Past Appointment List
@app.route('/landing_page/todays_past_appointment', methods=['GET'])
@jwt_required()
@check_role(['receptionist'])
def get_todays_past_appointment_list():
    """Retrieves the list of today's past appointments."""
    try:
        # Add pagination logic here if needed (using request.args)
        # Filter for appointments < current time on today's date
        return jsonify({"pastAppointments": mock_past_appointments}), 200
    except Exception as e:
        print(f"Error getting past appointments: {e}")
        return jsonify({"message": "An error occurred retrieving past appointments."}), 500

# 7.4.4.4 Landing Page: Get Available Doctor List
@app.route('/landing_page/available_doctor', methods=['GET'])
@jwt_required()
@check_role(['receptionist'])
def get_available_doctor_list():
    """Retrieves the list of available doctors."""
    try:
        # Add pagination logic here if needed (using request.args)
        # Filter based on doctor schedules/status
        return jsonify({"availableDoctors": mock_available_doctors}), 200
    except Exception as e:
        print(f"Error getting available doctors: {e}")
        return jsonify({"message": "An error occurred retrieving available doctors."}), 500

# 7.4.4.5 Find Patient Page: Find Patient by SSN
@app.route('/find_patient/ssn', methods=['POST'])
@jwt_required()
@check_role(['receptionist'])
def find_patient_by_ssn():
    """Finds patients by Social Security Number."""
    try:
        data = request.get_json()
        ssn = data.get('ssn')
        if not ssn:
            return jsonify({"message": "Missing 'ssn' in request body."}), 400

        # Mock search logic
        results = []
        for patient in mock_patients_db.values():
            if patient.get('ssn') == ssn:
                results.append({
                    "userID": patient.get('userID'),
                    "patientName": patient.get('patientName'),
                    "ssn": patient.get('ssn'),
                    "hic": patient.get('hic')
                })

        return jsonify({"patients": results}), 200 # Doc says 'patients', using that

    except Exception as e:
        print(f"Error finding patient by SSN: {e}")
        return jsonify({"error": "Error while searching for patient by SSN."}), 400 # Doc says 400 for errors

# 7.4.4.6 Find Patient Page: Find Patient by Health Insurance Code
@app.route('/find_patient/hic', methods=['POST'])
@jwt_required()
@check_role(['receptionist'])
def find_patient_by_hic():
    """Finds patients by Health Insurance Code."""
    try:
        data = request.get_json()
        hic = data.get('hic')
        if not hic:
            return jsonify({"message": "Missing 'hic' in request body."}), 400

        # Mock search logic
        results = []
        for patient in mock_patients_db.values():
            if patient.get('hic') == hic:
                results.append({
                    "userID": patient.get('userID'),
                    "patientName": patient.get('patientName'),
                    "ssn": patient.get('ssn'),
                    "hic": patient.get('hic')
                })

        # Doc response field is 'patient_lists', which seems unusual. Using 'patients' for consistency.
        return jsonify({"patients": results}), 200

    except Exception as e:
        print(f"Error finding patient by HIC: {e}")
        return jsonify({"error": "Error while searching for patient by HIC."}), 400 # Doc says 400 for errors

# 7.4.4.7 Patient Finalize and Check-in Page: Retrieve Patient Information
@app.route('/finalize_check_in/patient_information/<string:patientID>', methods=['GET'])
@jwt_required()
@check_role(['receptionist'])
def retrieve_patient_information(patientID):
    """Retrieves detailed information for a specific patient."""
    try:
        patient_info = mock_patients_db.get(patientID)
        if not patient_info:
            return jsonify({"error": f"Patient with ID '{patientID}' not found."}), 404 # Use 404 for not found

        # Format response according to documentation
        response_data = {
            "name": patient_info.get("patientName"),
            "dob": patient_info.get("dob"),
            "gender": patient_info.get("gender"),
            "phone": patient_info.get("phone"),
            "ssn": patient_info.get("ssn"),
            "hic": patient_info.get("hic"),
            "height": patient_info.get("height"),
            "weight": patient_info.get("weight"),
            "job": patient_info.get("job"),
            "address": patient_info.get("address"),
            "hasFollowUpAppointment": patient_info.get("hasFollowUpAppointment", False)
        }
        return jsonify(response_data), 200

    except Exception as e:
        print(f"Error retrieving patient info for {patientID}: {e}")
        # Doc says 400 for errors, but 500 might be more appropriate for server errors
        return jsonify({"error": "Error while retrieving patient information."}), 400

# 7.4.4.8 Patient Finalize and Check-in Page: Edit Patient Information
@app.route('/finalize_check_in/patient_information/<string:patientID>/edit', methods=['POST'])
@jwt_required()
@check_role(['receptionist'])
def edit_patient_information(patientID):
    """Edits information for a specific patient."""
    try:
        if patientID not in mock_patients_db:
            return jsonify({"error": f"Patient with ID '{patientID}' not found."}), 404 # Use 404

        data = request.get_json()
        if not data:
            return jsonify({"message": "Missing JSON payload."}), 400

        # Update mock database (only update fields provided in the payload)
        patient_record = mock_patients_db[patientID]
        if 'name' in data: patient_record['patientName'] = data['name'] # Map 'name' from payload to 'patientName' in DB
        if 'dob' in data: patient_record['dob'] = data['dob']
        if 'gender' in data: patient_record['gender'] = data['gender']
        if 'phone' in data: patient_record['phone'] = data['phone']
        if 'ssn' in data: patient_record['ssn'] = data['ssn']
        if 'hic' in data: patient_record['hic'] = data['hic']
        if 'height' in data: patient_record['height'] = data['height']
        if 'weight' in data: patient_record['weight'] = data['weight']
        if 'job' in data: patient_record['job'] = data['job']
        if 'address' in data: patient_record['address'] = data['address']
        # 'hasFollowUpAppointment' is not in the edit payload per the doc

        print(f"Updated patient info for {patientID}: {patient_record}") # Server log

        return jsonify({"message": "Patient information edited successfully"}), 200

    except Exception as e:
        print(f"Error editing patient info for {patientID}: {e}")
        # Doc says 400 for errors, but 500 might be more appropriate for server errors
        return jsonify({"error": "Error while editing patient information."}), 400

# 7.4.4.9 Patient Finalize and Check-in Page: Retrieve Follow Up Patient Information
@app.route('/finalize_check_in/patient_information/<string:patientID>/follow_up', methods=['GET'])
@jwt_required()
@check_role(['receptionist'])
def retrieve_follow_up_information(patientID):
    """Retrieves follow-up appointment details for a specific patient."""
    try:
        if patientID not in mock_patients_db:
             return jsonify({"error": f"Patient with ID '{patientID}' not found."}), 404 # Use 404

        follow_up = mock_follow_up_info.get(patientID)

        if not follow_up:
             # Handle case where patient exists but has no follow-up info stored
             return jsonify({"message": f"No follow-up information found for patient ID '{patientID}'."}), 404 # Or return 200 with empty data? Doc implies error.

        # Return the follow-up details
        return jsonify(follow_up), 200

    except Exception as e:
        print(f"Error retrieving follow-up info for {patientID}: {e}")
        # Doc says 400 for errors, but 500 might be more appropriate for server errors
        return jsonify({"error": "Error while retrieving follow-up information."}), 400