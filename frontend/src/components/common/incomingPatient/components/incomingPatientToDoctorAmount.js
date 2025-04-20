import React from 'react';
import './style/incomingPatientToDoctorAmount.css';

import OverviewNumber from '../../overviewNumber';
import OverviewTextBig from '../../overviewTextBig';

function IncomingPatientToDoctorAmount({ showingResultReadyPatients=false, incomingPatientCount }) {
    let textContent;
    if (showingResultReadyPatients) {
        textContent = incomingPatientCount > 1 ? "Test Result Ready Patients" : "Test Result Ready Patient";
    } else {
        textContent = incomingPatientCount > 1 ? "Incoming Patients" : "Incoming Patient";
    }
    // const textContent = incomingPatientCount > 1 ? "Incoming Patients" : "Incoming Patient";
    
    return (
        <div className="incomingPatientToDoctorAmount">
            <OverviewNumber>
                {incomingPatientCount}
            </OverviewNumber>
            <OverviewTextBig>
                {textContent}
            </OverviewTextBig>
        </div>
    );
}

export default IncomingPatientToDoctorAmount;