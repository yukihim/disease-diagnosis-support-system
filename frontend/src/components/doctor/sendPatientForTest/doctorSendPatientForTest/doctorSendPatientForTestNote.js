import React, { useState } from 'react';
import './style/doctorSendPatientForTestNote.css';

import HuggedText from '../../../common/huggedText';

function DoctorSendPatientForTestNote() {
    const [note, setNote] = useState("");
    
    return (
        <div className="doctorSendPatientForTestNote">
            <HuggedText text="Note:" font_size="14px" font_weight="600" color="#000000" />
            <textarea
                className="noteInput"
                placeholder="Note for paraclinical technician"
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={4}
            />
        </div>
    );
}

export default DoctorSendPatientForTestNote;