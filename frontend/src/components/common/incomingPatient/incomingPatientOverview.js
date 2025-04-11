import React from 'react';
import './style/incomingPatientOverview.css';

import IncomingPatientToDoctorAmount from './components/incomingPatientToDoctorAmount';

function IncomingPatientOverview({ incomingPatientCount }) {
    return (
        <div className="incomingPatientOverview">
            <IncomingPatientToDoctorAmount incomingPatientCount={incomingPatientCount} />
        </div>
    );
}

export default IncomingPatientOverview;