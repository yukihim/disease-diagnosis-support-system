import React from 'react';
import { useLocation } from 'react-router-dom';
import './style/adminUserInformationCard.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import UserInformationForm from './adminUserInformation/userInformationForm';

const initialUserInformationHolder = [
    {
        "Name": "Phuong Xuong Thinh",
        "Role": "Doctor",
        "Room": "220",
        "Dept": "Lão - Nội",
    },
    {
        "Name": "Phuong Xuong B",
        "Role": "Nurse",
        "Room": "222",
        "Dept": "Lão - Nội",
    },
    {
        "Name": "Phuong Xuong C",
        "Role": "Paraclinical Technician",
        "Room": "223",
        "Dept": "Lão - Ngoại",
    }
];

function AdminUserInformationCard() {
    const location = useLocation();
    const { userName } = location.state || {};

    // Use find instead of map to get a single patient object
    const userInformation = initialUserInformationHolder.find(user => 
        user.Name === userName
    ) || null;
    
    return (
        <BoxContainer className='adminUserInformationCardBox'>
            <BoxContainerTitle className='adminUserInformationCardTitle'>
                {userInformation.Role} {userName}'s Information
            </BoxContainerTitle>

            <BoxContainerContent className='adminUserInformationCardContent'>
                {/* User Information */}
                <UserInformationForm userInformation={userInformation} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default AdminUserInformationCard;