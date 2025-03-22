import React from 'react';
import './style/upcomingAppointment.css';

import OverviewNumber from '../../../../common/overviewNumber';
import OverviewTextAppointmentOverview from './overviewTextAppointmentOverview';

function UpcomingAppointment() {
    return (
        <div className="upcomingAppointment">
            <OverviewNumber>
                12
            </OverviewNumber>
            <OverviewTextAppointmentOverview>
                Upcoming Appointments
            </OverviewTextAppointmentOverview>
        </div>
    );
}

export default UpcomingAppointment;