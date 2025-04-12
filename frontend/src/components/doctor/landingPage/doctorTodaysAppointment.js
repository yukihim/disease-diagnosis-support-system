import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorTodaysAppointmentOverview from './doctorTodaysAppointment/doctorTodaysAppointmentOverview';
import DoctorTodaysAppointmentPagination from './doctorTodaysAppointment/doctorTodaysAppointmentPagination';
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

function DoctorTodaysAppointment() {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);

    // Pagination settings
    const ROWS_PER_PAGE = 5;
    const totalRecords = todaysAppointmentTableDummyData.length;
    const totalPages = Math.ceil(totalRecords / ROWS_PER_PAGE);

    // Update displayed data when page changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        const endIndex = Math.min(startIndex + ROWS_PER_PAGE, totalRecords);
        setDisplayData(todaysAppointmentTableDummyData.slice(startIndex, endIndex));
    }, [currentPage]);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    function onClickTodaysAppointment(patient) {
        // Navigate to the next page with patient information
        history.push({
            pathname: '/receptionist/patient_checkin',
            state: { 
                patientSSN: patient.name,
                patientHealthInsuranceCode: patient.test
            }
        });
    }

    return (
        <BoxContainer>
            {/* Design emergency component here */}
            <BoxContainerTitle>
                Today's Appointment
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <DoctorTodaysAppointmentOverview todaysAppointmentAmountCount={totalRecords} />

                {/* Pagination */}
                <DoctorTodaysAppointmentPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                {/* Table header */}
                <DoctorTodaysAppointmentTableHeader todaysAppointmentTableHeader={todaysAppointmentTableHeader} />

                {/* Table content */}
                <DoctorTodaysAppointmentTableContent todaysAppointmentTableHeader={todaysAppointmentTableHeader} todaysAppointmentTableData={displayData} onClickTodaysAppointment={onClickTodaysAppointment} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorTodaysAppointment;