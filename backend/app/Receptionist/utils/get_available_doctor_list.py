
def get_available_doctor_list():
    from app.database.models.users import Users
    from app.database.models.appointments import Appointments
    
    # Get all doctors
    
    doctors = Users.query.filter(
        Users.role == 'doctor',
    ).all()
    
    return [
        {
            "name": doctor.name,
            "role": doctor.specialization,
        }
        for doctor in doctors
    ]
        