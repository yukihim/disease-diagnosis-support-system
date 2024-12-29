import './style/style.css';

import Prescriptions from '../smallerComponents/prescriptions';
import Procedure from '../smallerComponents/procedure';

function DoctorPrescriptionAndProcedureContentFourthRow() {
    return (
        <div className="fourthRow">
            <Prescriptions />
            <Procedure />
        </div>
    );
}

export default DoctorPrescriptionAndProcedureContentFourthRow;