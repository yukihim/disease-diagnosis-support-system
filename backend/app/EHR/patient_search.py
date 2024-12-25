
from flask import jsonify
def patient_search(ssn, insurance_number):
    """
    This function search for patient based on ssn or insurance number
    :Header: Authorization: Bearer access_token
    :param ssn: str
    :param insurance_number: str
    :return:
        array[
            json{
                patient_name : str,
                ssn: str,
                insurance_number: str,
                patient_id: int
            },
            ...
        ]

    """
    # test data of 6 patients
    return jsonify(
        {
            'patient_lists':
                [
                    {
                        'patient_name': 'John Doe',
                        'ssn': '123456789',
                        'insurance_number': '123456789',
                        'patient_id': 1
                    },
                    {
                        'patient_name': 'Jane Doe',
                        'ssn': '987654321',
                        'insurance_number': '987654321',
                        'patient_id': 2
                    },
                    {
                        'patient_name': 'John Smith',
                        'ssn': '123456789',
                        'insurance_number': '123456789',
                        'patient_id': 3
                    },
                    {
                        'patient_name': 'Jane Smith',
                        'ssn': '987654321',
                        'insurance_number': '987654321',
                        'patient_id': 4
                    },
                    {
                        'patient_name': 'John Doe',
                        'ssn': '123456789',
                        'insurance_number': '123456789',
                        'patient_id': 5
                    },
                    {
                        'patient_name': 'Jane Doe',
                        'ssn': '987654321',
                        'insurance_number': '987654321',
                        'patient_id': 6
                    }
                ]
        },status=200,mimetypes='application/json')
