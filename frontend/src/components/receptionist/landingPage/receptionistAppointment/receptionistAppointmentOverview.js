import React from 'react';
import './style/receptionistAppointmentOverview.css';

import OverviewNumber from '../../../common/overviewNumber';
import OverviewTextBig from '../../../common/overviewTextBig';

function ReceptionistAppointmentOverview({ upcomingCount }) {
    const appointmentText = upcomingCount > 1 ? 'Upcoming Appointments' : 'Upcoming Appointment';

    return (
        <div className="receptionistAppointmentOverview">
            <OverviewNumber>
                {upcomingCount}
            </OverviewNumber>
            <OverviewTextBig>
                {appointmentText}
            </OverviewTextBig>
        </div>
    );
}

export default ReceptionistAppointmentOverview;