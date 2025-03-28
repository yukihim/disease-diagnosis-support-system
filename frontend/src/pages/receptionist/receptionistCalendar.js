import React from 'react';
import PageLayout from '../../components/common/pageLayout';

import Calendar from '../../components/common/calendar';

// Import receptionist landingpage components
import ReceptionistAppointment from '../../components/receptionist/landingPage/receptionistAppointment';
import ReceptionistTodaysPastAppointment from '../../components/receptionist/landingPage/receptionistTodaysPastAppointment';

function ReceptionistCalendar() {
    return (
        <PageLayout requiredRole="receptionist">
            <Calendar />
            <ReceptionistAppointment />
            <ReceptionistTodaysPastAppointment />
        </PageLayout>
    );
}

export default ReceptionistCalendar;