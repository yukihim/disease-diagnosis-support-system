import React, { useState, useEffect } from 'react';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistAppointmentClock from './receptionistAppointment/receptionistAppointmentClock';
import ReceptionistAppointmentOverview from './receptionistAppointment/receptionistAppointmentOverview';
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
];

function ReceptionistAppointment() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    
    // Pagination settings
    const ROWS_PER_PAGE = 2;
    const totalRecords = appointmentTableDummyData.length;
    const totalPages = Math.ceil(totalRecords / ROWS_PER_PAGE);

    // Update displayed data when page changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        const endIndex = Math.min(startIndex + ROWS_PER_PAGE, totalRecords);
        setDisplayData(appointmentTableDummyData.slice(startIndex, endIndex));
    }, [currentPage]);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    return (
        <BoxContainer>
            <BoxContainerTitle>
                Appointment Overview

                {/* Clock */}
                <ReceptionistAppointmentClock />
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <ReceptionistAppointmentOverview />

                {/* Pagination */}
                <ReceptionistAppointmentPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
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