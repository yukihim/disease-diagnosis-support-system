import React from 'react';
import './style/userInformationForm.css';

import SpecificInformationItemWrapper from '../../../common/specificInformationItemWrapper';

const userFields = [
    { key: "Name", label: "Name" },
    { key: "Role", label: "Role" },
    { key: "Room", label: "Room" },
    { key: "Dept", label: "Dept" }
];

function UserInformationForm({ userInformation }) {
    return (
        <div className="userInformationForm">
            {userFields.map(field => (
                <SpecificInformationItemWrapper
                    key={field.key}
                    item={field.label}
                    itemValue={userInformation[field.key]}
                />
            ))}
        </div>
    );
}

export default UserInformationForm;