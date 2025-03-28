import React from 'react';
import { useHistory } from 'react-router-dom';
import './style/receptionistFinalizeAndCheckinPatientCheckinButton.css';

import Button from '../../../common/button';
import ButtonText from '../../../common/buttonText';

function ReceptionistFinalizeAndCheckinPatientCheckinButton() {
    const history = useHistory();

    const checkinForPatient = () => {
        alert("Check in for patient");
        history.push("/receptionist/homepage");
    };

    return (
        <div className="receptionistFinalizeAndCheckinPatientCheckinButton">
            <Button onClick={checkinForPatient}>
                <ButtonText>
                    Check in for patient
                </ButtonText>
            </Button>
        </div>
    );
}

export default ReceptionistFinalizeAndCheckinPatientCheckinButton;