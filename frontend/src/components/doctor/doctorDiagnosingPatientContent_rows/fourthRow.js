import PatientSymptoms from '../smallerComponents/patientSymptoms';

import './style/style.css';

function DoctorHomepageContentFourthRow({ symptoms, setSymptoms, preDiagnosis, setPreDiagnosis }) {
    return (
        <div className="fourthRow">
            <PatientSymptoms symptoms={symptoms} setSymptoms={setSymptoms} preDiagnosis={preDiagnosis} setPreDiagnosis={setPreDiagnosis}/>
        </div>
    );
}

export default DoctorHomepageContentFourthRow;