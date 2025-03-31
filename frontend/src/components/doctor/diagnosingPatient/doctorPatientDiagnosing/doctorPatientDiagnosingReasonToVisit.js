import React from 'react';
import './style/doctorPatientDiagnosingReasonToVisit.css';

import HuggedText from '../../../common/huggedText';

function DoctorPatientDiagnosingReasonToVisit({ patientReasonToVisit }) {
    return (
        <div className="doctorPatientDiagnosingReasonToVisit">
            <HuggedText text="Reason to visit: " font_size="14px" font_weight="600" color="#000000" />
            <HuggedText text={patientReasonToVisit} font_size="14px" font_weight="500" color="#000000" />
        </div>
    );
}

export default DoctorPatientDiagnosingReasonToVisit;