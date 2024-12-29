import "./style/doctorHomepage.css"

import Header from '../../components/common/header';
import DoctorHomepageContent from '../../components/doctor/doctorHomepageContent';

function DoctorPrescriptionAndProcedure() {
    return (
        <div className="doctorHomepage">
            <Header />
            <DoctorHomepageContent />
        </div>
    );
}

export default DoctorPrescriptionAndProcedure;