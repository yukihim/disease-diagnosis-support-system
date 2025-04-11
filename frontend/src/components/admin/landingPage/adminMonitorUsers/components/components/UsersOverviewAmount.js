import React from 'react';
import './style/usersOverviewAmount.css';

import OverviewNumber from '../../../../../common/overviewNumber';
import OverviewTextBig from '../../../../../common/overviewTextBig';

function UsersOverviewAmount({ userCount }) {
    const textContent = userCount > 1 ? "Users" : "User";
    
    return (
        <div className="usersOverviewAmount">
            <OverviewNumber>
                {userCount}
            </OverviewNumber>
            <OverviewTextBig>
                {textContent}
            </OverviewTextBig>
        </div>
    );
}

export default UsersOverviewAmount;