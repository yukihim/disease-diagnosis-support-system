import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorInpatientMonitoringOverview from './doctorMonitoringInpatient/doctorInpatientMonitoringOverview';
import DoctorInpatientMonitoringPagination from './doctorMonitoringInpatient/doctorInpatientMonitoringPagination';
import DoctorInpatientMonitoringTableHeader from './doctorMonitoringInpatient/doctorInpatientMonitoringTableHeader';
import DoctorInpatientMonitoringTableContent from './doctorMonitoringInpatient/doctorInpatientMonitoringTableContent';

const inpatientMonitoringTableHeader = [
    { name: 'Name', width: '130px' },
    { name: 'Sex', width: '50px' },
    { name: 'Age', width: '30px' },
    { name: 'Room', width: '130px' },
    { name: 'Admission Date', width: '130px' },
    { name: 'Condition', width: '100px' },
    { name: 'Status', width: '70px' }
];

const inpatientMonitoringTableDummyData = [
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong A', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong B', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong C', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong D', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong E', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong F', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
];

function DoctorInpatientMonitoring({ userRole }) {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    
    // Pagination settings
    const ROWS_PER_PAGE = 5;
    const totalRecords = inpatientMonitoringTableDummyData.length;
    const totalPages = Math.ceil(totalRecords / ROWS_PER_PAGE);

    // Update displayed data when page changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        const endIndex = Math.min(startIndex + ROWS_PER_PAGE, totalRecords);
        setDisplayData(inpatientMonitoringTableDummyData.slice(startIndex, endIndex));
    }, [currentPage]);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    function onClickInpatientMonitoring(patient) {
        // Navigate to the next page with patient information
        history.push({
            pathname: '/doctor/inpatient_monitoring',
            state: { 
                patientName: patient.name,
                userRole: userRole,
            }
        });
    }

    return (
        <BoxContainer className='bigBox'>
            {/* Design emergency component here */}
            <BoxContainerTitle>
                Inpatient Monitoring
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <DoctorInpatientMonitoringOverview inpatientMonitoringCount={totalRecords} />

                {/* Pagination */}
                <DoctorInpatientMonitoringPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                {/* Table header */}
                <DoctorInpatientMonitoringTableHeader inpatientMonitoringTableHeader={inpatientMonitoringTableHeader} />

                {/* Table content */}
                <DoctorInpatientMonitoringTableContent inpatientMonitoringTableHeader={inpatientMonitoringTableHeader} inpatientMonitoringTableData={displayData} onClickInpatientMonitoring={onClickInpatientMonitoring} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorInpatientMonitoring;