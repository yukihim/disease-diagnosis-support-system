import './style/style.css';

// Common Components
import Sidebar from '../common/sidebar';

// Doctor's Components
import DoctorDiagnosingPatientFirstRow from './doctorDiagnosingPatientContent_rows/firstRow';
import DoctorDiagnosingPatientSecondRow from './doctorDiagnosingPatientContent_rows/secondRow';

function DoctorDiagnosingPatientContent() {
    return (
        <div className="doctorHomepageContent">
            <Sidebar />
            <div className="mainContent">
                <DoctorDiagnosingPatientFirstRow />
                <DoctorDiagnosingPatientSecondRow />
            </div>
        </div>
    );
}

export default DoctorDiagnosingPatientContent;