import React from 'react';

import Button from '../../../../common/button';
import ButtonText from '../../../../common/buttonText';

function FinalizeDiagnosisButton({ onClickFinalizeDiagnosis }) {
    return (
        <Button className="sendForTestAndFinalizingDiagnosis" onClick={onClickFinalizeDiagnosis}>
            <ButtonText>
                Finalize Diagnosis
            </ButtonText>
        </Button>
    );
}

export default FinalizeDiagnosisButton;