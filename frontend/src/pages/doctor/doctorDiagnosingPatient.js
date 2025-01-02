import "./style/doctorDiagnosingPatient.css"

import Header from '../../components/common/header';
import DoctorDiagnosingPatientContent from '../../components/doctor/doctorDiagnosingPatientContent';

function DoctorDiagnosingPatient({ symptoms, setSymptoms, preDiagnosis, setPreDiagnosis }) {
    return (
        <div className="doctorDiagnosingPatient">
            <Header />
            <DoctorDiagnosingPatientContent symptoms={symptoms} setSymptoms={setSymptoms} preDiagnosis={preDiagnosis} setPreDiagnosis={setPreDiagnosis} />
        </div>
    );
}

export default DoctorDiagnosingPatient;