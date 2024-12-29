import "./style/doctorDiagnosingPatient.css"

import Header from '../../components/common/header';
import DoctorViewPassSessionDetailsContent from '../../components/doctor/doctorViewPassSessionDetailsContent';

function DoctorViewPassSessionDetails() {
    return (
        <div className="doctorDiagnosingPatient">
            <Header />
            <DoctorViewPassSessionDetailsContent />
        </div>
    );
}

export default DoctorViewPassSessionDetails;