import "./style/doctorDiagnosingPatient.css"

import Header from '../../components/common/header';
import DoctorDiagnosingPatientContent from '../../components/doctor/doctorDiagnosingPatientContent';

function DoctorDiagnosingPatient() {
    return (
        <div className="doctorDiagnosingPatient">
            <Header />
            <DoctorDiagnosingPatientContent />
        </div>
    );
}

export default DoctorDiagnosingPatient;