import React from 'react';
import './style/receptionistAppointmentOverview.css';

import UpcomingAppointment from './components/upcomingAppointment';

function ReceptionistAppointmentOverview() {
    return (
        <div className="receptionistAppointmentOverview">
            <UpcomingAppointment />
        </div>
    );
}

export default ReceptionistAppointmentOverview;