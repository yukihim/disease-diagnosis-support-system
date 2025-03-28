import React from 'react';

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
    return (
        <BoxContainer>
            <BoxContainerTitle>
                Today's Past Appointment
            </BoxContainerTitle>
            
            <BoxContainerContent>
                {/* Pagination */}
                <ReceptionistTodaysPastAppointmentPagination />

                {/* Table header */}
                <ReceptionistTodaysPastAppointmentHeader pastAppointmentTableHeader={pastAppointmentTableHeader} />

                {/* Table content */}
                <ReceptionistTodaysPastAppointmentContent pastAppointmentTableHeader={pastAppointmentTableHeader} pastAppointmentTableData={pastAppointmentTableDummyData} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistTodaysPastAppointment;
