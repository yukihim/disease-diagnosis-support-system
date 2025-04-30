import React, { useState, useEffect } from 'react'; // Import useEffect
import './style/doctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination.css';

import HuggedText from '../../../common/huggedText';

// Accept callback prop from parent button
function DoctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination({ onFollowUpDateUpdate }) { // Added prop
    // State to store the raw date input string (YYYY-MM-DD from type="date")
    const [followUpDate, setFollowUpDate] = useState('');

    const handleDateInputChange = (e) => {
        // Directly store the user's input (YYYY-MM-DD)
        setFollowUpDate(e.target.value);
    };

    // Effect to call the parent's callback whenever followUpDate changes
    useEffect(() => {
        if (onFollowUpDateUpdate) {
            onFollowUpDateUpdate(followUpDate); // Pass the date string up
        }
    }, [followUpDate, onFollowUpDateUpdate]); // Dependency array

    return (
        <div className="doctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination">
            <HuggedText className="full" text="Follow-up Examination Date: " font_size="14px" font_weight="600" color="#4E4B66" />
            <div className="date-input-container">
                <input
                    className="inputDate"
                    type="date" // Use type="date" for standard date picker
                    value={followUpDate}
                    onChange={handleDateInputChange} // Update state directly
                    // placeholder="YYYY-MM-DD" // Placeholder not usually shown for type="date"
                />
            </div>
        </div>
    );
}

export default DoctorPrescriptionAndProcedureEndDiagnosisSessionFollowUpExamination;