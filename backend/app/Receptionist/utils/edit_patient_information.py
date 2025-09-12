def edit_patient_information(patientID, input_data):
	from ...database.models import Patients
	from ...database import db
	patient = Patients.query.filter_by(id=patientID).first()
	
	patient.name = input_data['name']
	patient.date_of_birth = input_data['dob']
	patient.gender = input_data['gender']
	patient.phone = input_data['phone']
	patient.ssn = input_data['ssn']
	patient.health_insurance_number = input_data['hic']
	patient.height = input_data['height']
	patient.weight = input_data['weight']
	patient.job = input_data['job']
	patient.address = input_data['address']

	db.session.commit()
	