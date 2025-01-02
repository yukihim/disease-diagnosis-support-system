import './style/style.css';

// Common Components
import Sidebar from '../common/sidebar';

// Doctor's Components
import DoctorDiagnosingPatientFirstRow from './doctorDiagnosingPatientContent_rows/firstRow';
import DoctorViewPassSessionContentSecondRow from './doctorViewPassSessionDetailsContent_rows/secondRow';
import DoctorFinalizingDiagnosisContentThirdRow from './doctorFinalizingDiagnosisContent_rows/thirdRow';
import DoctorFinalizingDiagnosisContentFourthRow from './doctorFinalizingDiagnosisContent_rows/fourthRow';

function DoctorFinalizingDiagnosisContent({ symptoms, preDiagnosis, finalDiagnosis, setFinalDiagnosis }) {
    return (
        <div className="doctorHomepageContent">
            <Sidebar />
            <div className="mainContent">
                <DoctorDiagnosingPatientFirstRow />
                <DoctorViewPassSessionContentSecondRow />
                <DoctorFinalizingDiagnosisContentThirdRow symptoms={symptoms} preDiagnosis={preDiagnosis} finalDiagnosis={finalDiagnosis} setFinalDiagnosis={setFinalDiagnosis} />
                <DoctorFinalizingDiagnosisContentFourthRow />
            </div>
        </div>
    );
}

export default DoctorFinalizingDiagnosisContent;