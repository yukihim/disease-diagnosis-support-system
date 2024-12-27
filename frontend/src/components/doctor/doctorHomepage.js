import './style/doctorHomepage.css';

import Sidebar from '../common/sidebar';

function DoctorHomepage() {
    return (
        <div className="doctorHomepage">
            <Sidebar />
            <div className="mainContent">
                Welcome to the Doctor Homepage!
            </div>
        </div>
    );
}

export default DoctorHomepage;