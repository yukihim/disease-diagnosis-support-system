import './style/style.css';

// Common Components
import Sidebar from '../common/sidebar';

// Doctor's Components
import DoctorHomepageContentFirstRow from './doctorHomepageContent_rows/firstRow';
import DoctorHomepageContentSecondRow from './doctorHomepageContent_rows/secondRow';

function DoctorHomepageContent() {
    return (
        <div className="doctorHomepageContent">
            <Sidebar />
            <div className="mainContent">
                <div className="welcomeText">Welcome Doctor abc</div>

                <DoctorHomepageContentFirstRow />
                <DoctorHomepageContentSecondRow />
            </div>
        </div>
    );
}

export default DoctorHomepageContent;