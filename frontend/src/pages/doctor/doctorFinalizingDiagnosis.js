import "./style/doctorFinalizingDiagnosis.css"

import Header from '../../components/common/header';
import DoctorFinalizingDiagnosisContent from '../../components/doctor/doctorFinalizingDiagnosisContent';

function DoctorFinalizingDiagnosis({ symptoms, preDiagnosis, finalDiagnosis, setFinalDiagnosis }) {
    return (
        <div className="doctorFinalizingDiagnosis">
            <Header />
            <DoctorFinalizingDiagnosisContent symptoms={symptoms} preDiagnosis={preDiagnosis} finalDiagnosis={finalDiagnosis} setFinalDiagnosis={setFinalDiagnosis} />
        </div>
    );
}

export default DoctorFinalizingDiagnosis;