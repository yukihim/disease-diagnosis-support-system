import './style/style.css';

// import Prescriptions from '../smallerComponents/prescriptions';
// import Procedure from '../smallerComponents/procedure';
import CancelButton from '../smallerComponents/cancelButton';
import ConfirmButton from '../smallerComponents/confirmButton';

import { useHistory } from 'react-router-dom';

function DoctorPrescriptionAndProcedureContentFifthRow() {
    const history = useHistory();

    function handleClickConfirm() {
        // Redirect to /doctor/homepage
        history.push("/doctor/homepage");
    }
    
    return (
        <div className="fifthRow">
            <CancelButton />
            <ConfirmButton onClick={handleClickConfirm} />
        </div>
    );
}

export default DoctorPrescriptionAndProcedureContentFifthRow;