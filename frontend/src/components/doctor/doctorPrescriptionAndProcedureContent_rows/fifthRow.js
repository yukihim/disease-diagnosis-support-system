import './style/style.css';

// import Prescriptions from '../smallerComponents/prescriptions';
// import Procedure from '../smallerComponents/procedure';
import CancelButton from '../smallerComponents/cancelButton';
import ConfirmButton from '../smallerComponents/confirmButton';

function doctorPrescriptionAndProcedureContentFifthRow() {
    return (
        <div className="fifthRow">
            <CancelButton />
            <ConfirmButton />
        </div>
    );
}

export default doctorPrescriptionAndProcedureContentFifthRow;