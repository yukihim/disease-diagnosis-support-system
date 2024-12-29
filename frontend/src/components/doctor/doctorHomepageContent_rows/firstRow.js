import IncomingPatient from '../smallerComponents/incomingPatient';
import PatientSentForParaclinicalTest from '../smallerComponents/patientSentForParaclinicalTest';
import Calendar from '../../common/calendar';

import './style/style.css';

function DoctorHomepageContentFirstRow() {
    return (
        <div className="firstRow">
            <IncomingPatient />
            <PatientSentForParaclinicalTest />
            <Calendar />
        </div>
    );
}

export default DoctorHomepageContentFirstRow;