import './style/doctorHomepageContent.css';

// Common Components
import Sidebar from '../common/sidebar';

// Doctor's Components
import DoctorHomepageContentFirstRow from './firstRow';
import DoctorHomepageContentSecondRow from './secondRow';

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