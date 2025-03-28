import React from 'react';
import { useHistory } from 'react-router-dom';
import './style/receptionistPatientFound.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistPatientFoundHeader from './receptionistPatientFound/receptionistPatientFoundHeader';
import ReceptionistPatientFoundContent from './receptionistPatientFound/receptionistPatientFoundContent';

function ReceptionistPatientFound() {
    const history = useHistory();
    
    function onClickPatient(patient) {
        // Navigate to the next page with patient information
        history.push({
            pathname: '/receptionist/patient_checkin',
            state: { 
                patientSSN: patient.ssn,
                patientHealthInsuranceCode: patient.healthInsuranceCode,
                patientName: patient.patientName
            }
        });
    }
    
    return (
        <BoxContainer className='receptionistPatientFoundBox'>
            <BoxContainerTitle className='receptionistPatientFoundTitle'>
                Patient Found
            </BoxContainerTitle>

            <BoxContainerContent className='receptionistPatientFoundContent'>
                {/* Table header */}
                <ReceptionistPatientFoundHeader />

                {/* Table content */}
                <ReceptionistPatientFoundContent onClickPatient={onClickPatient} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistPatientFound