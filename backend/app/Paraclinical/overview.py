
from flask import jsonify

def get_overview():
    """
        This function obtained overview for paraclinical department

        :param: None
        :return:
            json{
                patient_list: array[
                    json{
                        patient_name: str,
                        age: int,
                        gender: str,
                        test_name: str,
                        sent_from: str,
                        status: str,
                    },
                    ...
                ],
                patient_overview:{
                    total: int,
                    on_going: int,
                    done: int,
                    waiting: int,
                },

                appoinment_list: array[
                    json{
                        time: str,
                        patient: str,
                        status: str,
                    },
                    ...
                ],
            }
    """
    # test data of 6 patients comming, 5 appoiment
    return jsonify(
        {
            "patient_list": [
                {
                    "patient_name": "John Doe",
                    "age": 34,
                    "gender": "Male",
                    "test_name": "Blood Test",
                    "sent_from": "Emergency Room",
                    "status": "On-going"
                },
                {
                    "patient_name": "Jane Smith",
                    "age": 27,
                    "gender": "Female",
                    "test_name": "X-Ray",
                    "sent_from": "Outpatient",
                    "status": "Waiting"
                },
                {
                    "patient_name": "Emily Johnson",
                    "age": 45,
                    "gender": "Female",
                    "test_name": "MRI",
                    "sent_from": "Neurology Department",
                    "status": "Done"
                },
                {
                    "patient_name": "Michael Brown",
                    "age": 52,
                    "gender": "Male",
                    "test_name": "CT Scan",
                    "sent_from": "Cardiology Department",
                    "status": "Waiting"
                },
                {
                    "patient_name": "Sarah Wilson",
                    "age": 30,
                    "gender": "Female",
                    "test_name": "Ultrasound",
                    "sent_from": "Gynecology Department",
                    "status": "On-going"
                },
                {
                    "patient_name": "David Taylor",
                    "age": 60,
                    "gender": "Male",
                    "test_name": "EKG",
                    "sent_from": "Emergency Room",
                    "status": "Done"
                }
            ],
            "patient_overview": {
                "total": 6,
                "on_going": 2,
                "done": 2,
                "waiting": 2
            },
            "appointment_list": [
                {
                    "time": "2024-12-24T10:00:00",
                    "patient": "John Doe",
                    "status": "Checked-in"
                },
                {
                    "time": "2024-12-24T11:30:00",
                    "patient": "Jane Smith",
                    "status": "Waiting"
                },
                {
                    "time": "2024-12-24T12:00:00",
                    "patient": "Emily Johnson",
                    "status": "Checked-in"
                },
                {
                    "time": "2024-12-24T13:45:00",
                    "patient": "Michael Brown",
                    "status": "Scheduled"
                },
                {
                    "time": "2024-12-24T14:30:00",
                    "patient": "Sarah Wilson",
                    "status": "Checked-in"
                }
            ]
        }, status=200, mimetypes="application/json")

