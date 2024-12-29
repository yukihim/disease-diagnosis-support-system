import PatientVitalSignsAndPhysicalMeasurementsWithoutEdit from '../smallerComponents/patientVitalSignsAndPhysicalMeasurementsWithoutEdit';
import PatientTestResult from '../smallerComponents/patientTestResult';

import '../doctorDiagnosingPatientContent_rows/style/style.css';

function DoctorViewPassSessionContentSecondRow() {
    return (
        <div className="thirdRow">
            <PatientVitalSignsAndPhysicalMeasurementsWithoutEdit />
            <PatientTestResult />
        </div>
    );
}

export default DoctorViewPassSessionContentSecondRow;