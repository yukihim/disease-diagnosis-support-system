import './style/style.css';

import FinalizeDiagnosisButton from '../smallerComponents/finalizeDiagnosisButton';

import { useHistory } from 'react-router-dom';

function DoctorFinalizingDiagnosisContentFourthRow() {
    const history = useHistory();

    function handleClickFinalizingDiagnosisLast() {
        // Redirect to /doctor/diagnosis
        history.push("/doctor/precription_and_procedure");
    }
    
    return (
        <div className="fourthRow">
            <div></div>
            <FinalizeDiagnosisButton onClick={handleClickFinalizingDiagnosisLast} />
        </div>
    );
}

export default DoctorFinalizingDiagnosisContentFourthRow;