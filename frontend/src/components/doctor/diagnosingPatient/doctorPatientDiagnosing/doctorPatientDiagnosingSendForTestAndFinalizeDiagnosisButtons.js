import React from 'react';
import './style/doctorPatientDiagnosingSendForTestAndFinalizeDiagnosisButtons.css';

import SendForTestButton from './components/sendForTestButton';
import FinalizeDiagnosisButton from './components/finalizeDiagnosisButton';

function DoctorPatientDiagnosingSendForTestAndFinalizeDiagnosisButtons({ onClickSendForTest, onClickFinalizeDiagnosis }) {
    return (
        <div className="doctorPatientDiagnosingSendForTestAndFinalizeDiagnosisButtons">
            {/* Send For Test Button */}
            <SendForTestButton onClickSendForTest={onClickSendForTest} />

            {/* Finalize Diagnosis Button */}
            <FinalizeDiagnosisButton onClickFinalizeDiagnosis={onClickFinalizeDiagnosis} />
        </div>
    );
}

export default DoctorPatientDiagnosingSendForTestAndFinalizeDiagnosisButtons;