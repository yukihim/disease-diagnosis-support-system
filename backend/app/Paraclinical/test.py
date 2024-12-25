from flask import jsonify
def get_test(test_id):
    """
    This function will get the overall of the test
    :param test_id:
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
            test_info:
                json{
                    test_type: str,
                    sent_from: str,
                    prognosis: str,
                    status: str,
                }
        }
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
                    'nearest_date_diagnosed': '01/01/2019',
                    'status': 'Active',
                },
                {
                    'condition': 'Hypertension',
                    'severity': 'Low',
                    'nearest_date_diagnosed': '01/01/2019',
                    'status': 'Active',
                },
            ],
            'pass_sessions': [
                {
                    'session_date': '01/01/2020',
                    'session_type': 'General',
                    'doctor': 'Dr. Smith',
                    'hospital': 'Hospital 1',
                    'outcome': 'Good',
                    'session_id': 1,
                },
                {
                    'session_date': '01/01/2020',
                    'session_type': 'General',
                    'doctor': 'Dr. Smith',
                    'hospital': 'Hospital 1',
                    'outcome': 'Good',
                    'session_id': 2,
                },
            ],
            'test_info': {
                'test_type': 'Blood Test',
                'sent_from': 'Hospital 2',
                'prognosis': 'Good',
                'status': 'Pending',
            }
        },status=200, mimetype='application/json')


def get_detailed_test(test_id):
    """
    This function will get the detailed information of the test
    :param test_id:
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
            test_info:
                json{
                    test_type: str,
                    sent_from: str,
                    prognosis: str,
                    status: str,
                }
            test_result:{
                result: this can be vary based on the test type
                for example: blood test:
                    json{
                        parameters: [
                            {
                                name: 'white_blood_cell',
                                value: int,
                                remarks: str,
                            },
                            {
                                name: 'red_blood_cell',
                                value: int,
                                remarks: str,
                            },
                            {
                                name: 'hemoglobin',
                                value: int,
                                remarks: str,
                            },
                            {
                                name: 'platelet',
                                value: int,
                                remarks: str,
                            },
                            {
                                name: 'mean_corpuscular_volume',
                                value: int,
                                remarks: str,
                            },
                            {
                                name: 'mean_corpuscular_hemoglobin',
                                value: int,
                                remarks: str,
                            },
                            {
                                name: 'mean_corpuscular_hemoglobin_concentration',
                                value: int,
                                remarks: str,
                            },
                            {
                                name: 'mean_platelet_volume',
                                value: int,
                                remarks: str,
                            }
                        ]

                    }
            }
    }
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
                'nearest_date_diagnosed': '01/01/2019',
                'status': 'Active',
            },
            {
                'condition': 'Hypertension',
                'severity': 'Low',
                'nearest_date_diagnosed': '01/01/2019',
                'status': 'Active',
            },
        ],
        'pass_sessions': [
            {
                'session_date': '01/01/2020',
                'session_type': 'General',
                'doctor': 'Dr. Smith',
                'hospital': 'Hospital 1',
                'outcome': 'Good',
                'session_id': 1,
            },
            {
                'session_date': '01/01/2020',
                'session_type': 'General',
                'doctor': 'Dr. Smith',
                'hospital': 'Hospital 1',
                'outcome': 'Good',
                'session_id': 2,
            },
        ],
        'test_info': {
            'test_type': 'Blood Test',
            'sent_from': 'Hospital 2',
            'prognosis': 'Good',
            'status': 'Pending',
        },

        'test_result': {
            'parameters': [
                {
                    'name': 'white_blood_cell',
                    'value': 100,
                    'remarks': 'Normal',
                },
                {
                    'name': 'red_blood_cell',
                    'value': 100,
                    'remarks': 'Normal',
                },
                {
                    'name': 'hemoglobin',
                    'value': 100,
                    'remarks': 'Normal',
                },
                {
                    'name': 'platelet',
                    'value': 100,
                    'remarks': 'Normal',
                },
                {
                    'name': 'mean_corpuscular_volume',
                    'value': 100,
                    'remarks': 'Normal',
                },
                {
                    'name': 'mean_corpuscular_hemoglobin',
                    'value': 100,
                    'remarks': 'Normal',
                },
                {
                    'name': 'mean_corpuscular_hemoglobin_concentration',
                    'value': 100,
                    'remarks': 'Normal',
                },
                {
                    'name': 'mean_platelet_volume',
                    'value': 100,
                    'remarks': 'Normal',
                }
            ]
        }
    }, status=200, mimetype='application/json')