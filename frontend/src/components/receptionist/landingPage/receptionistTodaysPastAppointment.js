import React from 'react';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistTodaysPastAppointmentPagination from './receptionistTodaysPastAppointment/receptionistTodaysPastAppointmentPagination';
import ReceptionistTodaysPastAppointmentHeader from './receptionistTodaysPastAppointment/receptionistTodaysPastAppointmentHeader';
import ReceptionistTodaysPastAppointmentContent from './receptionistTodaysPastAppointment/receptionistTodaysPastAppointmentContent';

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
                <ReceptionistTodaysPastAppointmentHeader />

                {/* Table content */}
                <ReceptionistTodaysPastAppointmentContent />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistTodaysPastAppointment;
