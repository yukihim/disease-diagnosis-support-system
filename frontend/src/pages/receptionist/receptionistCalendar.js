import React from 'react';
import PageLayout from '../../components/common/pageLayout';

// Import receptionist landingpage components
import ReceptionistAppointment from '../../components/receptionist/landingPage/receptionistAppointment';
import ReceptionistTodaysPastAppointment from '../../components/receptionist/landingPage/receptionistTodaysPastAppointment';

function ReceptionistCalendar() {
    return (
        <PageLayout role="receptionist">
            <ReceptionistAppointment />
            <ReceptionistTodaysPastAppointment />
        </PageLayout>
    );
}

export default ReceptionistCalendar;