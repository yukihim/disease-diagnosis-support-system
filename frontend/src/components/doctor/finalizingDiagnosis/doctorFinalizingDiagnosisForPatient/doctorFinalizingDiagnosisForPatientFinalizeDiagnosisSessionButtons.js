import React from 'react';

import Button from '../../../common/button';
import ButtonText from '../../../common/buttonText';

function DoctorFinalizingDiagnosisForPatientFinalizeDiagnosisSessionButtons({ onClickFinalizeDiagnosis, disabled }) {
    return (
        <Button className="sendForTestAndFinalizingDiagnosis" onClick={onClickFinalizeDiagnosis} disabled={disabled}>
            <ButtonText>
                {/* Change button text when submitting */}
                {disabled ? 'Finalizing...' : 'Finalize Diagnosis & Continue'}
            </ButtonText>
        </Button>
    );
}

export default DoctorFinalizingDiagnosisForPatientFinalizeDiagnosisSessionButtons;