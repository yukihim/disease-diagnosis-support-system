import PatientInformation from '../smallerComponents/patientInformation';

import './style/style.css';

function DoctorHomepageContentFirstRow() {
    return (
        <div className="firstRow">
            <PatientInformation />
        </div>
    );
}

export default DoctorHomepageContentFirstRow;