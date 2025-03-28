import React from 'react';
import './style/inpatientMonitoringAmount.css';

import OverviewNumber from '../../../../common/overviewNumber';
import OverviewTextBig from '../../../../common/overviewTextBig';

function InpatientMonitoringAmount({ inpatientMonitoringCount }) {
    const textContent = inpatientMonitoringCount > 1 ? "Inpatients Under Monitoring" : "Inpatient Under Monitoring";
    
    return (
        <div className="inpatientMonitoringAmount">
            <OverviewNumber>
                {inpatientMonitoringCount}
            </OverviewNumber>
            <OverviewTextBig>
                {textContent}
            </OverviewTextBig>
        </div>
    );
}

export default InpatientMonitoringAmount;