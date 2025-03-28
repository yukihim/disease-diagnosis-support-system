import React from 'react';
import PageLayout from '../../components/common/pageLayout';

import Calendar from '../../components/common/calendar';

// Import receptionist landingpage components
import ReceptionistEmergency from '../../components/receptionist/landingPage/receptionistEmergency';
import ReceptionistAppointment from '../../components/receptionist/landingPage/receptionistAppointment';
import ReceptionistTodaysPastAppointment from '../../components/receptionist/landingPage/receptionistTodaysPastAppointment';
import ReceptionistAvailableDoctor from '../../components/receptionist/landingPage/receptionistAvailableDoctor';

function ReceptionistLandingPage() {
    return (
        <PageLayout requiredRole="receptionist">
            <ReceptionistEmergency />
            <ReceptionistAppointment />
            <ReceptionistTodaysPastAppointment />
            <Calendar />
            <ReceptionistAvailableDoctor />
        </PageLayout>
    );
}

export default ReceptionistLandingPage;