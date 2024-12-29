import PatientVitalSignsAndPhysicalMeasurements from '../smallerComponents/patientVitalSignsAndPhysicalMeasurements';

import './style/style.css';

function DoctorHomepageContentThirdRow() {
    return (
        <div className="thirdRow">
            <PatientVitalSignsAndPhysicalMeasurements />
        </div>
    );
}

export default DoctorHomepageContentThirdRow;