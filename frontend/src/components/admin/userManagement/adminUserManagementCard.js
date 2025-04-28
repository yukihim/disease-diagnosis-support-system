import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Cookies from 'js-cookie'; // Import Cookies
import './style/adminUserManagementCard.css';
import { generatePassword } from '../../../utils/admin/utils'; // Import the function

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';


// --- IMPORTANT ---
// Store these securely, ideally via environment variables
const EMAILJS_SERVICE_ID = 'service_1hcvss7';
const EMAILJS_TEMPLATE_ID = 'template_ivgz5qi'; // Template configured for deletion notification
const EMAILJS_PUBLIC_KEY = 'Gk5db20IwPdzTF_mh';
// --- ----------- ---


function AdminUserManagementCard() {
    const history = useHistory();
    const location = useLocation();
    const userInfoFromState = location.state || {};
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const token = Cookies.get('token');
    
    // --- Helper function to send email ---
    const sendNotificationEmail = (templateParams) => {
        console.log("Attempting to send email:", templateParams);
        return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
    };

    // --- Change Password Handler ---
    const onClickChangePassword = async () => {
        setIsLoading(true);
        if (!token || !userInfoFromState.userId) {
            setIsLoading(false);
            return; // Stop if no token or userId
        }

        const newPassword = generatePassword();

        try {
            // 1. Call API to update password
            const response = await fetch(`http://localhost:5001/admin/user_mangement/${userInfoFromState.userId}/password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newPassword: newPassword }) // Send new password in body
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || `HTTP error! status: ${response.status}`);
            }

            console.log("API Password Update Response:", result.message);

            // 2. If API call is successful, attempt to send email
            const templateParams = {
                subject: 'Account Password Update Notification',
                userName: userInfoFromState.userName,
                message: `Your password has been updated by an administrator. Your new temporary password is: ${newPassword}`,
                receiverEmail: userInfoFromState.userEmail,
                senderName: 'System Admin',
            };

            try {
                await sendNotificationEmail(templateParams);
                console.log('SUCCESS! EmailJS Response received.');
                alert("Password changed and notification email sent successfully.");
            } catch (emailError) {
                console.error('FAILED... EmailJS Error:', emailError);
                alert("Password changed successfully, but failed to send notification email. Please inform the user manually.");
            }

        } catch (error) {
            console.error("Error changing password:", error);
            alert(`Error: ${error.message || 'Failed to change password.'}`);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Delete User Handler ---
    const onClickDelete = async () => {
        const isConfirmed = window.confirm(`Are you sure you want to delete the account for ${userInfoFromState.userName}? This action cannot be undone.`);
        if (!isConfirmed) {
            alert("Account deletion cancelled.");
            return;
        }

        setIsLoading(true);
        if (!token || !userInfoFromState.userId) {
            setIsLoading(false);
            return; // Stop if no token or userId
        }

        try {
            // 1. Call API to delete user
            const response = await fetch(`http://localhost:5001/admin/user_mangement/${userInfoFromState.userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || `HTTP error! status: ${response.status}`);
            }

            console.log("API User Deletion Response:", result.message);

            // 2. If API deletion is successful, attempt to send email (if email exists)
            if (userInfoFromState.userEmail) {
                const templateParams = {
                    subject: 'Account Deletion Notification',
                    userName: userInfoFromState.userName,
                    message: 'Your account has been deleted from the system by an administrator.',
                    receiverEmail: userInfoFromState.userEmail,
                    senderName: 'System Admin',
                };
                try {
                    await sendNotificationEmail(templateParams);
                    console.log('SUCCESS! EmailJS Response received.');
                    alert("Account deleted and notification email sent successfully.");
                } catch (emailError) {
                    console.error('FAILED... EmailJS Error:', emailError);
                    alert("Account deleted, but failed to send notification email.");
                }
            } else {
                alert("Account deleted successfully (notification email not sent - missing email address).");
            }

            // 3. Redirect to homepage after successful deletion and email attempt
            history.push('/admin/homepage');

        } catch (error) {
            console.error("Error deleting user:", error);
            alert(`Error: ${error.message || 'Failed to delete user.'}`);
            setIsLoading(false); // Only set loading false here on error, otherwise redirect happens
        }
        // No finally block needed here as redirect handles the success case
    };

    return (
        <BoxContainer className='adminUserManagementCardBox'>
            <BoxContainerTitle className='adminUserManagementCardTitle'>
                Account Management
            </BoxContainerTitle>

            <BoxContainerContent className='adminUserManagementCardContent'>
                {/* Change Username Button */}
                {/* <button className="btn-change" onClick={onClickChangeUsername}>Change Username</button> */}

                {/* Change Password Button */}
                <button className="btn-change" onClick={onClickChangePassword}>Change Password</button>

                {/* Delete Button */}
                <button className="btn-delete" onClick={onClickDelete}>Delete</button>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default AdminUserManagementCard;