import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import { useHistory } from 'react-router-dom';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorInpatientMonitoringOverview from './doctorMonitoringInpatient/doctorInpatientMonitoringOverview';
import DoctorInpatientMonitoringPagination from './doctorMonitoringInpatient/doctorInpatientMonitoringPagination'; // Ensure this is imported
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
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong A', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong B', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong C', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong D', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong E', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong F', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
];

const ROWS_PER_PAGE_OPTIONS = [3, 5, 7]; // Define options for rows per page

function DoctorInpatientMonitoring({ userRole }) {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[1]); // Default to 5 (index 1)

    // Calculate total count
    const totalRecords = inpatientMonitoringTableDummyData.length;

    // Calculate total pages based on current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(totalRecords / rowsPerPage);
    }, [totalRecords, rowsPerPage]); // Recalculate when count or rowsPerPage changes

    // Update displayed data when page or rowsPerPage changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalRecords);
        setDisplayData(inpatientMonitoringTableDummyData.slice(startIndex, endIndex));
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

    function onClickInpatientMonitoring(patient) {
        // Navigate to the next page with patient information
        history.push({
            pathname: '/doctor/inpatient_monitoring',
            state: {
                patientName: patient.name,
                userRole: userRole,
                // Pass other relevant patient data if needed
                patientSex: patient.sex,
                patientAge: patient.age,
                patientRoom: patient.room,
                admissionDate: patient.admissionDate,
                condition: patient.condition,
                status: patient.status
            }
        });
    }

    return (
        <BoxContainer className='bigBox'>
            <BoxContainerTitle>
                Inpatient Monitoring
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <DoctorInpatientMonitoringOverview inpatientMonitoringCount={totalRecords} />

                {/* Pagination - Pass new props */}
                <DoctorInpatientMonitoringPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS} // Pass options
                    currentRowsPerPage={rowsPerPage} // Pass current value
                    onRowsPerPageChange={handleRowsPerPageChange} // Pass handler
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