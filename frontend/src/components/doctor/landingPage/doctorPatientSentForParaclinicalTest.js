import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorPatientSentForParaclinicalTestOverview from './doctorPatientSentForParaclinicalTest/doctorPatientSentForParaclinicalTestOverview';
import DoctorPatientSentForParaclinicalTestPagination from './doctorPatientSentForParaclinicalTest/doctorPatientSentForParaclinicalTestPagination';
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

function DoctorPatientSentForParaclinicalTest() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);

    // Pagination settings
    const ROWS_PER_PAGE = 5;
    const totalRecords = patientSentForParaclinicalTestTableDummyData.length;
    const totalPages = Math.ceil(totalRecords / ROWS_PER_PAGE);

    // Update displayed data when page changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        const endIndex = Math.min(startIndex + ROWS_PER_PAGE, totalRecords);
        setDisplayData(patientSentForParaclinicalTestTableDummyData.slice(startIndex, endIndex));
    }, [currentPage]);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
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
            {/* Design emergency component here */}
            <BoxContainerTitle>
                Patient Sent For Paraclinical Test
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <DoctorPatientSentForParaclinicalTestOverview patientSentForParaclinicalTestCount={totalRecords} />

                {/* Pagination */}
                <DoctorPatientSentForParaclinicalTestPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
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