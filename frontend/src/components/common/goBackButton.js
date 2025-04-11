import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from './button';
import ButtonText from './buttonText';

function GoBackButton() {
    const history = useHistory();

    const onClickGoBack = () => {
        history.goBack();
    };

    return (
        <Button className="sendForTestAndFinalizingDiagnosis" onClick={onClickGoBack}>
            <ButtonText>
                Go Back
            </ButtonText>
        </Button>
    );
}

export default GoBackButton;