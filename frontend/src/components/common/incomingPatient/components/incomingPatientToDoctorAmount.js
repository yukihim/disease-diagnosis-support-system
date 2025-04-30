import React from 'react';
import './style/incomingPatientToDoctorAmount.css';

import OverviewNumber from '../../overviewNumber';
import OverviewTextBig from '../../overviewTextBig';

function IncomingPatientToDoctorAmount({ currentFilter, incomingPatientCount }) {
    let textContent;
    if (currentFilter === "Test Result Ready") {
        textContent = incomingPatientCount > 1 ? "Test Result Ready Patients" : "Test Result Ready Patient";
    } else if (currentFilter === "Waiting For Result") {

        textContent = incomingPatientCount > 1 ? "Waiting For Result Patients" : "Waiting For Result Patient";
    } else if (currentFilter === "Waiting For Test") {
        textContent = incomingPatientCount > 1 ? "Waiting For Test Patients" : "Waiting For Test Patient";
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