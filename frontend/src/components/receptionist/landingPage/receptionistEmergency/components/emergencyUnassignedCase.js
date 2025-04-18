import React from 'react';
import './style/emergencyUnassignedCase.css';

import OverviewNumber from '../../../../common/overviewNumber';
import OverviewText from '../../../../common/overviewText';

// Accept count as a prop
function EmergencyUnassignedCase({ count }) {
    const caseText = count === 1 ? 'Unassigned Case' : 'Unassigned Case(s)';
    return (
        <div className="emergencyUnassignedCase">
            <OverviewNumber className="redNumber">
                {count} {/* Display the count prop */}
            </OverviewNumber>
            <OverviewText className="redText">
                {caseText} {/* Use dynamic text */}
            </OverviewText>
        </div>
    );
}

export default EmergencyUnassignedCase;