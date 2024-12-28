import './style/doctorHomepageContent.css';

import Sidebar from '../common/sidebar';

function DoctorHomepageContent() {
    return (
        <div className="doctorHomepageContent">
            <Sidebar />
            <div className="mainContent">
                <div>
                    Welcome to the Doctor Homepage!
                </div>
            </div>
        </div>
    );
}

export default DoctorHomepageContent;