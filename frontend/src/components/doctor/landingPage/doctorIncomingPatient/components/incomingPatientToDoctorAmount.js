import React from 'react';
import './style/incomingPatientToDoctorAmount.css';

import OverviewNumber from '../../../../common/overviewNumber';
import OverviewTextBig from '../../../../common/overviewTextBig';

function IncomingPatientToDoctorAmount({ incomingPatientCount }) {
    const textContent = incomingPatientCount > 1 ? "Incoming Patients" : "Incoming Patient";
    
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