import React from 'react';
import './style/doctorInpatientMonitoringOverview.css';

import InpatientMonitoringAmount from './components/inpatientMonitoringAmount';

function DoctorInpatientMonitoringOverview({ inpatientMonitoringCount }) {
    return (
        <div className="doctorInpatientMonitoringOverview">
            <InpatientMonitoringAmount inpatientMonitoringCount={inpatientMonitoringCount} />
        </div>
    );
}

export default DoctorInpatientMonitoringOverview;