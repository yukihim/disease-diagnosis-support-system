import "./style/doctorFinalizingDiagnosis.css"

import Header from '../../components/common/header';
import DoctorPrescriptionAndProcedureContent from '../../components/doctor/doctorPrescriptionAndProcedureContent';

function DoctorPrescriptionAndProcedure() {
    return (
        <div className="doctorFinalizingDiagnosis">
            <Header />
            <DoctorPrescriptionAndProcedureContent />
        </div>
    );
}

export default DoctorPrescriptionAndProcedure;