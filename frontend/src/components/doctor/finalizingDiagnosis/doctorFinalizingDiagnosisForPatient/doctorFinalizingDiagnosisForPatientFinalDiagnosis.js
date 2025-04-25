import React from 'react';
import './style/doctorFinalizingDiagnosisForPatientFinalDiagnosis.css';

import HuggedText from '../../../common/huggedText';

function DoctorFinalizingDiagnosisForPatientFinalDiagnosis({ doctorFinalizingDiagnosisForPatientFinalDiagnosis, setDoctorFinalizingDiagnosisForPatientFinalDiagnosis }) {
    return (
        <div className="doctorFinalizingDiagnosisForPatientFinalDiagnosis">
            <HuggedText text="Final Diagnosis:" font_size="14px" font_weight="600" color="#000000" />
            <input
                className="doctorFinalizingDiagnosisForPatientFinalDiagnosisInput"
                placeholder={doctorFinalizingDiagnosisForPatientFinalDiagnosis}
                value={doctorFinalizingDiagnosisForPatientFinalDiagnosis}
                onChange={e => setDoctorFinalizingDiagnosisForPatientFinalDiagnosis(e.target.value)}
            />
        </div>
    );
}

export default DoctorFinalizingDiagnosisForPatientFinalDiagnosis;