import React from 'react';
import './style/userInformationForm.css';

import SpecificInformationItemWrapper from '../../../common/specificInformationItemWrapper';

// Update the keys to match the properties passed in the navigation state
const userFields = [
    { key: "userName", label: "Name" },
    { key: "userRole", label: "Role" },
    { key: "userRoom", label: "Room" },
    { key: "userDept", label: "Department" }
];

function UserInformationForm({ userInformation }) {
    // Add a check in case userInformation is null or undefined
    if (!userInformation) {
        return <div className="userInformationForm">Loading user data...</div>;
    }

    return (
        <div className="userInformationForm">
            {userFields.map(field => (
                <SpecificInformationItemWrapper
                    key={field.key}
                    item={field.label}
                    // Access data using the correct keys from the userInformation object
                    // Add check for undefined/null and display 'N/A'
                    itemValue={userInformation[field.key] !== undefined && userInformation[field.key] !== null ? userInformation[field.key] : 'N/A'}
                />
            ))}
        </div>
    );
}

export default UserInformationForm;