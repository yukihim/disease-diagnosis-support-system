import React, { useState } from 'react';
import './style/doctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination.css';

import HuggedText from '../../../common/huggedText';

function DoctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination() {
    // State to store the raw date input string (MM/DD/YYYY)
    const [followUpDate, setFollowUpDate] = useState('');

    const handleDateInputChange = (e) => {
        // Directly store the user's input
        setFollowUpDate(e.target.value);
    };

    return (
        <div className="doctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination">
            <HuggedText className="full" text="Follow-up Examination Date: " font_size="14px" font_weight="600" color="#000000" />
            <div className="date-input-container">
                <input
                    className="inputDate"
                    type="text" // Use text input
                    value={followUpDate} // Bind to the state
                    onChange={handleDateInputChange} // Update state directly
                    // Removed onBlur handler
                    placeholder="MM/DD/YYYY" // Guide user format
                    maxLength={10} // Max length for MM/DD/YYYY
                />
            </div>
        </div>
    );
}

export default DoctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination;