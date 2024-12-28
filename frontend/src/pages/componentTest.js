// import LoginForm from '../components/auth/loginForm';

import Header from '../components/common/header';
import DoctorHomepageContent from '../components/doctor/doctorHomepageContent';

import "./style/doctorHomepage.css"

function ComponentTest() {
    return (
        // <div>
        //     <LoginForm />
        // </div>

        <div className="doctorHomepage">
            <Header />
            <DoctorHomepageContent />
        </div>
    );
}

export default ComponentTest;