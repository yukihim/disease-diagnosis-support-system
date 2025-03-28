import React from 'react';
import './style/receptionistPatientPassSessions.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistPatientPassSessionsPagination from './receptionistPatientPassSessions/receptionistPatientPassSessionsPagination';
import ReceptionistPatientPassSessionsHeader from './receptionistPatientPassSessions/receptionistPatientPassSessionsHeader';
import ReceptionistPatientPassSessionsTable from './receptionistPatientPassSessions/receptionistPatientPassSessionsTable';

function ReceptionistPatientPassSessions() {
    return (
        <BoxContainer className='receptionistPatientPassSessionsBox'>
            {/* Design patient pass session component here */}
            <BoxContainerTitle className='receptionistPatientPassSessions'>
                Patient's Pass Sessions
            </BoxContainerTitle>

            <BoxContainerContent className='receptionistPatientPassSessionsContent'>
                {/* Table Pagination */}
                <ReceptionistPatientPassSessionsPagination />

                {/* Table Header */}
                <ReceptionistPatientPassSessionsHeader />

                {/* Table Content */}
                <ReceptionistPatientPassSessionsTable />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistPatientPassSessions;