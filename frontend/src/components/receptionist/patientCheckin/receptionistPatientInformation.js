import React, { useState } from 'react';
import './style/receptionistPatientInformation.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import Button from '../../common/button';
import ButtonText from '../../common/buttonText';

import ReceptionistPatientInformationForm from './receptionistPatientInformation/receptionistPatientInformationForm';

function ReceptionistPatientInformation() {
    const [isEditing, setIsEditing] = useState(false);

    const onClickEditButton = () => {
        setIsEditing(!isEditing);
    }

    return (
        <BoxContainer className='receptionistPatientInformationBox'>
            <BoxContainerTitle className='receptionistPatientInformation'>
                Patient Information

                <Button className='receptionistPatientInformationEditButton' onClick={onClickEditButton}>
                    <ButtonText>
                        {isEditing ? 'Save' : 'Edit'}
                    </ButtonText>
                </Button>
            </BoxContainerTitle>

            <BoxContainerContent className='receptionistPatientInformationContent'>
                <ReceptionistPatientInformationForm isEditing={isEditing} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistPatientInformation;