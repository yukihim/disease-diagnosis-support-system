import React from 'react';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistAppointmentClock from './receptionistAppointment/receptionistAppointmentClock';
import ReceptionistAppointmentOverview from './receptionistAppointment/receptionistAppointmentOverview';
import ReceptionistAppointmentPagination from './receptionistAppointment/receptionistAppointmentPagination';
import ReceptionistAppointmentTableHeader from './receptionistAppointment/receptionistAppointmentTableHeader';
import ReceptionistAppointmentTableContent from './receptionistAppointment/receptionistAppointmentTableContent';

function ReceptionistAppointment() {

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
                <ReceptionistAppointmentPagination />

                {/* Table header */}
                <ReceptionistAppointmentTableHeader />

                {/* Table content */}
                <ReceptionistAppointmentTableContent />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistAppointment;