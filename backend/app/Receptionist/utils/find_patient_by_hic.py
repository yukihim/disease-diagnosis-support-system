def find_patient_by_hic(query_hic):
    from ...database.models import Patients
    patients = Patients.query.filter(Patients.hic.like(f"{query_hic}%")).all()
    return [
        {
			"patientName": patient.name,
			"ssn": patient.ssn,
			"hic": patient.hic,
            "patientID": patient.id
            
        }
		for patient in patients
    ]