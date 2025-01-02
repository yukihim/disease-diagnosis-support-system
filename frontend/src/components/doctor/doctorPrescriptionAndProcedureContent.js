import './style/style.css';

// Common Components
import Sidebar from '../common/sidebar';

// Doctor's Components
import DoctorDiagnosingPatientFirstRow from './doctorDiagnosingPatientContent_rows/firstRow';
import DoctorViewPassSessionContentSecondRow from './doctorViewPassSessionDetailsContent_rows/secondRow';
import DoctorPrescriptionAndProcedureContentThirdRow from './doctorPrescriptionAndProcedureContent_rows/thirdRow';
import DoctorPrescriptionAndProcedureContentFourthRow from './doctorPrescriptionAndProcedureContent_rows/fourthRow';
import DoctorPrescriptionAndProcedureContentFifthRow from './doctorPrescriptionAndProcedureContent_rows/fifthRow';

function DoctorPrescriptionAndProcedureContent({ symptoms, finalDiagnosis }) {
    return (
        <div className="doctorHomepageContent">
            <Sidebar />
            <div className="mainContent">
                <DoctorDiagnosingPatientFirstRow />
                <DoctorViewPassSessionContentSecondRow />
                <DoctorPrescriptionAndProcedureContentThirdRow symptoms={symptoms} finalDiagnosis={finalDiagnosis} />
                <DoctorPrescriptionAndProcedureContentFourthRow />
                <DoctorPrescriptionAndProcedureContentFifthRow />
            </div>
        </div>
    );
}

export default DoctorPrescriptionAndProcedureContent;