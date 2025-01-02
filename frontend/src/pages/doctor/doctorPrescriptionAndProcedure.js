import "./style/doctorFinalizingDiagnosis.css"

import Header from '../../components/common/header';
import DoctorPrescriptionAndProcedureContent from '../../components/doctor/doctorPrescriptionAndProcedureContent';

function DoctorPrescriptionAndProcedure({ symptoms, finalDiagnosis }) {
    return (
        <div className="doctorFinalizingDiagnosis">
            <Header />
            <DoctorPrescriptionAndProcedureContent symptoms={symptoms} finalDiagnosis={finalDiagnosis} />
        </div>
    );
}

export default DoctorPrescriptionAndProcedure;