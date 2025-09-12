from datetime import datetime
def get_todays_past_appointment_list():
    from app.database.models.appointments import Appointments
    from app.database.models.patients import Patients
    from app.database.models.users import Users
	
	
    
    past_appointments = Appointments.query.filter(
        Appointments.status == "Checked"
    ).all()
    
    return [
        {
            "name": appointment.patient.name,
            "status": appointment.status,
            "time": appointment.appointment_time.strftime("%H:%M")
        }
    	for appointment in past_appointments
    ]
