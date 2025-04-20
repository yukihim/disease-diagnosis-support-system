import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import { useHistory } from 'react-router-dom';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorTodaysAppointmentOverview from './doctorTodaysAppointment/doctorTodaysAppointmentOverview';
import DoctorTodaysAppointmentPagination from './doctorTodaysAppointment/doctorTodaysAppointmentPagination'; // Ensure this is imported
import DoctorTodaysAppointmentTableHeader from './doctorTodaysAppointment/doctorTodaysAppointmentTableHeader';
import DoctorTodaysAppointmentTableContent from './doctorTodaysAppointment/doctorTodaysAppointmentTableContent';

const todaysAppointmentTableHeader = [
    { name: 'Name', width: '150px' },
    { name: 'Time', width: '70px' },
    { name: 'Condition', width: '80px' },
];

const todaysAppointmentTableDummyData = [
    { name: 'Lê Văn A', time: '07:00 AM', condition: 'Blood Sugar' },
    { name: 'Lê Văn B', time: '07:10 AM', condition: 'Blood Sugar' },
    { name: 'Lê Văn C', time: '07:20 AM', condition: 'Blood Sugar' },
    { name: 'Lê Văn D', time: '07:30 AM', condition: 'Blood Sugar' },
    { name: 'Lê Văn E', time: '07:40 AM', condition: 'Blood Sugar' },
    { name: 'Lê Văn F', time: '07:50 AM', condition: 'Blood Sugar' },
    { name: 'Lê Văn G', time: '08:00 AM', condition: 'Blood Sugar' },
    { name: 'Lê Văn H', time: '08:10 AM', condition: 'Blood Sugar' },
    { name: 'Lê Văn I', time: '08:20 AM', condition: 'Blood Sugar' },
    { name: 'Lê Văn J', time: '08:30 AM', condition: 'Blood Sugar' },
    { name: 'Lê Văn K', time: '08:40 AM', condition: 'Blood Sugar' },
];

const ROWS_PER_PAGE_OPTIONS = [3, 5, 7]; // Define options for rows per page

function DoctorTodaysAppointment() {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[1]); // Default to 5 (index 1)

    // Calculate total count
    const totalRecords = todaysAppointmentTableDummyData.length;

    // Calculate total pages based on current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(totalRecords / rowsPerPage);
    }, [totalRecords, rowsPerPage]); // Recalculate when count or rowsPerPage changes

    // Update displayed data when page or rowsPerPage changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalRecords);
        setDisplayData(todaysAppointmentTableDummyData.slice(startIndex, endIndex));
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

    function onClickTodaysAppointment(patient) {
        // Navigate to the next page with patient information
        // Update pathname and state as needed for doctor's workflow
        // history.push({
        //     pathname: '/doctor/diagnosis', // Example path, adjust as necessary
        //     state: {
        //         patientName: patient.name,
        //         appointmentTime: patient.time,
        //         condition: patient.condition
        //         // Add other relevant patient data if needed
        //     }
        // });
        console.log('Clicked on appointment:', patient);
    }

    return (
        <BoxContainer>
            <BoxContainerTitle>
                Today's Appointment
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <DoctorTodaysAppointmentOverview todaysAppointmentAmountCount={totalRecords} />

                {/* Pagination - Pass new props */}
                <DoctorTodaysAppointmentPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS} // Pass options
                    currentRowsPerPage={rowsPerPage} // Pass current value
                    onRowsPerPageChange={handleRowsPerPageChange} // Pass handler
                />

                {/* Table header */}
                <DoctorTodaysAppointmentTableHeader todaysAppointmentTableHeader={todaysAppointmentTableHeader} />

                {/* Table content */}
                <DoctorTodaysAppointmentTableContent
                    todaysAppointmentTableHeader={todaysAppointmentTableHeader}
                    todaysAppointmentTableData={displayData}
                    onClickTodaysAppointment={onClickTodaysAppointment}
                />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorTodaysAppointment;