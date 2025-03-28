import React from 'react';
import './style/upcomingAppointment.css';

import OverviewNumber from '../../../../common/overviewNumber';
import OverviewTextBig from '../../../../common/overviewTextBig';

function UpcomingAppointment() {
    return (
        <div className="upcomingAppointment">
            <OverviewNumber>
                12
            </OverviewNumber>
            <OverviewTextBig>
                Upcoming Appointments
            </OverviewTextBig>
        </div>
    );
}

export default UpcomingAppointment;