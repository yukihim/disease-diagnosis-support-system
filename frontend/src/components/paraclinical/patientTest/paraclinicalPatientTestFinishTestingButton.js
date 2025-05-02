import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../common/button';
import ButtonText from '../../common/buttonText';

function ParaclinicalPatientTestFinishTestingButton({ patientState }) {
    const history = useHistory();

    const onClickGoBack = () => {
        alert("Testing Finished");

        history.push('/paraclinical/homepage');
    };

    return (
        <>
            {patientState === 7 && (
                <Button className="sendForTestAndFinalizingDiagnosis" onClick={onClickGoBack}>
                    <ButtonText>
                        Finish Testing
                    </ButtonText>
                </Button>
            )}
        </>
    );
}

export default ParaclinicalPatientTestFinishTestingButton;