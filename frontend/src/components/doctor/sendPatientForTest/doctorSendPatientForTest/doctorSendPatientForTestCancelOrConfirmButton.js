import './style/doctorSendPatientForTestCancelOrConfirmButton.css';

import Button from '../../../common/button';
import ButtonText from '../../../common/buttonText';

// Accept props: onClickCancelSendForTest, onClickConfirmSendForTest, isSubmitting, submitError
function DoctorSendPatientForTestCancelOrConfirmButton({
    onClickCancelSendForTest,
    onClickConfirmSendForTest,
    isSubmitting,
}) {
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