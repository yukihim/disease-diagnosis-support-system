import React from 'react';
import './style/receptionistEmergencyOverview.css';

import EmergencyUnassignedCase from './components/emergencyUnassignedCase';
import EmergencyAssignedCase from './components/emergencyAssignedCase';

// Accept counts as props
function ReceptionistEmergencyOverview({ unassignedCount, assignedCount }) {
    return (
        <div className="receptionistEmergencyOverview">
            {/* Pass counts to sub-components */}
            <EmergencyUnassignedCase count={unassignedCount} />
            <EmergencyAssignedCase count={assignedCount} />
        </div>
    );
}

export default ReceptionistEmergencyOverview;