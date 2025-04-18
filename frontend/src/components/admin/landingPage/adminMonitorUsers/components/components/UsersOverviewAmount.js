import React from 'react';
import './style/usersOverviewAmount.css';

import OverviewNumber from '../../../../../common/overviewNumber';
import OverviewTextBig from '../../../../../common/overviewTextBig';

function UsersOverviewAmount({ userRole='', userCount }) {
    let textContent = "";

    if (userRole === "doctor") {
        textContent = userCount > 1 ? "Doctors" : "Doctor";
    } else if (userRole === "nurse") {
        textContent = userCount > 1 ? "Nurses" : "Nurse";
    } else if (userRole === "paraclinical") {
        textContent = userCount > 1 ? "Paraclinical Technicians" : "Paraclinical Technician";
    } else if (userRole === "admin") {
        textContent = userCount > 1 ? "Admins" : "Admin";
    } else {
        textContent = userCount > 1 ? "Users" : "User";
    }

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