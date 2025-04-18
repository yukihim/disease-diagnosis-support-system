import React, { useState, useEffect, useMemo } from 'react';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistAppointmentClock from './receptionistAppointment/receptionistAppointmentClock';
import ReceptionistAppointmentOverview from './receptionistAppointment/receptionistAppointmentOverview'; // Ensure this is imported
import ReceptionistAppointmentPagination from './receptionistAppointment/receptionistAppointmentPagination';
import ReceptionistAppointmentTableHeader from './receptionistAppointment/receptionistAppointmentTableHeader';
import ReceptionistAppointmentTableContent from './receptionistAppointment/receptionistAppointmentTableContent';


const appointmentTableHeader = [
    { name: 'Name', width: '150px' },
    { name: 'Time', width: '70px' },
    { name: 'Dept', width: '80px' }
];

const appointmentTableDummyData = [
    { name: 'Lê Văn A', time: '10:00 AM', dept: 'Lão - Nội' },
    { name: 'Nguyễn Thị Văn A', time: '10:00 AM', dept: 'Lão - Nội' },
    { name: 'Lê Văn B', time: '10:00 AM', dept: 'Lão - Nội' },
    { name: 'Nguyễn Thị Văn B', time: '10:00 AM', dept: 'Lão - Nội' },
    { name: 'Lê Văn C', time: '10:00 AM', dept: 'Lão - Nội' },
    { name: 'Nguyễn Thị Văn C', time: '11:00 AM', dept: 'Lão - Ngoại' },
    { name: 'Lê Văn D', time: '11:00 AM', dept: 'Lão - Ngoại' },
];

const ROWS_PER_PAGE_OPTIONS = [2, 4, 6]; // Define options for rows per page

function ReceptionistAppointment() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);

    // Calculate counts (can be memoized if data changes)
    const upcomingAppointmentCount = appointmentTableDummyData.length; // Simple count for now

    // Calculate total pages based on current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(appointmentTableDummyData.length / rowsPerPage);
    }, [rowsPerPage]);

    // Update displayed data when page or rowsPerPage changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, appointmentTableDummyData.length);
        setDisplayData(appointmentTableDummyData.slice(startIndex, endIndex));
    }, [currentPage, rowsPerPage]);

    // Reset to first page when rowsPerPage changes
    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage]);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    function handleRowsPerPageChange(newRowsPerPage) {
        setRowsPerPage(newRowsPerPage);
    }

    return (
        <BoxContainer>
            <BoxContainerTitle>
                Appointment Overview
                <ReceptionistAppointmentClock />
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview - Pass the count */}
                <ReceptionistAppointmentOverview upcomingCount={upcomingAppointmentCount} />

                {/* Pagination */}
                <ReceptionistAppointmentPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    currentRowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />

                {/* Table header */}
                <ReceptionistAppointmentTableHeader appointmentTableHeader={appointmentTableHeader} />

                {/* Table content */}
                <ReceptionistAppointmentTableContent appointmentTableHeader={appointmentTableHeader} appointmentTableData={displayData} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistAppointment;