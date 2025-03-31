import React from 'react';
import './style/doctorSendPatientForTestCard.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

function DoctorSendPatientForTestCard() {
    return (
        <BoxContainer className='doctorSendPatientForTestCardBox'>
            <BoxContainerTitle className='doctorSendPatientForTestCard'>
                Send Patient For Test
            </BoxContainerTitle>

            <BoxContainerContent className='doctorSendPatientForTestCardContent'>
                {/* Test type */}
                

                {/* Note if any */}


                {/* Cancel or Confirm button */}
                
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorSendPatientForTestCard;