import React from 'react';
import './style/patientSentForParaclinicalTestAmount.css';

import OverviewNumber from '../../../../common/overviewNumber';
import OverviewTextBig from '../../../../common/overviewTextBig';

function PatientSentForParaclinicalTestAmount({ patientSentForParaclinicalTestCount }) {
    const textContent = patientSentForParaclinicalTestCount > 1 ? "Patients Undergoing Paraclinical Test" : "Patient Undergoing Paraclinical Test";
        
    return (
        <div className="patientSentForParaclinicalTestAmount">
            <OverviewNumber>
                {patientSentForParaclinicalTestCount}
            </OverviewNumber>
            <OverviewTextBig>
                {textContent}
            </OverviewTextBig>
        </div>
    );
}

export default PatientSentForParaclinicalTestAmount;