import React from 'react';
import './style/incomingPatientOverview.css';

import IncomingPatientToDoctorAmount from './components/incomingPatientToDoctorAmount';

function IncomingPatientOverview({ showingResultReadyPatients=false, incomingPatientCount }) {
    return (
        <div className="incomingPatientOverview">
            <IncomingPatientToDoctorAmount showingResultReadyPatients={showingResultReadyPatients} incomingPatientCount={incomingPatientCount} />
        </div>
    );
}

export default IncomingPatientOverview;