import React from 'react';
import './style/patientPassSessionsOverview.css';

import OverviewNumber from '../../../common/overviewNumber';
import OverviewTextBig from '../../../common/overviewTextBig';

function PatientPassSessionsOverview({ totalSessionsCount }) {
    const displayText = totalSessionsCount > 1 ? 'Past Sessions' : 'Past Session';

    return (
        <div className="patientPassSessionsOverview">
            <OverviewNumber>
                {totalSessionsCount}
            </OverviewNumber>
            <OverviewTextBig>
                {displayText}
            </OverviewTextBig>
        </div>
    );
}

export default PatientPassSessionsOverview;