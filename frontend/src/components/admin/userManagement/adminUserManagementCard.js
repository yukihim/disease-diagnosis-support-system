import React from 'react';
import { useHistory } from 'react-router-dom';
import './style/adminUserManagementCard.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

function AdminUserManagementCard() {
    const history = useHistory();

    const onClickChangeUsername = () => {
        const newUsername = window.prompt("Enter new username:");
        
        // Check if user clicked Cancel or entered an empty string
        if (newUsername === null || newUsername.trim() === '') {
            alert("Username change cancelled or empty username provided");
            return;
        }
        
        // TODO: Add your username update logic here
        // For example: updateUsername(newUsername);
        
        alert(`Username will be changed to: ${newUsername}`);
        // After successful API call you might want to refresh or redirect
    }
    
    const onClickChangePassword = () => {
        const newPassword = window.prompt("Enter new password:");
        
        // Check if user clicked Cancel or entered an empty string
        if (newPassword === null || newPassword.trim() === '') {
            alert("Password change cancelled or empty password provided");
            return;
        }
        
        // Optional: You might want to add password confirmation
        const confirmPassword = window.prompt("Confirm new password:");
        if (confirmPassword !== newPassword) {
            alert("Passwords do not match!");
            return;
        }
        
        // TODO: Add your password update logic here
        // For example: updatePassword(newPassword);
        
        alert("Password changed successfully");
    }

    const onClickDelete = () => {
        // Show a confirmation dialog and get user's response
        const isConfirmed = window.confirm("Are you sure you want to delete this account?");
        
        if (isConfirmed) {
            // User clicked "OK"
            // Add your account deletion logic here
            alert("Account deletion confirmed");
            // TODO: Implement actual deletion functionality

            history.push('/admin/homepage');
        } else {
            // User clicked "Cancel"
            alert("Account deletion cancelled");
        }
    }

    return (
        <BoxContainer className='adminUserManagementCardBox'>
            <BoxContainerTitle className='adminUserManagementCardTitle'>
                Account Management
            </BoxContainerTitle>

            <BoxContainerContent className='adminUserManagementCardContent'>
                {/* Change Username Button */}
                <button className="btn-change" onClick={onClickChangeUsername}>Change Username</button>

                {/* Change Password Button */}
                <button className="btn-change" onClick={onClickChangePassword}>Change Password</button>

                {/* Delete Button */}
                <button className="btn-delete" onClick={onClickDelete}>Delete</button>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default AdminUserManagementCard;