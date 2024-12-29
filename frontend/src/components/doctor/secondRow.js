import MonitoringInpatient from './smallerComponents/monitoringInpatient';
import TodaysAppointment from './smallerComponents/todaysAppointment';

function DoctorHomepageContentSecondRow() {
    return (
        <div className="secondRow">
            <MonitoringInpatient />
            <TodaysAppointment />
        </div>
    );
}

export default DoctorHomepageContentSecondRow;