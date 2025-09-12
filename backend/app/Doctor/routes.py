"""
Author: nhoxtin15
Model Description:

Date Created: 14/04/2025
Last Updated: 14/04/2025
"""



from . import app
from flask import request, jsonify

from flask_jwt_extended import jwt_required
from .exception import *
from ..utils import check_role

##################################################
##                                              ##
##                                              ##
##                 Landing_page                 ##
##                                              ##
##                                              ##
##################################################

@app.route('/landing_page/incoming_patient', methods=['GET'])
@jwt_required()
@check_role(['doctor', 'nurse'])
def get_incoming_patient_list():
    # get user_id from jwt
    from flask_jwt_extended import get_jwt
    user_id = int(get_jwt()['user_id'])
    

    from .utils import get_incomming_patient

    ans = get_incomming_patient(user_id)



    import logging
    _logger = logging.getLogger(__name__)
    # _logger.info(stmt)
    # _logger.info(ans)
    return jsonify({"incomingPatient": ans}), 200

# 7.4.5.2 Landing Page: Get Today’s Appointment List
@app.route('/landing_page/todays_appointment', methods=['GET'])
@jwt_required()
@check_role(['doctor', 'nurse'])
def get_todays_appointment_list():
    from .utils import get_appointments
    from flask_jwt_extended import get_jwt
    user_id = int(get_jwt()['user_id'])
    ans = get_appointments(user_id)

    import logging
    _logger = logging.getLogger(__name__)
    # _logger.info(stmt)
    _logger.info(ans)
    return jsonify({"appointments": ans}), 200


# 7.4.5.3 Landing Page: Get Patient Sent For Paraclinical Test List
@app.route('/landing_page/patient_sent_for_test', methods=['GET'])
@jwt_required()
@check_role(['doctor', 'nurse'])
def get_patient_sent_for_test_list():
    from flask_jwt_extended import get_jwt
    user_id = int(get_jwt()['user_id'])
    from .utils import get_patient_sent_for_test
    ans = get_patient_sent_for_test(user_id)

    import logging
    _logger = logging.getLogger(__name__)
    # _logger.info(stmt)
    _logger.info(ans)
    return jsonify({"patientSentForTest": ans}), 200

# 7.4.5.4 Landing Page: Get Inpatient Monitoring List
@app.route('/landing_page/inpatient_monitoring', methods=['GET'])
@jwt_required()
@check_role(['doctor', 'nurse'])
def get_inpatient_monitoring_list():
    from .utils import get_inpatients

    from flask_jwt_extended import get_jwt
    user_id = int(get_jwt()['user_id'])
    ans = get_inpatients(user_id)

    import logging
    _logger = logging.getLogger(__name__)
    # _logger.info(stmt)
    _logger.info(ans)
    return jsonify({"inpatientMonitoring":ans}), 200


# 7.4.5.5 Diagnosis: Patient Information
@app.route('/diagnosis/patient_information/<int:sessionID>', methods=['GET'])
@jwt_required()
@check_role(['doctor','paraclinical','nurse'])
def get_diagnosis_patient_information(sessionID):
    from .utils import get_patient_general_information
    from flask_jwt_extended import get_jwt
    user_id = int(get_jwt()['user_id'])
    ans = get_patient_general_information(sessionID)

    import logging
    _logger = logging.getLogger(__name__)
    # _logger.info(stmt)
    _logger.info(ans)
    return jsonify(ans), 200

@app.route('/diagnosis/patient_history/<int:patient_id>', methods=['GET'])
@jwt_required()
def get_patient_history_route(patient_id):
    from .utils import get_patient_history
    from flask_jwt_extended import get_jwt
    user_id = int(get_jwt()['user_id'])
    ans = get_patient_history(patient_id)

    import logging
    _logger = logging.getLogger(__name__)
    # _logger.info(stmt)
    _logger.info(ans)
    return jsonify(ans), 200

# 7.4.5.6 Diagnosis: Patient Vital Signs
@app.route('/diagnosis/vital_signs/<int:sessionID>', methods=['GET'])
@jwt_required()
@check_role(['doctor', 'nurse'])
def get_patient_vital_signs(sessionID):
    from .utils import get_patient_vital_signs
    from flask_jwt_extended import get_jwt
    user_id = int(get_jwt()['user_id'])
    ans = get_patient_vital_signs(int(sessionID))

    import logging
    _logger = logging.getLogger(__name__)
    # _logger.info(stmt)
    _logger.info(ans)
    return jsonify({'vitalSigns':ans}), 200

# 7.4.5.7 Diagnosis: Patient Test Results
@app.route('/diagnosis/test_results/<int:sessionID>', methods=['GET'])
@jwt_required()
@check_role(['doctor'])
def get_patient_test_results(sessionID):
    from .utils import get_patients_tests

    from flask_jwt_extended import get_jwt

    ans = get_patients_tests(sessionID)
    import logging


    return jsonify({'testResults':ans}), 200

@app.route('/send_for_test/test_list', methods=['GET'])
@jwt_required()
@check_role(['doctor'])
def get_test_list_route():
    from .utils import get_test_list
    result = get_test_list()
    return jsonify(result), 200

# 7.4.5.8 Send For Test: Test List
@app.route('/send_for_test/set_test_list/<int:sessionID>', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def set_patient_test_list(sessionID):
    from flask_jwt_extended import get_jwt
    user_id = int(get_jwt()['user_id'])

    data = request.get_json()

    if not data or 'tests' not in data:
        return jsonify({"message": "Missing 'tests' field in request body."}), 400
    if not isinstance(data['tests'], list):
        return jsonify({"message": "'tests' field must be an array of strings."}), 400
    if not all(isinstance(test, int) for test in data['tests']):
        return jsonify({"message": "All items in 'tests' array must be integers."}), 400

    requested_tests = data['tests']
    from .utils import send_for_test
    try:
        send_for_test(session_id=sessionID, test_ids=requested_tests, user_id=user_id)
    except Exception as e:
        import logging
        _logger = logging.getLogger(__name__)
        _logger.error(f"Error in send_for_test: {str(e)}")
        return jsonify({"message": "Error in sending for test"}), 500
    return jsonify({"message": "Success"}), 200


@app.route('/prescription_and_procedure/get_medicine_name', methods=['GET'])
@jwt_required()
@check_role(['doctor'])
def get_medicine_name():
    from .utils import get_medicine_name
    result = get_medicine_name()
    return jsonify(result), 200

@app.route('/prescription_and_procedure/get_procedure_name', methods=['GET'])
@jwt_required()
@check_role(['doctor'])
def get_procedure_name():
    from .utils import get_procedures_name
    result = get_procedures_name()
    return jsonify(result), 200


# 7.4.5.10 Prescription And Procedure: Set Patient Prescription
@app.route('/prescription_and_procedure/set_prescription/<int:sessionID>', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def set_patient_prescription(sessionID):
    data = request.get_json()
    if not data or 'prescription' not in data:
        return jsonify({"message": "Missing 'prescription' field in request body."}), 400
    if not isinstance(data['prescription'], list):
        return jsonify({"message": "'prescription' must be an array of prescription objects."}), 400

    prescriptions = data['prescription']
    from .utils import set_prescription
    set_prescription(sessionID, prescriptions)

    return jsonify({"message": "Success"}), 200

@app.route('/prescription_and_procedure/set_procedure/<string:sessionID>', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def set_patient_procedure(sessionID):
    data = request.get_json()
    if not data or 'procedures' not in data:
        return jsonify({"message": "Missing 'procedures' field in request body."}), 400
    if not isinstance(data['procedures'], list):
        return jsonify({"message": "'procedures' must be an array of procedure objects."}), 400
    procedures = data['procedures']
    from .utils import set_procedure
    set_procedure(sessionID, procedures)
    return jsonify({"message": "Success"}), 200

@app.route('/inpatient_monitoring/patient_information/<int:inpatientID>', methods=['GET'])
@jwt_required()
@check_role(['doctor'])
def get_patient_information(inpatientID):
    try:
        from .utils import get_inpatient_general_information
        result = get_inpatient_general_information(inpatientID)
        return jsonify(result), 200
    except Exception as e:
        import logging
        _logger = logging.getLogger(__name__)
        _logger.error(f"Error in get_patient_information: {str(e)}")
        return jsonify({"message": "Error in getting patient information"}), 500


@app.route('/inpatient_monitoring/device_list', methods=['GET'])
@jwt_required()
@check_role(['doctor', 'nurse'])
def get_device_list():
    from .utils import get_device_list
    result = get_device_list()
    return jsonify(result), 200

@app.route('/inpatient_monitoring/<int:inpatient_session_id>/get_selected_device_list', methods=['GET'])
@jwt_required()
@check_role(['doctor', 'nurse'])
def get_selected_device_list(inpatient_session_id):
    from .utils import get_session_current_devices
    result = get_session_current_devices(inpatient_session_id)
    return jsonify(result), 200



@app.route('/inpatient_monitoring/<int:inpatient_session_id>/set_selected_device_list', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def set_device_list(inpatient_session_id):
    from .utils import set_device_list
    data = request.get_json()
    import logging
    _logger = logging.getLogger(__name__)
    _logger.error(f"\n\n\nData: {data}")
    set_device_list(inpatient_session_id, data["selectedDevice"])
    return jsonify({"message": "Success"}), 200



@app.route('/inpatient_monitoring/get_device_status', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def get_device_status():
    from .utils import get_device_status
    data = request.get_json()
    result = get_device_status(data)
    return jsonify(result), 200


@app.route('/inpatient_monitoring/medical_device_measurement', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def get_medical_device_measurements():
    
    from .utils import get_mearsurements

    data = request.get_json()
    import logging
    _logger = logging.getLogger(__name__)
    _logger.error(f"\n\n\nData: {data}")
    result = get_mearsurements(data)

    return jsonify(result), 200


# 7.4.5.12 Prescription And Procedure: Set Follow Up Examination Date
@app.route('/prescription_and_procedure/set_follow_up/<int:sessionID>', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def set_follow_up_date(sessionID):
    data = request.get_json()
    if not data or 'date' not in data:
        return jsonify({"message": "Missing 'date' field in request body."}), 400
    if not isinstance(data['date'], str):
        return jsonify({"message": "'date' must be a string."}), 400
    from flask_jwt_extended import get_jwt
    user_id = int(get_jwt()['user_id'])
    follow_up_date = data['date']
    from .utils import set_follow_up_date
    try:
        import logging
        _logger = logging.getLogger(__name__)
        _logger.info(f"Setting follow up date for session {sessionID} to {follow_up_date} by user {user_id}")
        set_follow_up_date(sessionID, follow_up_date, user_id)
    except Exception as e:
        import logging
        _logger = logging.getLogger(__name__)
        _logger.error(f"Error in set_follow_up_date: {str(e)}")
        return jsonify({"message": "Error in setting follow up date"}), 500
    return jsonify({"message": "Success"}), 200


# 7.4.5.14 Inpatient Monitoring: Get Event List (Uses inpatientID)
@app.route('/inpatient_monitoring/event_list/<int:inpatientID>', methods=['GET'])
@jwt_required()
@check_role(['doctor', 'nurse'])
def get_event_list(inpatientID):
    return jsonify({"message": "Success"}), 200




@app.route('/finalize_diagnosis/set_final_diagnosis/<int:sessionID>', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def set_final_diagnosis(sessionID):
    data = request.get_json()
    if not data or 'diagnosis' not in data:
        return jsonify({"message": "Missing 'diagnosis' field in request body."}), 400
    if not isinstance(data['diagnosis'], str):
        return jsonify({"message": "'diagnosis' must be a string."}), 400
    
    from .utils import set_final_diagnosis
    set_final_diagnosis(sessionID, data['diagnosis'])
    return jsonify({"message": "Success"}), 200


@app.route('/end_session/<int:sessionID>', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def end_session(sessionID):
    from .utils import end_session
    end_session(sessionID)
    return jsonify({"message": "Success"}), 200
    
    





