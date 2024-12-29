import './style/style.css';

// Common Components
import Sidebar from '../common/sidebar';

// Doctor's Components
import DoctorDiagnosingPatientFirstRow from './doctorDiagnosingPatientContent_rows/firstRow';
import DoctorViewPassSessionContentSecondRow from './doctorViewPassSessionDetailsContent_rows/secondRow';

function DoctorViewPassSessionDetailsContent() {
    return (
        <div className="doctorHomepageContent">
            <Sidebar />
            <div className="mainContent">
                <DoctorDiagnosingPatientFirstRow />
                <DoctorViewPassSessionContentSecondRow />
            </div>
        </div>
    );
}

export default DoctorViewPassSessionDetailsContent;