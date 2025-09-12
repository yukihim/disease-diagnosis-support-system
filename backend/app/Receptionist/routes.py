from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import app # Import the blueprint 'app' defined in Nurse/__init__.py
import datetime
from ..utils import check_role


# 7.4.4.1 Landing Page: Get Emergency List
@app.route('/landing_page/emergency', methods=['GET'])
@jwt_required()
@check_role(['receptionist'])
def get_emergency_list():
    """Retrieves the list of current emergency cases.
    
    Returns:
        list: A list of emergency cases.
            format:
            {
                emergencyCases: [
                    {
                        "case": "case",
                        "dept": "department",
                        "time": "time in hh:mm",
                    }
                ]
            }
                
    """
    try:
        # Add pagination logic here if needed (using request.args)
        from .utils import get_emergency_list
        return jsonify({"emergencyCases":get_emergency_list()}), 200
    except Exception as e:
        print(f"Error getting emergency list: {e}")
        import logging
        logging.getLogger(__name__).error(e)
        
        return jsonify({"message": "An error occurred retrieving emergency list."}), 500
    
# 7.4.4.3 Landing Page: Get Today’s Past Appointment List
@app.route('/landing_page/todays_past_appointment', methods=['GET'])
@jwt_required()
@check_role(['receptionist'])
def get_todays_past_appointment_list():
    """Retrieves the list of today's past appointments.
    
    Returns:
        list: A list of today's past appointments.
            format:
            {
                pastAppointments: [
                    {
                        "name": "patient name",
                        "status": "status",
                        "time": "appointment time in hh:mm",
                    }
                ]
            }
                
    """
    try:
        from .utils import get_todays_past_appointment_list
        return jsonify({"pastAppointments":get_todays_past_appointment_list()}), 200
    except Exception as e:
        print(f"Error getting today's past appointment list: {e}")
        import logging
        logging.getLogger(__name__).error(e)
        
        return jsonify({"message": "An error occurred retrieving today's past appointment list."}), 500

# 7.4.4.4 Landing Page: Get Available Doctor List
@app.route('/landing_page/available_doctor', methods=['GET'])
@jwt_required()
@check_role(['receptionist'])
def get_available_doctor_list():
    """Retrieves the list of available doctors."""
    try:
        # Add pagination logic here if needed (using request.args)
        # Filter based on doctor schedules/status
        from .utils import get_available_doctor_list
        return jsonify({"availableDoctors": get_available_doctor_list()}), 200
    except Exception as e:
        print(f"Error getting available doctors: {e}")
        import logging
        logging.getLogger(__name__).error(e)
        return jsonify({"message": "An error occurred retrieving available doctors."}), 500

# 7.4.4.5 Find Patient Page: Find Patient by SSN
@app.route('/find_patient/ssn', methods=['POST'])
@jwt_required()
@check_role(['receptionist'])
def find_patient_by_ssn():
    """Finds a patient by their SSN.
    Input:
        json{
            ssn: str
        }
    Returns:
        json: A JSON object containing the patient's information.
            format:
            {
                patients: {
                    "patientName": "patient name",
                    "ssn": "patient ssn",
                    "hic": "patient hic",
                    
                }
            }
    """
    try:
        data = request.get_json()

        ssn = data.get('ssn')
        if not ssn:
            return jsonify({"message": "SSN is required."}), 400

        from .utils import find_patient_by_ssn
        return jsonify({"patients": find_patient_by_ssn(ssn)}), 200
    except Exception as e:
        print(f"Error finding patient by SSN: {e}")
        import logging
        logging.getLogger(__name__).error(e)
                


# 7.4.4.6 Find Patient Page: Find Patient by Health Insurance Code
@app.route('/find_patient/hic', methods=['POST'])
@jwt_required()
@check_role(['receptionist'])
def find_patient_by_hic():
    """Finds a patient by their Health Insurance Code.
    Input:
        json{
            hic: str
        }
    """

    try:
        data = request.get_json()
        hic = data.get('hic')
        if not hic:
            return jsonify({"message": "Health Insurance Code is required."}), 400

        from .utils import find_patient_by_hic
        return jsonify({"patients": find_patient_by_hic(hic)}), 200
    except Exception as e:
        print(f"Error finding patient by Health Insurance Code: {e}")
        import logging
        logging.getLogger(__name__).error(e)



# 7.4.4.7 Landing Page: Get Appointment List
@app.route('/landing_page/appointment', methods=['GET'])
@jwt_required()
@check_role(['receptionist'])
def get_appointment_list():
    """Retrieves the list of appointments."""
    try:
        from .utils import get_appointment_list
        return jsonify({"appointments": get_appointment_list()}), 200
    except Exception as e:
        print(f"Error getting appointment list: {e}")
        import logging
        logging.getLogger(__name__).error(e)
        return jsonify({"message": "An error occurred retrieving appointment list."}), 500





@app.route("/finalize_check_in/patient_information/<int:patientID>", methods=['GET'])
@jwt_required()
@check_role(['receptionist'])
def get_patient_information(patientID):
    """Retrieves the patient information for a given session ID."""
    try:
        from .utils import get_patient_information_receptionist
        return jsonify(get_patient_information_receptionist(patientID)), 200
    except Exception as e:
        print(f"Error getting patient information: {e}")
        import logging
        logging.getLogger(__name__).error(e)
        return jsonify({"message": "An error occurred retrieving patient information."}), 500


@app.route("/finalize_check_in/patient_information/<int:patientID>/edit", methods=['POST'])
@jwt_required()
@check_role(['receptionist'])
def edit_patient_information(patientID):
    """Edits the patient information for a given session ID."""
    try:
        data = request.get_json()
        input_data ={
            "name": data.get('name'),
            "dob": data.get('dob'),
            "gender": data.get('gender'),
            "phone": data.get('phone'),
            "ssn": data.get('ssn'),
            "hic": data.get('hic'),
            "height": data.get('height'),
            "weight": data.get('weight'),
            "job": data.get('job'),
            "address": data.get('address')
        }
        from .utils import edit_patient_information
        edit_patient_information(patientID, input_data)


        return jsonify({"message": "Patient information edited successfully."}), 200
    except Exception as e:
        print(f"Error editing patient information: {e}")
        import logging
        logging.getLogger(__name__).error(e)
        return jsonify({"message": "An error occurred editing patient information."}), 500
    
@app.route("/finalize_check_in/patient_information/<int:patientID>/follow_up", methods=['GET'])
@jwt_required()
@check_role(['receptionist'])
def add_follow_up_date(patientID):
    """Search to find if a follow-up date for a given patient ID."""
    try:
        
        from .utils import check_follow_up
        ans = check_follow_up(patientID)

        return jsonify(ans), 200
    except Exception as e:
        print(f"Error adding follow-up date: {e}")
        return jsonify({"message": "An error occurred adding follow-up date."}), 500


@app.route("/finalize_check_in/patient_information/<int:patientID>/checkin", methods=['POST'])
@jwt_required()
@check_role(['receptionist'])
def checkin_patient(patientID):
    """Checks in a patient for a given session ID."""
    try:
        data = request.get_json()
        
        from .utils import checkin_patient
        checkin_patient(patientID, data)
        


        return jsonify({"message": "Patient Session Checked In"}), 200
    except Exception as e:
        print(f"Error checking in patient: {e}")
        import logging
        logging.getLogger(__name__).error(e)
        return jsonify({"message": "An error occurred checking in patient."}), 500
    
    
