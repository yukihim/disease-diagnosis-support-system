import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistTodaysPastAppointmentOverview from './receptionistTodaysPastAppointment/receptionistTodaysPastAppointmentOverview'; // Import Overview
import ReceptionistTodaysPastAppointmentPagination from './receptionistTodaysPastAppointment/receptionistTodaysPastAppointmentPagination';
import ReceptionistTodaysPastAppointmentHeader from './receptionistTodaysPastAppointment/receptionistTodaysPastAppointmentHeader';
import ReceptionistTodaysPastAppointmentContent from './receptionistTodaysPastAppointment/receptionistTodaysPastAppointmentContent';

const pastAppointmentTableHeader = [
    { name: 'Name', width: '130px' },
    { name: 'Time', width: '70px' },
    { name: 'Status', width: '80px' },
];

const pastAppointmentTableDummyData = [
    { name: 'Lê Văn A', time: '07:00 AM', status: 'Checked' },
    { name: 'Lê Văn B', time: '07:15 AM', status: 'Unchecked' },
    { name: 'Lê Văn C', time: '07:30 AM', status: 'Checked' },
    { name: 'Lê Văn D', time: '07:45 AM', status: 'Checked' },
    { name: 'Lê Văn E', time: '08:00 AM', status: 'Unchecked' },
    { name: 'Lê Văn F', time: '08:15 AM', status: 'Checked' },
];

const ROWS_PER_PAGE_OPTIONS = [2, 4, 6]; // Define options for rows per page

function ReceptionistTodaysPastAppointment() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]); // Default to the first option (2)

    // Calculate count (can be memoized if data changes)
    const pastAppointmentCount = pastAppointmentTableDummyData.length;

    // Calculate total pages based on current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(pastAppointmentTableDummyData.length / rowsPerPage);
    }, [rowsPerPage]); // Recalculate when rowsPerPage changes

    // Update displayed data when page or rowsPerPage changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, pastAppointmentTableDummyData.length);
        setDisplayData(pastAppointmentTableDummyData.slice(startIndex, endIndex));
    }, [currentPage, rowsPerPage]); // Add rowsPerPage dependency

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

    return (
        <BoxContainer>
            <BoxContainerTitle>
                Today's Past Appointment
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview - Pass the calculated count */}
                <ReceptionistTodaysPastAppointmentOverview pastAppointmentCount={pastAppointmentCount} />

                {/* Pagination - Add rows per page functionality */}
                <ReceptionistTodaysPastAppointmentPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS} // Pass options
                    currentRowsPerPage={rowsPerPage} // Pass current value
                    onRowsPerPageChange={handleRowsPerPageChange} // Pass handler
                />

                {/* Table header */}
                <ReceptionistTodaysPastAppointmentHeader pastAppointmentTableHeader={pastAppointmentTableHeader} />

                {/* Table content */}
                <ReceptionistTodaysPastAppointmentContent pastAppointmentTableHeader={pastAppointmentTableHeader} pastAppointmentTableData={displayData} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistTodaysPastAppointment;