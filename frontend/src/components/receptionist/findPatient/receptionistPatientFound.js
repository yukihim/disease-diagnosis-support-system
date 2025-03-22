import React from 'react';
import './style/receptionistPatientFound.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import PatientInformationWrapper from './components/patientInformationWrapper';

function ReceptionistPatientFound() {
    return (
        <BoxContainer className='receptionistPatientFoundBox'>
            <BoxContainerTitle className='receptionistPatientIndentificationTitle'>
                Patient Found

                
            </BoxContainerTitle>

            <BoxContainerContent className='receptionistPatientIndentificationContent'>
                <PatientInformationWrapper />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistPatientFound