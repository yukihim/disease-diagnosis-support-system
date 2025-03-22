import React from 'react';
import './style/emergencyAssignedCase.css';

import OverviewNumber from '../../../../common/overviewNumber';
import OverviewText from './overviewText';

function EmergencyAssignedCase() {
    return (
        <div className="emergencyAssignedCase">
            <OverviewNumber>
                1
            </OverviewNumber>
            <OverviewText>
                Assigned Case(s)
            </OverviewText>
        </div>
    );
}

export default EmergencyAssignedCase;