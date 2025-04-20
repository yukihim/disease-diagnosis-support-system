import React from 'react';
import './style/adminAddNewUsers.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import UsersInformation from './components/usersInformation';

function AdminAddNewUsers() {
    return (
        <BoxContainer className="adminAddNewUsersBox">
            <BoxContainerTitle className="adminAddNewUsers">
                Add New Users
            </BoxContainerTitle>

            <BoxContainerContent className="adminAddNewUsersContent">
                {/* UsersInformation */}
                <UsersInformation />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default AdminAddNewUsers;