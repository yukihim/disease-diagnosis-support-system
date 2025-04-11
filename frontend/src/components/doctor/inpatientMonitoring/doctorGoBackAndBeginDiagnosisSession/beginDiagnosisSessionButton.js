import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../../common/button';
import ButtonText from '../../../common/buttonText';

function BeginDiagnosisSessionButton({ patientName }) {
    const history = useHistory();

    const onClickBeginDiagnosisSession = () => {
        history.push({
            pathname: '/doctor/diagnosis',
            state: {
                patientName: patientName,
            }
        });
    }

    return (
        <Button className="sendForTestAndFinalizingDiagnosis" onClick={onClickBeginDiagnosisSession}>
            <ButtonText>
                Begin Diagnosis Session
            </ButtonText>
        </Button>
    );
}

export default BeginDiagnosisSessionButton;