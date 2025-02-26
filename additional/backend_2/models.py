from app import db
import datetime
from sqlalchemy.dialects.postgresql import JSONB

# -----------------------------
# User Model
# -----------------------------
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # Password should be stored hashed.
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100))
    role = db.Column(db.String(50))  # e.g., Admin, Physician, Nurse, Paraclinical Technician, etc.
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.utcnow)
    
    # Relationship to diagnoses if the user is a doctor.
    diagnoses = db.relationship('Diagnosis', backref='doctor', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

# -----------------------------
# Patient Model
# -----------------------------
class Patient(db.Model):
    __tablename__ = 'patients'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    ssn = db.Column(db.String(20), unique=True)
    insurance_number = db.Column(db.String(20), unique=True)
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.String(10))
    contact = db.Column(db.String(20))
    address = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    ehr_records = db.relationship('EHRRecord', backref='patient', lazy=True)
    checkins = db.relationship('CheckIn', backref='patient', lazy=True)
    paraclinical_tests = db.relationship('ParaclinicalTest', backref='patient', lazy=True)
    diagnoses = db.relationship('Diagnosis', backref='patient', lazy=True)
    appointments = db.relationship('Appointment', backref='patient', lazy=True)

    def __repr__(self):
        return f'<Patient {self.first_name} {self.last_name}>'

# -----------------------------
# Electronic Health Record (EHR) Model
# -----------------------------
class EHRRecord(db.Model):
    __tablename__ = 'ehr_records'
    
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    medical_history = db.Column(db.Text)       # Detailed history (e.g., past diagnoses, treatments)
    medications = db.Column(db.Text)           # Current medications, if any
    allergies = db.Column(db.Text)             # Allergies information
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return f'<EHRRecord for Patient ID {self.patient_id}>'

# -----------------------------
# Check-In Model
# -----------------------------
class CheckIn(db.Model):
    __tablename__ = 'checkins'
    
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    reason_to_come = db.Column(db.String(200))
    department = db.Column(db.String(50))
    doctor = db.Column(db.String(100))  # Alternatively, store doctor_id as a foreign key if needed.
    check_in_time = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return f'<CheckIn Patient ID {self.patient_id} at {self.check_in_time}>'

# -----------------------------
# Paraclinical Test Model
# -----------------------------
class ParaclinicalTest(db.Model):
    __tablename__ = 'paraclinical_tests'
    
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    test_type = db.Column(db.String(100))  # e.g., blood test, imaging, etc.
    test_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # One-to-one relationship with TestResult (assuming one detailed result per test)
    test_result = db.relationship('TestResult', backref='paraclinical_test', uselist=False)

    def __repr__(self):
        return f'<ParaclinicalTest {self.test_type} for Patient ID {self.patient_id}>'

# -----------------------------
# Test Result Model
# -----------------------------
class TestResult(db.Model):
    __tablename__ = 'test_results'
    
    id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.Integer, db.ForeignKey('paraclinical_tests.id'), nullable=False)
    result_data = db.Column(JSONB)  # Store detailed test result data as JSON.
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return f'<TestResult for Test ID {self.test_id}>'

# -----------------------------
# Diagnosis Model
# -----------------------------
class Diagnosis(db.Model):
    __tablename__ = 'diagnoses'
    
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    symptoms = db.Column(JSONB)          # Store a list of symptoms (e.g., [{"id":1, "name":"fever"}])
    final_diagnosis = db.Column(db.String(255))
    prescriptions = db.Column(JSONB)       # List of prescriptions (could be expanded into a separate model)
    treatments = db.Column(JSONB)          # List of treatments (could be expanded into a separate model)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return f'<Diagnosis for Patient ID {self.patient_id} by Doctor ID {self.doctor_id}>'

# -----------------------------
# Appointment Model
# -----------------------------
class Appointment(db.Model):
    __tablename__ = 'appointments'
    
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    appointment_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    status = db.Column(db.String(50))  # e.g., scheduled, completed, cancelled

    def __repr__(self):
        return f'<Appointment for Patient ID {self.patient_id} on {self.appointment_date}>'
