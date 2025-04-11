import React from 'react';

import Button from '../../button';
import ButtonText from '../../buttonText';

function GoBackButton({ onClickGoBackToPreviousPage }) {
    return (
        <Button className="sendForTestAndFinalizingDiagnosis" onClick={onClickGoBackToPreviousPage}>
            <ButtonText>
                Back to Previous Page
            </ButtonText>
        </Button>
    );
}

export default GoBackButton;