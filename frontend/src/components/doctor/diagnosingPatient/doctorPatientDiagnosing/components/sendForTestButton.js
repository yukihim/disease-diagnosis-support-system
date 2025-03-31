import React from 'react';

import Button from '../../../../common/button';
import ButtonText from '../../../../common/buttonText';

function SendForTestButton({ onClickSendForTest }) {
    return (
        <Button className="sendForTestAndFinalizingDiagnosis" onClick={onClickSendForTest}>
            <ButtonText>
                Send For Test
            </ButtonText>
        </Button>
    );
}

export default SendForTestButton;