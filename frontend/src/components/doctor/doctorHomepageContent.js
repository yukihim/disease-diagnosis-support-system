import './style/style.css';

// Common Components
import Sidebar from '../common/sidebar';


// First row
import IncomingPatient from './smallerComponents/incomingPatient/incomingPatient';
import PatientSentForParaclinicalTest from './smallerComponents/patientSentForParaclinicalTest/patientSentForParaclinicalTest';
import Calendar from './../common/calendar';


// Second row
import MonitoringInpatient from './smallerComponents/monitoringInpatient/monitoringInpatient';
import TodaysAppointment from './smallerComponents/todaysAppointment/todaysAppointment';

function DoctorHomepageContent() {
    return (
        <div className="doctorHomepageContent">
            <Sidebar />
            <div className="mainContent">
                <div className="welcomeText">Welcome Doctor abc</div>

                {/* <DoctorHomepageContentFirstRow />
                <DoctorHomepageContentSecondRow /> */}

                {/* First row */}
                <IncomingPatient />
                <PatientSentForParaclinicalTest />
                <Calendar />
                
                {/* Second row */}
                <MonitoringInpatient />
                <TodaysAppointment />
            </div>
        </div>
    );
}

export default DoctorHomepageContent;