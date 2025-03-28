import React from 'react';
import './style/todaysAppointmentAmount.css';

import OverviewNumber from '../../../../common/overviewNumber';
import OverviewTextBig from '../../../../common/overviewTextBig';

function TodaysAppointmentAmount({ todaysAppointmentAmountCount }) {
    const textContent = todaysAppointmentAmountCount > 1 ? "Appointments Left" : "Appointment Left";
        
    return (
        <div className="todaysAppointmentAmount">
            <OverviewNumber>
                {todaysAppointmentAmountCount}
            </OverviewNumber>
            <OverviewTextBig>
                {textContent}
            </OverviewTextBig>
        </div>
    );
}

export default TodaysAppointmentAmount;