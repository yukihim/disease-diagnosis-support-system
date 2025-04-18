import React from 'react';
import './style/emergencyAssignedCase.css';

import OverviewNumber from '../../../../common/overviewNumber';
import OverviewText from '../../../../common/overviewText';

// Accept count as a prop
function EmergencyAssignedCase({ count }) {
    const caseText = count === 1 ? 'Assigned Case' : 'Assigned Case(s)';
    return (
        <div className="emergencyAssignedCase">
            <OverviewNumber>
                {count} {/* Display the count prop */}
            </OverviewNumber>
            <OverviewText>
                {caseText} {/* Use dynamic text */}
            </OverviewText>
        </div>
    );
}

export default EmergencyAssignedCase;