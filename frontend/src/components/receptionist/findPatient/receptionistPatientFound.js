import React from 'react';
import { useHistory } from 'react-router-dom';
import './style/receptionistPatientFound.css'; // Make sure CSS is imported

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistPatientFoundHeader from './receptionistPatientFound/receptionistPatientFoundHeader';
import ReceptionistPatientFoundContent from './receptionistPatientFound/receptionistPatientFoundContent';

const patientFoundTableHeader = [
    { name: 'Patient Name', width: '230px' },
    { name: 'Social Security Number', width: '200px' },
    { name: 'Health Insurance Code', width: '300px' }
];

// Accept patientFoundTableData and isVisible as props
function ReceptionistPatientFound({ patientFoundTableData, isVisible }) {
    const history = useHistory();

    function onClickPatient(patient) {
        console.log("Patient clicked:", patient);
        // Navigate to the next page with patient information
        history.push({
            pathname: '/receptionist/patient_checkin',
            state: {
                sessionID: patient.sessionID
            }
        });
    }

    // Determine the className based on the isVisible prop
    const containerClassName = `receptionistPatientFoundBox ${isVisible ? 'visible' : ''}`;

    return (
        // Apply the dynamic className
        <BoxContainer className={containerClassName}>
            <BoxContainerTitle className='receptionistPatientFoundTitle'>
                Patient Found
            </BoxContainerTitle>

            <BoxContainerContent className='receptionistPatientFoundContent'>
                <ReceptionistPatientFoundHeader patientFoundTableHeader={patientFoundTableHeader} />
                <ReceptionistPatientFoundContent
                    patientFoundTableHeader={patientFoundTableHeader}
                    patientFoundTableData={patientFoundTableData}
                    onClickPatient={onClickPatient} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistPatientFound;