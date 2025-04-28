import React from 'react'; // Removed useState if it was there
import './style/receptionistFinalizeAndCheckinPatientReasonToVisit.css';

import HuggedText from '../../../common/huggedText';

// Receive reasonToVisit and setReasonToVisit from parent
function ReceptionistFinalizeAndCheckinPatientReasonToVisit({ reasonToVisit, setReasonToVisit }) {

    // Handle changes in the textarea and update parent state
    const handleChange = (event) => {
        setReasonToVisit(event.target.value);
    };

    return (
        <div className="receptionistFinalizeAndCheckinPatientReasonToVisit">
            <HuggedText text="Reason to visit:" font_size="14px" font_weight="600" color="#000000" />
            <textarea
                id="reasonToVisit"
                className="reasonInput"
                placeholder="Enter reason for patient's visit..."
                value={reasonToVisit} // Display value from parent state
                onChange={handleChange} // Update parent state on change
                rows={4}
            />
        </div>
    );
}

export default ReceptionistFinalizeAndCheckinPatientReasonToVisit;