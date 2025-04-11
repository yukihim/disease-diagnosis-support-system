import React from 'react';
import './style/usersOverview.css';

import UsersOverviewAmount from './components/UsersOverviewAmount';

function UsersOverview({ userCount }) {
    return (
        <div className="usersOverview">
            <UsersOverviewAmount userCount={userCount} />
        </div>
    );
}

export default UsersOverview;