import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
// import { useHistory } from 'react-router-dom';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorPatientSentForParaclinicalTestOverview from './doctorPatientSentForParaclinicalTest/doctorPatientSentForParaclinicalTestOverview';
import DoctorPatientSentForParaclinicalTestPagination from './doctorPatientSentForParaclinicalTest/doctorPatientSentForParaclinicalTestPagination'; // Ensure this is imported
import DoctorPatientSentForParaclinicalTestTableHeader from './doctorPatientSentForParaclinicalTest/doctorPatientSentForParaclinicalTestTableHeader';
import DoctorPatientSentForParaclinicalTestTableContent from './doctorPatientSentForParaclinicalTest/doctorPatientSentForParaclinicalTestTableContent';

const patientSentForParaclinicalTestTableHeader = [
    { name: 'Name', width: '150px' },
    { name: 'Test', width: '100px' },
    { name: 'State', width: '150px' }
];

const patientSentForParaclinicalTestTableDummyData = [
    { name: 'Phuong Xuong Thinh', test: 'Blood Test', state: 'Waiting for result' },
    { name: 'Phuong Xuong A', test: 'Blood Test', state: 'On-going' },
    { name: 'Phuong Xuong B', test: 'Blood Test', state: 'On-going' },
    { name: 'Phuong Xuong C', test: 'Blood Test', state: 'Waiting for test' },
    { name: 'Phuong Xuong D', test: 'Blood Test', state: 'Waiting for test' },
    { name: 'Phuong Xuong E', test: 'Blood Test', state: 'Waiting for test' },
    { name: 'Phuong Xuong F', test: 'Blood Test', state: 'Waiting for test' },
    { name: 'Phuong Xuong G', test: 'Blood Test', state: 'Waiting for test' },
    { name: 'Phuong Xuong H', test: 'Blood Test', state: 'Waiting for test' },
];

const ROWS_PER_PAGE_OPTIONS = [3, 5, 7]; // Define options for rows per page

function DoctorPatientSentForParaclinicalTest() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[1]); // Default to 5 (index 1)

    // Calculate total count
    const totalRecords = patientSentForParaclinicalTestTableDummyData.length;

    // Calculate total pages based on current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(totalRecords / rowsPerPage);
    }, [totalRecords, rowsPerPage]); // Recalculate when count or rowsPerPage changes

    // Update displayed data when page or rowsPerPage changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalRecords);
        setDisplayData(patientSentForParaclinicalTestTableDummyData.slice(startIndex, endIndex));
    }, [currentPage, rowsPerPage, totalRecords]); // Add rowsPerPage and totalRecords dependency

    // Reset to first page when rowsPerPage changes
    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage]); // Reset page if rowsPerPage changes

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    // --- Handle Rows Per Page Change ---
    function handleRowsPerPageChange(newRowsPerPage) {
        setRowsPerPage(newRowsPerPage);
        // setCurrentPage(1) is handled by the useEffect hook
    }

    function onClickPatientSentForParaclinicalTest(patient) {
        // Navigate to the next page with patient information
        // history.push({
        //     pathname: '/receptionist/patient_checkin',
        //     state: {
        //         patientSSN: patient.name,
        //         patientHealthInsuranceCode: patient.test
        //     }
        // });

        alert(`Patient ${patient.name} is sent for ${patient.test} test`);
    }

    return (
        <BoxContainer className='bigBox'>
            <BoxContainerTitle>
                Patient Sent For Paraclinical Test
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <DoctorPatientSentForParaclinicalTestOverview patientSentForParaclinicalTestCount={totalRecords} />

                {/* Pagination - Pass new props */}
                <DoctorPatientSentForParaclinicalTestPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS} // Pass options
                    currentRowsPerPage={rowsPerPage} // Pass current value
                    onRowsPerPageChange={handleRowsPerPageChange} // Pass handler
                />

                {/* Table header */}
                <DoctorPatientSentForParaclinicalTestTableHeader patientSentForParaclinicalTestTableHeader={patientSentForParaclinicalTestTableHeader} />

                {/* Table content */}
                <DoctorPatientSentForParaclinicalTestTableContent patientSentForParaclinicalTestTableHeader={patientSentForParaclinicalTestTableHeader} patientSentForParaclinicalTestTableData={displayData} onClickPatientSentForParaclinicalTest={onClickPatientSentForParaclinicalTest} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPatientSentForParaclinicalTest;