import './style/style.css';

import SendForTestButton from '../smallerComponents/sendForTestButton';
import FinalizeDiagnosisButton from '../smallerComponents/finalizeDiagnosisButton';

function DoctorHomepageContentFifthRow() {
    return (
        <div className="fifthRow">
            <SendForTestButton />
            <FinalizeDiagnosisButton />
        </div>
    );
}

export default DoctorHomepageContentFifthRow;