import React, { useState } from 'react';
import './style/receptionistPatientInformation.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import Button from '../../common/button';
import ButtonText from '../../common/buttonText';

import ReceptionistPatientInformationForm from './receptionistPatientInformation/receptionistPatientInformationForm';

const initialPatientInformation = {
    "Name": "Phuong Xuong Thinh",
    "DOB": "01/01/2000",
    "Gender": "Male",
    "Phone Number": "0123456789",
    "SSN": "123-45-6789",
    "Health Insurance Code": "123456789",
    "Height (cm)": "163 cm",
    "Weight (kg)": "70 kg",
    "Job": "Student",
    "Address": "168 Ly Thuong Kiet Street, District 10, Ho Chi Minh City, Vietnam",
    "Follow-up Date": "25/04/2025",
};

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
                <ReceptionistPatientInformationForm initialPatientInformation={initialPatientInformation} isEditing={isEditing} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistPatientInformation;