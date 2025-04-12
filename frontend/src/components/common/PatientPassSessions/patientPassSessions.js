import React, { useState, useEffect } from 'react';
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
    { sessionDate: '2024-12-02', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-03', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-04', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-05', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-06', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-07', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-08', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-09', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
];

function PatientPassSessions({ role, onClickSession }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    
    // Pagination settings
    const ROWS_PER_PAGE = 5;
    const totalRecords = patientPassSessionsTableDummyData.length;
    const totalPages = Math.ceil(totalRecords / ROWS_PER_PAGE);

    // Update displayed data when page changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        const endIndex = Math.min(startIndex + ROWS_PER_PAGE, totalRecords);
        setDisplayData(patientPassSessionsTableDummyData.slice(startIndex, endIndex));
    }, [currentPage]);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    return (
        <BoxContainer className='patientPassSessionsBox'>
            {/* Design patient pass session component here */}
            <BoxContainerTitle className='patientPassSessions'>
                Patient's Pass Sessions
            </BoxContainerTitle>

            <BoxContainerContent className='patientPassSessionsContent'>
                {/* Table Pagination */}
                <PatientPassSessionsPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                {/* Table Header */}
                <PatientPassSessionsHeader patientPassSessionsTableHeader={patientPassSessionsTableHeader} />

                {/* Table Content */}
                <PatientPassSessionsTable patientPassSessionsTableHeader={patientPassSessionsTableHeader} patientPassSessionsTableData={displayData} onClickSession={onClickSession} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default PatientPassSessions;