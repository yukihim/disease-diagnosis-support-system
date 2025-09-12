def find_patient_by_ssn(query_ssn):
	from ...database.models import Patients
    # find patient by query_ssn (may be in ssn)
	patients = Patients.query.filter(Patients.ssn.like(f"{query_ssn}%")).all()
	import logging
	logging.error(f"Found {len(patients)} patients with ssn starting with {query_ssn}")

	return [
        {
            "patientName": patient.name,
            "ssn": patient.ssn,
            "hic": patient.health_insurance_number,
			"patientID": patient.id
		}
		for patient in patients
	]
    
