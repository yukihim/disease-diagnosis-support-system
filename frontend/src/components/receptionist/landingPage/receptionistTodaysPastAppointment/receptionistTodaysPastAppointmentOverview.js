import React from 'react';
import './style/receptionistTodaysPastAppointmentOverview.css';

import OverviewNumber from '../../../common/overviewNumber';
import OverviewTextBig from '../../../common/overviewTextBig';

function ReceptionistTodaysPastAppointmentOverview({ pastAppointmentCount }) {
    const appointmentText = pastAppointmentCount > 1 ? 'Past Appointments' : 'Past Appointment';

    return (
        <div className="receptionistTodaysPastAppointmentOverview">
            <OverviewNumber>
                {pastAppointmentCount}
            </OverviewNumber>
            <OverviewTextBig>
                {appointmentText}
            </OverviewTextBig>
        </div>
    );
}

export default ReceptionistTodaysPastAppointmentOverview;