import PatientVitalSignsAndPhysicalMeasurements from '../smallerComponents/patientVitalSignsAndPhysicalMeasurements';
import PatientTestResult from '../smallerComponents/patientTestResult';

import './style/style.css';

function DoctorHomepageContentThirdRow() {
    return (
        <div className="thirdRow">
            <PatientVitalSignsAndPhysicalMeasurements />
            <PatientTestResult />
        </div>
    );
}

export default DoctorHomepageContentThirdRow;