import React from 'react';
import './style/receptionistEmergencyOverview.css';

import EmergencyUnassignedCase from './components/emergencyUnassignedCase';
import EmergencyAssignedCase from './components/emergencyAssignedCase';

function ReceptionistEmergencyOverview() {
    return (
        <div className="receptionistEmergencyOverview">
            <EmergencyUnassignedCase />
            <EmergencyAssignedCase />
        </div>
    );
}

export default ReceptionistEmergencyOverview;