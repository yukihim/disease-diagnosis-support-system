import MonitoringInpatient from '../smallerComponents/monitoringInpatient';
import TodaysAppointment from '../smallerComponents/todaysAppointment';

import './style/style.css';

function DoctorHomepageContentSecondRow() {
    return (
        <div className="secondRow">
            <MonitoringInpatient />
            <TodaysAppointment />
        </div>
    );
}

export default DoctorHomepageContentSecondRow;