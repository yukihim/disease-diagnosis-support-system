import React from 'react';
import './style/paraclinicalPatientTestAdditionalInformation.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ParaclinicalPatientTestAdditionalInformationDisplay from './paraclinicalPatientTestAdditionalInformation/paraclinicalPatientTestAdditionalInformationDisplay';

function ParaclinicalPatientTestAdditionalInformation() {
    return (
        <BoxContainer className='paraclinicalPatientTestAdditionalInformationBox'>
            {/* Design finalize and check in for patient component here */}
            <BoxContainerTitle className='paraclinicalPatientTestAdditionalInformation'>
                Test Related Information
            </BoxContainerTitle>

            <BoxContainerContent className='paraclinicalPatientTestAdditionalInformationContent'>
                {/* Sent From Room */}
                <ParaclinicalPatientTestAdditionalInformationDisplay item="Sent From Room:" itemValue="Room 101" />

                {/* Doctor Note */}
                <ParaclinicalPatientTestAdditionalInformationDisplay item="Doctor Note:" itemValue="Patient needs urgent care" />

                {/* Amount of Tests */}
                <ParaclinicalPatientTestAdditionalInformationDisplay item="Amount of Tests:" itemValue="3" />

                {/* Test Type */}
                <ParaclinicalPatientTestAdditionalInformationDisplay className="spanFull" item="Test Type:" itemValue="Blood Test, X-Ray, MRI." />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ParaclinicalPatientTestAdditionalInformation;