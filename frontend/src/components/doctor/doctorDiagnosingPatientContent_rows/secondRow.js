import './style/style.css';

import PatientPassCondition from '../smallerComponents/patientPassCondition';
import PatientPassSession from '../smallerComponents/patientPassSession';   

function DoctorHomepageContentSecondRow() {
    return (
        <div className="secondRow">
            <PatientPassCondition />
            <PatientPassSession />
        </div>
    );
}

export default DoctorHomepageContentSecondRow;