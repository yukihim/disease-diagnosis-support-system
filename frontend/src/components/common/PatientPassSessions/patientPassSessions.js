import React from 'react';
import './style/patientPassSessions.css';

import BoxContainer from '../boxContainer';
import BoxContainerTitle from '../boxContainerTitle';
import BoxContainerContent from '../boxContainerContent';

import PatientPassSessionsPagination from './components/patientPassSessionsPagination';
import PatientPassSessionsHeader from './components/patientPassSessionsHeader';
import PatientPassSessionsTable from './components/patientPassSessionsTable';

const patientPassSessionsTableHeader = [
    { name: 'Session Date', width: '200px' },
    { name: 'Session Type', width: '200px' },
    { name: 'Person In Charged', width: '200px' },
    { name: 'Department', width: '200px' },
    { name: 'Result', width: '200px' }
];

const patientPassSessionsTableDummyData = [
    { sessionDate: '2024-12-01', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-01', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-01', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-01', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-01', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
];

function PatientPassSessions({ role }) {
    const onClickSession = (session) => {
        console.log(session);
    };

    console.log(role);

    return (
        <BoxContainer className='patientPassSessionsBox'>
            {/* Design patient pass session component here */}
            <BoxContainerTitle className='patientPassSessions'>
                Patient's Pass Sessions
            </BoxContainerTitle>

            <BoxContainerContent className='patientPassSessionsContent'>
                {/* Table Pagination */}
                <PatientPassSessionsPagination />

                {/* Table Header */}
                <PatientPassSessionsHeader patientPassSessionsTableHeader={patientPassSessionsTableHeader} />

                {/* Table Content */}
                <PatientPassSessionsTable patientPassSessionsTableHeader={patientPassSessionsTableHeader} patientPassSessionsTableData={patientPassSessionsTableDummyData} onClickSession={onClickSession} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default PatientPassSessions;