
from flask import jsonify


def get_department_list():
    pass

def get_doctor_list(department_id):
    pass

def check_in(patient_id,reason_to_come,department,doctor):
    """
    This function will check in the patient
    :param patient_id: patient_id
    :param reason_to_come: reason_patient_comming
    :param department: department_id
    :param doctor: docker_id
    :return: None
    """

    return jsonify({}, 200,mimetypes='application/json')
