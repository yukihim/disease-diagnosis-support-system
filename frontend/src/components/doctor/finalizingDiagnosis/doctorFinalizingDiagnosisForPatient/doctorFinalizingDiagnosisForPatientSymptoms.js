import React from 'react';
import './style/doctorFinalizingDiagnosisForPatientSymptoms.css';

import HuggedText from '../../../common/huggedText';

function DoctorFinalizingDiagnosisForPatientSymptoms({ patientSymptoms }) {
    return (
        <div className="doctorFinalizingDiagnosisForPatientSymptoms">
            <HuggedText text="Symptoms: " font_size="14px" font_weight="600" color="#000000" />
            <HuggedText text={patientSymptoms} font_size="14px" font_weight="500" color="#000000" />
        </div>
    );
}

export default DoctorFinalizingDiagnosisForPatientSymptoms;