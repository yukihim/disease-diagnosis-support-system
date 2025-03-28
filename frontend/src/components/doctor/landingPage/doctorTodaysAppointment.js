import React from 'react';
import { useHistory } from 'react-router-dom';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorTodaysAppointmentOverview from './doctorTodaysAppointment/doctorTodaysAppointmentOverview';
import DoctorTodaysAppointmentPagination from './doctorTodaysAppointment/doctorTodaysAppointmentPagination';
import DoctorTodaysAppointmentTableHeader from './doctorTodaysAppointment/doctorTodaysAppointmentTableHeader';
import DoctorTodaysAppointmentTableContent from './doctorTodaysAppointment/doctorTodaysAppointmentTableContent';

const todaysAppointmentTableHeader = [
    { name: 'Name', width: '130px' },
    { name: 'Time', width: '70px' },
    { name: 'Condition', width: '80px' },
];

const todaysAppointmentTableDummyData = [
    { name: 'Lê Văn A', time: '07:00 AM', condition: 'Blood Sugar' },
    { name: 'Lê Văn A', time: '07:00 AM', condition: 'Blood Sugar' },
    { name: 'Lê Văn A', time: '07:00 AM', condition: 'Blood Sugar' },
    { name: 'Lê Văn A', time: '07:00 AM', condition: 'Blood Sugar' },
    { name: 'Lê Văn A', time: '07:00 AM', condition: 'Blood Sugar' },
];

function DoctorTodaysAppointment() {
    const history = useHistory();

    const todaysAppointmentAmountCount = 12;

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
                Patient Sent For Paraclinical Test
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <DoctorTodaysAppointmentOverview todaysAppointmentAmountCount={todaysAppointmentAmountCount} />

                {/* Pagination */}
                <DoctorTodaysAppointmentPagination />

                {/* Table header */}
                <DoctorTodaysAppointmentTableHeader todaysAppointmentTableHeader={todaysAppointmentTableHeader} />

                {/* Table content */}
                <DoctorTodaysAppointmentTableContent todaysAppointmentTableHeader={todaysAppointmentTableHeader} todaysAppointmentTableData={todaysAppointmentTableDummyData} onClickTodaysAppointment={onClickTodaysAppointment} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorTodaysAppointment;