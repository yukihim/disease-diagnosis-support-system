import React from 'react';
import './style/incomingPatientOverview.css';

import IncomingPatientToDoctorAmount from './components/incomingPatientToDoctorAmount';

function IncomingPatientOverview({ currentFilter, incomingPatientCount }) {
    return (
        <div className="incomingPatientOverview">
            <IncomingPatientToDoctorAmount
                currentFilter={currentFilter}
                incomingPatientCount={incomingPatientCount}
            />
        </div>
    );
}

export default IncomingPatientOverview;