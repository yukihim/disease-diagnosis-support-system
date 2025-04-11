import React from 'react';
import { useHistory } from 'react-router-dom';
import './style/doctorSendPatientForTestCard.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorSendPatientForTestTestType from './doctorSendPatientForTest/doctorSendPatientForTestTestType';
import DoctorSendPatientForTestNote from './doctorSendPatientForTest/doctorSendPatientForTestNote';
import DoctorSendPatientForTestCancelOrConfirmButton from './doctorSendPatientForTest/doctorSendPatientForTestCancelOrConfirmButton';

function DoctorSendPatientForTestCard() {
    const history = useHistory();
    
    // Handler button
    const onClickConfirmSendForTest = () => {
        alert("Patient sent for test request successfully!");
        history.push("/doctor/homepage");
    };

    // Handler button
    const onClickCancelSendForTest = () => {
        history.goBack();
    };

    return (
        <BoxContainer className='doctorSendPatientForTestCardBox'>
            <BoxContainerTitle className='doctorSendPatientForTestCard'>
                Send Patient For Test
            </BoxContainerTitle>

            <BoxContainerContent className='doctorSendPatientForTestCardContent'>
                {/* Test type */}
                <DoctorSendPatientForTestTestType />

                {/* Note if any */}
                <DoctorSendPatientForTestNote />

                {/* Cancel or Confirm button */}
                <DoctorSendPatientForTestCancelOrConfirmButton onClickCancelSendForTest={onClickCancelSendForTest} onClickConfirmSendForTest={onClickConfirmSendForTest} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorSendPatientForTestCard;