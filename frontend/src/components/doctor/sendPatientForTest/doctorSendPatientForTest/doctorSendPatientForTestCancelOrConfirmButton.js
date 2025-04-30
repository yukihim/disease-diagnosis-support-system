import React from 'react';
import './style/doctorSendPatientForTestCancelOrConfirmButton.css';

import Button from '../../../common/button';
import ButtonText from '../../../common/buttonText';

// Accept props: onClickCancelSendForTest, onClickConfirmSendForTest, isSubmitting, submitError
function DoctorSendPatientForTestCancelOrConfirmButton({
    onClickCancelSendForTest,
    onClickConfirmSendForTest,
    isSubmitting,
    submitError
}) {
    if(submitError) {
        console.error("Error in DoctorSendPatientForTestCancelOrConfirmButton:", submitError);
        alert("An error occurred: " + submitError);
    }

    return (
        <div className="doctorSendPatientForTestCancelOrConfirmButton">
            <Button className="sendForTestAndFinalizingDiagnosis cancelBig" onClick={onClickCancelSendForTest} disabled={isSubmitting}>
                <ButtonText>Cancel</ButtonText>
            </Button>
            <Button className="sendForTestAndFinalizingDiagnosis" onClick={onClickConfirmSendForTest} disabled={isSubmitting}>
                <ButtonText>
                    {isSubmitting ? 'Sending...' : 'Confirm'}
                </ButtonText>
            </Button>
        </div>
    );
}

export default DoctorSendPatientForTestCancelOrConfirmButton;