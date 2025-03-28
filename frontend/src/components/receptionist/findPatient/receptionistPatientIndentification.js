import React from 'react';
import './style/receptionistPatientIndentification.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import FindPatientWrapper from './receptionistPatientIndentification/findPatientWrapper';

function ReceptionistPatientIndentification({ onChangeSSN, onChangeHealthInsuranceNumber }) {
    return (
        <BoxContainer className='receptionistPatientIndentificationBox'>
            <BoxContainerTitle className='receptionistPatientIndentificationTitle'>
                Patient Indentification
            </BoxContainerTitle>

            <BoxContainerContent className='receptionistPatientIndentificationContent'>
                <FindPatientWrapper onChangeSSN={onChangeSSN} onChangeHealthInsuranceNumber={onChangeHealthInsuranceNumber} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistPatientIndentification