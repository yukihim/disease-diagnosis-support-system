import './style/style.css';

// import PatientVitalSignsAndPhysicalMeasurements from '../smallerComponents/patientVitalSignsAndPhysicalMeasurements';
// import PatientTestResult from '../smallerComponents/patientTestResult';

import PatientSymptomsFinalizing from '../smallerComponents/patientSymptomsFinalizing';

function DoctorFinalizingDiagnosisContentThirdRow() {
    return (
        <div className="thirdRow">
            <PatientSymptomsFinalizing />
        </div>
    );
}

export default DoctorFinalizingDiagnosisContentThirdRow;