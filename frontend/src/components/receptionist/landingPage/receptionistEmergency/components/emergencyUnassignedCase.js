import React from 'react';
import './style/emergencyUnassignedCase.css';

import OverviewNumber from '../../../../common/overviewNumber';
import OverviewText from './overviewText';

function EmergencyUnassignedCase() {
    return (
        <div className="emergencyUnassignedCase">
            <OverviewNumber className="redNumber">
                2
            </OverviewNumber>
            <OverviewText className="redText">
                Unassigned Case(s)
            </OverviewText>
        </div>
    );
}

export default EmergencyUnassignedCase;