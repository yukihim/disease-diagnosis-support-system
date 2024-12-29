import './style/style.css';

import SendForTestButton from '../smallerComponents/sendForTestButton';
import FinalizeDiagnosisButton from '../smallerComponents/finalizeDiagnosisButton';

import { useHistory } from 'react-router-dom';

function DoctorHomepageContentFifthRow() {
    const history = useHistory();

    function handleClickFinalizingDiagnosis() {
        // Redirect to /doctor/diagnosis
        history.push("/doctor/finalizing_diagnosis");
    }

    return (
        <div className="fifthRow">
            <SendForTestButton />
            <FinalizeDiagnosisButton onClick={handleClickFinalizingDiagnosis} />
        </div>
    );
}

export default DoctorHomepageContentFifthRow;