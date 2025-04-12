import React, { useState, useEffect } from 'react';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

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
    { name: 'Lê Văn A', time: '07:00 AM', status: 'Unchecked' },
    { name: 'Lê Văn A', time: '07:00 AM', status: 'Checked' },
    { name: 'Lê Văn A', time: '07:00 AM', status: 'Checked' },
    { name: 'Lê Văn A', time: '07:00 AM', status: 'Checked' },
];

function ReceptionistTodaysPastAppointment() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    
    // Pagination settings
    const ROWS_PER_PAGE = 4;
    const totalRecords = pastAppointmentTableDummyData.length;
    const totalPages = Math.ceil(totalRecords / ROWS_PER_PAGE);

    // Update displayed data when page changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        const endIndex = Math.min(startIndex + ROWS_PER_PAGE, totalRecords);
        setDisplayData(pastAppointmentTableDummyData.slice(startIndex, endIndex));
    }, [currentPage]);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }
    
    return (
        <BoxContainer>
            <BoxContainerTitle>
                Today's Past Appointment
            </BoxContainerTitle>
            
            <BoxContainerContent>
                {/* Pagination */}
                <ReceptionistTodaysPastAppointmentPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
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
