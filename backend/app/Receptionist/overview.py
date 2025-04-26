from flask import jsonify,request

def get_overview():
    """
    This function will return the overview of the EHR system
    :Header: Authorization: Bearer access_token
    :param: None
    :return:
        json{
            patient_overview: json{
                total: int,
                on_going: int,
                done: int,
            },
            appointment_overview: json{
                total: int,
                confirmed: int,
                pending: int,
                rejected:int,
            },
            appointment_list: array[
                json{
                    time: str,
                    patient: str,
                    type: str,
                    status: str,
                },
                ...
            ],
            appointment_behavior: array[
                json{
                    no_show: int,
                    re-schedule: int,
                    attended:int,
                    time: str,
                },
                ...
            ],
            available_doctor: array[
                json{
                    name: str,
                    ava_path: str
                },
                ...
            ],

        }
    """




    return jsonify({
            'patient_overview': {
                'total': 100,
                'on_going': 50,
                'done': 50,
            },
            'appointment_overview': {
                'total': 100,
                'confirmed': 50,
                'pending': 30,
                'rejected': 20,
            },
            'appointment_list': [
                {
                    'time': '2021-10-10 10:00',
                    'patient': 'John Doe',
                    'type': 'General Checkup',
                    'status': 'Confirmed',
                },
                {
                    'time': '2021-10-10 11:00',
                    'patient': 'Jane Doe',
                    'type': 'General Checkup',
                    'status': 'Pending',
                },
                {
                    'time': '2021-10-10 12:00',
                    'patient': 'John Doe',
                    'type': 'General Checkup',
                    'status': 'Rejected',
                },
            ],
            'appointment_behavior': [
                {
                    'no_show': 10,
                    're-schedule': 10,
                    'attended': 30,
                    'time': '2021-10-10',
                },
                {
                    'no_show': 5,
                    're-schedule': 5,
                    'attended': 20,
                    'time': '2021-10-11',
                },
            ],
            'available_doctor': [
                {
                    'name': 'Dr. John Doe',
                    'ava_path': 'path/to/ava'
                },
                {
                    'name': 'Dr. Jane Doe',
                    'ava_path': 'path/to/ava'
                },
            ],
    },status=200, mimetype='application/json')