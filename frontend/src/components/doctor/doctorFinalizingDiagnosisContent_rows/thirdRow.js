import './style/style.css';

// import PatientVitalSignsAndPhysicalMeasurements from '../smallerComponents/patientVitalSignsAndPhysicalMeasurements';
// import PatientTestResult from '../smallerComponents/patientTestResult';

import PatientSymptomsFinalizing from '../smallerComponents/patientSymptomsFinalizing';

function DoctorFinalizingDiagnosisContentThirdRow({ symptoms, preDiagnosis, finalDiagnosis, setFinalDiagnosis }) {
    return (
        <div className="thirdRow">
            <PatientSymptomsFinalizing symptoms={symptoms} preDiagnosis={preDiagnosis} finalDiagnosis={finalDiagnosis} setFinalDiagnosis={setFinalDiagnosis} />
        </div>
    );
}

export default DoctorFinalizingDiagnosisContentThirdRow;