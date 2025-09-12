def get_appointment_list():
    """Retrieves the list of appointments."""
    try:
        from ...database.models import Appointments
        appointments = Appointments.query.filter(
            Appointments.status != "Checked"
        ).all()
        
        return [{
            "name": appointment.patient.name,
            "dept": appointment.department,
            "time": appointment.appointment_time.strftime("%H:%M")
		}
             for appointment in appointments]
        
        
    except Exception as e:
        print(f"Error getting appointment list: {e}")
        import logging
        logging.getLogger(__name__).error(e)
        return []