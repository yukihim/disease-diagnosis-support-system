import './style/style.css';

// Common Components
import Sidebar from '../common/sidebar';

// Doctor's Components
import DoctorDiagnosingPatientFirstRow from './doctorDiagnosingPatientContent_rows/firstRow';
import DoctorViewPassSessionContentSecondRow from './doctorViewPassSessionDetailsContent_rows/secondRow';
import DoctorFinalizingDiagnosisContentThirdRow from './doctorFinalizingDiagnosisContent_rows/thirdRow';
import DoctorFinalizingDiagnosisContentFourthRow from './doctorFinalizingDiagnosisContent_rows/fourthRow';

function DoctorFinalizingDiagnosisContent() {
    return (
        <div className="doctorHomepageContent">
            <Sidebar />
            <div className="mainContent">
                <DoctorDiagnosingPatientFirstRow />
                <DoctorViewPassSessionContentSecondRow />
                <DoctorFinalizingDiagnosisContentThirdRow />
                <DoctorFinalizingDiagnosisContentFourthRow />
            </div>
        </div>
    );
}

export default DoctorFinalizingDiagnosisContent;