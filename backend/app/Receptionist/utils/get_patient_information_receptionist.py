def get_patient_information_receptionist(patientID):
    from ...database.models import Patients
    from datetime import datetime
    patient = Patients.query.filter_by(id=patientID).first()
    
    ans = {
        'name': patient.name,
        'gender': patient.gender,
        'phone': patient.phone,
        'ssn': patient.ssn,
        'height': patient.height,
        'weight': patient.weight,
        'address': f"{patient.street}, {patient.district}, {patient.city}",
        'hic': patient.health_insurance_number,
        'job': patient.job,
        'dob': patient.date_of_birth.strftime('%Y-%m-%d'),
        'age': datetime.today().year - patient.date_of_birth.year - ((datetime.today().month, datetime.today().day) < (patient.date_of_birth.month, patient.date_of_birth.day)),
        # 'type': patient.type
        
    }
    return ans
