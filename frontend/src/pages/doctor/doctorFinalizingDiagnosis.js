import "./style/doctorFinalizingDiagnosis.css"

import Header from '../../components/common/header';
import DoctorFinalizingDiagnosisContent from '../../components/doctor/doctorFinalizingDiagnosisContent';

function DoctorFinalizingDiagnosis() {
    return (
        <div className="doctorFinalizingDiagnosis">
            <Header />
            <DoctorFinalizingDiagnosisContent />
        </div>
    );
}

export default DoctorFinalizingDiagnosis;