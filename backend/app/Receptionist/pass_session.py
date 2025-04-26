
from flask import jsonify




def pass_session(session_id):
    """
    This function will retrieve the detailed information of the session based on the session_id
    :param session_id:
    :return:
        json{
            'patient_information':
                json {
                    'name': 'John Doe',
                    'dob': '01/01/1990',
                    'phone': '123456789',
                    'ssn': '123456789',
                    'insurance_number': '123456789',
                    'job': 'Engineer',
                    'address': '123 Main',
                    'district': 'District 1',
                    'city': 'Ho Chi Minh',
                    'country': 'Vietnam',
                },
            patient_vital_sign:
                json{
                    height: int,
                    weight: int,
                    blood_pressure: int,
                    pulse: int,
                    breathing_rate:int,
                    temperature: int,
                },
            patient_test_result:
                array[
                    json{
                        type: str,
                        status: str,
                        result_id: str,
                    }
                ],
            patient_symptom and diagnosis:
                json{
                    symptom: str,
                    diagnosis: str,
                },
            prescriptions:
                array[
                    json{
                        medicine: str,
                        am: int,
                        noon: int,
                        pm: int,
                        duration:int,
                    },
                    ...
                ],
            procedures:
                array[
                    json{
                        procedure: str,
                        date: str,
                    },
                    ...
                ],

        }
    """

    return jsonify(
        {
            'patient_information': {
                'name': 'John Doe',
                'dob': '01/01/1990',
                'phone': '123456789',
                'ssn': '123456789',
                'insurance_number': '123456789',
                'job': 'Engineer',
                'address': '123 Main',
                'district': 'District 1',
                'city': 'Ho Chi Minh',
                'country': 'Vietnam',
            },
            'patient_vital_sign': {
                'height': 170,
                'weight': 70,
                'blood_pressure': 120,
                'pulse': 80,
                'breathing_rate': 20,
                'temperature': 37,
            },
            'patient_test_result': [
                {
                    'type': 'Blood test',
                    'status': 'Done',
                    'result_id': '123456789',
                },
                {
                    'type': 'Urine test',
                    'status': 'Done',
                    'result_id': '123456789',
                },
                {
                    'type': 'X-ray',
                    'status': 'Done',
                    'result_id': '123456789',
                },
            ],
            'patient_symptom and diagnosis': {
                'symptom': 'Fever',
                'diagnosis': 'Flu',
            },
            'prescriptions': [
                {
                    'medicine': 'Paracetamol',
                    'am': 1,
                    'noon': 1,
                    'pm': 1,
                    'duration': 7,
                },
                {
                    'medicine': 'Ibuprofen',
                    'am': 1,
                    'noon': 1,
                    'pm': 1,
                    'duration': 7,
                },
            ],
            'procedures': [
                {
                    'procedure': 'Blood test',
                    'date': '01/01/2020',
                },
                {
                    'procedure': 'Urine test',
                    'date': '01/01/2020',
                },
                {
                    'procedure': 'X-ray',
                    'date': '01/01/2020',
                },
            ],

    },status=200,mimetypes='application/json')






