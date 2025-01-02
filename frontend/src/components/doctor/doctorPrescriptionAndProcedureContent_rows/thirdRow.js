import './style/style.css';

import PatientSymptomsFinalized from '../smallerComponents/patientSymptomsFinalized';

function DoctorPrescriptionAndProcedureContentThirdRow({ symptoms, finalDiagnosis }) {
    return (
        <div className="thirdRow">
            <PatientSymptomsFinalized symptoms={symptoms} finalDiagnosis={finalDiagnosis} />
        </div>
    );
}

export default DoctorPrescriptionAndProcedureContentThirdRow;