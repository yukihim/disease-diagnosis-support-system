import React from 'react';
import './style/doctorTodaysAppointmentOverview.css';

import TodaysAppointmentAmount from './components/todaysAppointmentAmount';

function DoctorTodaysAppointmentOverview({ todaysAppointmentAmountCount }) {
    return (
        <div className="doctorTodaysAppointmentOverview">
            <TodaysAppointmentAmount todaysAppointmentAmountCount={todaysAppointmentAmountCount} />
        </div>
    );
}

export default DoctorTodaysAppointmentOverview;