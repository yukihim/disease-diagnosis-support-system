import React from 'react';
import './style/doctorPrescriptionAndProcedureDiagnosisResultFinalDiagnosis.css';

import HuggedText from '../../../common/huggedText';

function DoctorPrescriptionAndProcedureDiagnosisResultFinalDiagnosis({ patientFinalDiagnosis }) {
    return (
        <div className="doctorPrescriptionAndProcedureDiagnosisResultFinalDiagnosis">
            <HuggedText text="Final Diagnosis: " font_size="14px" font_weight="600" color="#4E4B66" />
            <HuggedText text={patientFinalDiagnosis} font_size="14px" font_weight="500" color="#4E4B66" />
        </div>
    );
}

export default DoctorPrescriptionAndProcedureDiagnosisResultFinalDiagnosis;