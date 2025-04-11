// import React from 'react';
// import './style/doctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination.css';

// import HuggedText from '../../../common/huggedText';

// function DoctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination() {
//     return (
//         <div className="doctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination">
//             <HuggedText text="Final Diagnosis: " font_size="14px" font_weight="600" color="#000000" style={{ width: "100%" }} />
//             <input className="inputDate" type="text" placeholder="Enter Follow-up Examination Date (if any)" />
//         </div>
//     );
// }

// export default DoctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination;













import React, { useState } from 'react';
import './style/doctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination.css';

import HuggedText from '../../../common/huggedText';

function DoctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination() {
    const [followUpDate, setFollowUpDate] = useState('');

    const handleDateChange = (e) => {
        setFollowUpDate(e.target.value);
    };

    return (
        <div className="doctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination">
            <HuggedText className="full" text="Follow-up Examination Date: " font_size="14px" font_weight="600" color="#000000" />
            <div className="date-input-container">
                <input 
                    className="inputDate" 
                    type="date" 
                    value={followUpDate}
                    onChange={handleDateChange}
                    placeholder="Select follow-up date (if needed)"
                />
                <label className="date-label">Select follow-up date (if needed)</label>
            </div>
        </div>
    );
}

export default DoctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination;