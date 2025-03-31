import React from 'react';

import Button from '../../../common/button';
import ButtonText from '../../../common/buttonText';

function DoctorFinalizingDiagnosisForPatientEndDiagnosisSessionButtons({ onClickFinalizeDiagnosis }) {
    return (
        <Button className="sendForTestAndFinalizingDiagnosis" onClick={onClickFinalizeDiagnosis}>
            <ButtonText>
                Finalize Diagnosis
            </ButtonText>
        </Button>
    );
}

export default DoctorFinalizingDiagnosisForPatientEndDiagnosisSessionButtons;