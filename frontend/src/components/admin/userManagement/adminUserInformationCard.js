import React from 'react';
import { useLocation } from 'react-router-dom';
import './style/adminUserInformationCard.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import UserInformationForm from './adminUserInformation/userInformationForm';

// Remove the outdated hardcoded data
// const initialUserInformationHolder = [ ... ];

function AdminUserInformationCard() {
    const location = useLocation();
    // Get the whole state object passed from the previous page
    // Provide a default empty object to prevent errors if state is missing
    const userInfoFromState = location.state || {};

    // Check if essential data like userId or userName is present
    if (!userInfoFromState.userId || !userInfoFromState.userName) {
        return (
            <BoxContainer className='adminUserInformationCardBox'>
                <BoxContainerTitle className='adminUserInformationCardTitle'>
                    User Information Error
                </BoxContainerTitle>
                <BoxContainerContent className='adminUserInformationCardContent'>
                    Error: User details not found. Please navigate from the user list.
                </BoxContainerContent>
            </BoxContainer>
        );
    }

    // Capitalize role for display purposes if it exists
    const displayRole = userInfoFromState.userRole
        ? userInfoFromState.userRole.charAt(0).toUpperCase() + userInfoFromState.userRole.slice(1)
        : 'User'; // Default if role is missing

    return (
        <BoxContainer className='adminUserInformationCardBox'>
            <BoxContainerTitle className='adminUserInformationCardTitle'>
                {/* Use the role and name directly from the state */}
                {displayRole} {userInfoFromState.userName}'s Information
            </BoxContainerTitle>

            <BoxContainerContent className='adminUserInformationCardContent'>
                {/* Pass the user information object received from the state */}
                <UserInformationForm userInformation={userInfoFromState} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default AdminUserInformationCard;