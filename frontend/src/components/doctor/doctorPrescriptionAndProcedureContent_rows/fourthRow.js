import './style/style.css';

import Prescriptions from '../smallerComponents/prescriptions';
import Procedure from '../smallerComponents/procedure';

function doctorPrescriptionAndProcedureContentFourthRow() {
    return (
        <div className="fourthRow">
            <Prescriptions />
            <Procedure />
        </div>
    );
}

export default doctorPrescriptionAndProcedureContentFourthRow;