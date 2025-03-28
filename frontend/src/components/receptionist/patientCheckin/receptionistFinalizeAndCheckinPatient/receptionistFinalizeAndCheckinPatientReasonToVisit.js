import React, { useState } from 'react';
import './style/receptionistFinalizeAndCheckinPatientReasonToVisit.css';

import HuggedText from '../../../common/huggedText';

function ReceptionistFinalizeAndCheckinPatientReasonToVisit() {
    const [reason, setReason] = useState("");
    
    return (
        <div className="receptionistFinalizeAndCheckinPatientReasonToVisit">
            <HuggedText text="Reason to visit:" font_size="14px" font_weight="600" color="#000000" />
            <textarea
                className="reasonInput"
                placeholder="Reason to visit: I have a fever, dry cough, and difficulty breathing. "
                value={reason}
                onChange={e => setReason(e.target.value)}
                rows={4}
            />
        </div>
    );
}

export default ReceptionistFinalizeAndCheckinPatientReasonToVisit;