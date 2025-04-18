import React from 'react';
import './style/usersOverview.css';

import UsersOverviewAmount from './components/usersOverviewAmount';

function UsersOverview({ userCount, doctorCount, nurseCount, paraclinicalCount, adminCount }) {
    return (
        <div className="usersOverview">
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Total Users */}
                <UsersOverviewAmount userCount={userCount} />

                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Total Doctors */}
                    <UsersOverviewAmount userRole="doctor" userCount={doctorCount} />

                    {/* Total Nurses */}
                    <UsersOverviewAmount userRole="nurse" userCount={nurseCount} />

                    {/* Total Paraclinical Technicians */}
                    <UsersOverviewAmount userRole="paraclinical" userCount={paraclinicalCount} />

                    {/* Total Admins */}
                    <UsersOverviewAmount userRole="admin" userCount={adminCount} />
                </div>
            </div>
        </div>
    );
}

export default UsersOverview;