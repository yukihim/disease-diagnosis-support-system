import './style/style.css';

// Common Components
import Sidebar from '../common/sidebar';

// Doctor's Components
import DoctorDiagnosingPatientFirstRow from './doctorDiagnosingPatientContent_rows/firstRow';
import DoctorDiagnosingPatientSecondRow from './doctorDiagnosingPatientContent_rows/secondRow';
import DoctorDiagnosingPatientThirdRow from './doctorDiagnosingPatientContent_rows/thirdRow';
import DoctorDiagnosingPatientFourthRow from './doctorDiagnosingPatientContent_rows/fourthRow';
import DoctorDiagnosingPatientFifthRow from './doctorDiagnosingPatientContent_rows/fifthRow';

function DoctorDiagnosingPatientContent({ symptoms, setSymptoms, preDiagnosis, setPreDiagnosis }) {
    return (
        <div className="doctorHomepageContent">
            <Sidebar />
            <div className="mainContent">
                <DoctorDiagnosingPatientFirstRow />
                <DoctorDiagnosingPatientSecondRow />
                <DoctorDiagnosingPatientThirdRow />
                <DoctorDiagnosingPatientFourthRow symptoms={symptoms} setSymptoms={setSymptoms} preDiagnosis={preDiagnosis} setPreDiagnosis={setPreDiagnosis} />
                <DoctorDiagnosingPatientFifthRow />
            </div>
        </div>
    );
}

export default DoctorDiagnosingPatientContent;