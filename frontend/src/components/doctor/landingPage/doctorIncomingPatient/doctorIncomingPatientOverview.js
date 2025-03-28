import React from 'react';
import './style/doctorIncomingPatientOverview.css';

import IncomingPatientToDoctorAmount from './components/incomingPatientToDoctorAmount';

function DoctorIncomingPatientOverview({ incomingPatientCount }) {
    return (
        <div className="doctorIncomingPatientOverview">
            <IncomingPatientToDoctorAmount incomingPatientCount={incomingPatientCount} />
        </div>
    );
}

export default DoctorIncomingPatientOverview;