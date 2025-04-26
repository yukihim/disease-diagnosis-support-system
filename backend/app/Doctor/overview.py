
from flask import jsonify

def get_overview():
    """
    This function will get the overview of the patient
    :return:
        json{
            incomming_patient_list: array[
                json{
                    patient_name: str,
                    gender: str,
                    age: int,
                    condition: str,
                },
                ...
            ],
            paraclinical_patient_list: array[
                json{
                    name: str,
                    gender: str,
                    age: int,
                    test_type: str,
                    status: str,
                },
                ...
            ],
            inpatient_list: array[
                json{
                    name: str,
                    gender: str,
                    age: int,
                    room: str,
                    admission_date: str,
                    condition: str,
                    status, str,
                },
                ...
            ],

            appointment_list: array
            [
                json{
                    time: str,
                    name: str,
                    status: str,
                },
                ...
            ]

        }
    """
    return jsonify(
        {
            "incomming_patient_list": [
                {
                    "patient_name": "John Doe",
                    "gender": "Male",
                    "age": 45,
                    "condition": "Chest Pain"
                },
                {
                    "patient_name": "Jane Smith",
                    "gender": "Female",
                    "age": 32,
                    "condition": "High Fever"
                },
                {
                    "patient_name": "Michael Brown",
                    "gender": "Male",
                    "age": 60,
                    "condition": "Shortness of Breath"
                },
                {
                    "patient_name": "Emily Davis",
                    "gender": "Female",
                    "age": 29,
                    "condition": "Severe Headache"
                },
                {
                    "patient_name": "David Wilson",
                    "gender": "Male",
                    "age": 50,
                    "condition": "Dizziness"
                }
            ],
            "paraclinical_patient_list": [
                {
                    "name": "Sarah Johnson",
                    "gender": "Female",
                    "age": 40,
                    "test_type": "Blood Test",
                    "status": "Completed"
                },
                {
                    "name": "Robert White",
                    "gender": "Male",
                    "age": 65,
                    "test_type": "CT Scan",
                    "status": "Pending"
                },
                {
                    "name": "Laura Moore",
                    "gender": "Female",
                    "age": 28,
                    "test_type": "MRI",
                    "status": "In Progress"
                },
                {
                    "name": "James Taylor",
                    "gender": "Male",
                    "age": 55,
                    "test_type": "X-Ray",
                    "status": "Completed"
                }
            ],
            "inpatient_list": [
                {
                    "name": "Alice Green",
                    "gender": "Female",
                    "age": 70,
                    "room": "102B",
                    "admission_date": "2024-12-20",
                    "condition": "Pneumonia",
                    "status": "Stable"
                },
                {
                    "name": "Henry Baker",
                    "gender": "Male",
                    "age": 48,
                    "room": "205A",
                    "admission_date": "2024-12-19",
                    "condition": "Kidney Failure",
                    "status": "Critical"
                },
                {
                    "name": "Olivia Adams",
                    "gender": "Female",
                    "age": 35,
                    "room": "306C",
                    "admission_date": "2024-12-18",
                    "condition": "Fractured Leg",
                    "status": "Recovering"
                }
            ],
            "appointment_list": [
                {
                    "time": "2024-12-26 09:00",
                    "name": "William Harris",
                    "status": "Confirmed"
                },
                {
                    "time": "2024-12-26 10:30",
                    "name": "Sophia Clark",
                    "status": "Pending"
                },
                {
                    "time": "2024-12-26 11:15",
                    "name": "Noah Lewis",
                    "status": "Cancelled"
                },
                {
                    "time": "2024-12-26 13:00",
                    "name": "Isabella Walker",
                    "status": "Confirmed"
                }
            ]
        }, status=200, mimetype='application/json'
    )
