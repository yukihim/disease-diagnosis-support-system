from flask import jsonify
def get_patient_ehr(patient_id):
    """
    This function will return the EHR of the patient
    :Header: Authorization: Bearer access_token
    :param ssn: str
    :return:
        json{
            patient_information:
                json{
                    name: str,
                    dob: str,
                    gender: str,
                    phone: str,
                    ssn: str,
                    insurance_number: str,
                    job: str,
                    address: str,
                    district: str,
                    city: str,
                    country: str,
                }
            pass_conditions: array[
                json{
                    condition: str,
                    severity: str,
                    nearest_date_diagnosed: str,
                    status: str,
                },
                ...
            ],
            pass_sessions: array[
                json{
                    session_date: str,
                    session_type: str,
                    doctor: str,
                    hospital: str,
                    outcome: str,
                    session_id: int,
                },
                ...
            ],
    """

    return jsonify({
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
            'pass_conditions': [
                {
                    'condition': 'Diabetes',
                    'severity': 'High',
                    'nearest_date_diagnosed': '01/01/2020',
                    'status': 'On going',
                },
                {
                    'condition': 'Hypertension',
                    'severity': 'Medium',
                    'nearest_date_diagnosed': '01/01/2020',
                    'status': 'On going',
                },
                {
                    'condition': 'Cancer',
                    'severity': 'High',
                    'nearest_date_diagnosed': '01/01/2020',
                    'status': 'Done',
                },
                {
                    'condition': 'Flu',
                    'severity': 'Low',
                    'nearest_date_diagnosed': '01/01/2020',
                    'status': 'Done',
                },
            ],

            'pass_sessions': [
                {
                    'session_date': '01/01/2020',
                    'session_type': 'General check up',
                    'doctor': 'Dr. John',
                    'hospital': 'Hospital A',
                    'outcome': 'Good',
                    'session_id': 1,
                },
                {
                    'session_date': '01/01/2020',
                    'session_type': 'General check up',
                    'doctor': 'Dr. John',
                    'hospital': 'Hospital A',
                    'outcome': 'Good',
                    'session_id': 2,
                },
                {
                    'session_date': '01/01/2020',
                    'session_type': 'General check up',
                    'doctor': 'Dr. John',
                    'hospital': 'Hospital A',
                    'outcome': 'Good',
                    'session_id': 3,
                },
                {
                    'session_date': '01/01/2020',
                    'session_type': 'General check up',
                    'doctor': 'Dr. John',
                    'hospital': 'Hospital A',
                    'outcome': 'Good',
                    'session_id': 4,
                },
            ],
    },status=200, mimetype='application/json')
