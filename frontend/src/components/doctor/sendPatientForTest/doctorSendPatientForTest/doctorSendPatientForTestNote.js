import React from 'react'; // Removed useState
import './style/doctorSendPatientForTestNote.css';

import HuggedText from '../../../common/huggedText';

// Accept props: note, onNoteChange
function DoctorSendPatientForTestNote({ note, onNoteChange }) {
    // Removed internal state

    return (
        <div className="doctorSendPatientForTestNote">
            <HuggedText text="Note (Optional):" font_size="16px" font_weight="700" color="#4E4B66" margin_bottom="10px" />
            <textarea
                className="noteInput"
                placeholder="Enter any specific instructions or notes for the test..."
                // Use props for value and onChange handler
                value={note}
                onChange={onNoteChange}
            />
        </div>
    );
}

export default DoctorSendPatientForTestNote;