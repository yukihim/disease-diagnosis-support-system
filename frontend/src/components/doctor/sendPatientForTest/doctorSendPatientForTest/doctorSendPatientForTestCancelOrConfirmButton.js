import React from 'react';
import './style/doctorSendPatientForTestCancelOrConfirmButton.css';

import Button from '../../../common/button';
import ButtonText from '../../../common/buttonText';

function DoctorSendPatientForTestCancelOrConfirmButton({ onClickCancelSendForTest, onClickConfirmSendForTest }) {
    return (
        <div className="doctorSendPatientForTestCancelOrConfirmButton">
            {/* Cancel Button */}
            <Button className="sendForTestAndFinalizingDiagnosis cancel" onClick={onClickCancelSendForTest}>
                <ButtonText>
                    Cancel
                </ButtonText>
            </Button>

            {/* Confirm Button */}
            <Button className="sendForTestAndFinalizingDiagnosis" onClick={onClickConfirmSendForTest}>
                <ButtonText>
                    Confirm
                </ButtonText>
            </Button>
        </div>
    );
}

export default DoctorSendPatientForTestCancelOrConfirmButton;