import React from 'react';
import { useHistory } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './style/adminUserManagementCard.css';

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
        // --- Send Email using EmailJS ---
        const templateParams = {
            subject: 'Account Password Update Notification',
            userName: 'User',
            message: 'Your password has been updated.',
            receiverEmail: 'quan.phamarthur66@hcmut.edu.vn',
            senderName: 'Admin',
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
            .then((response) => {
               console.log('SUCCESS! EmailJS Response:', response.status, response.text);
               alert("Password changed successfully");
            }, (error) => {
               console.error('FAILED... EmailJS Error:', error);
               alert("Password changed successfully, but failed to send notification email. Please check console for details.");
            });
    }

    const onClickDelete = () => {
        // Show a confirmation dialog and get user's response
        const isConfirmed = window.confirm("Are you sure you want to delete this account?");
        
        if (isConfirmed) {
            alert("Account deletion confirmed");

            // --- Send Email using EmailJS ---
            const templateParams = {
                subject: 'Account Deletion Notification',
                userName: 'User',
                message: 'An account has been deleted from the system.',
                receiverEmail: 'quan.phamarthur66@hcmut.edu.vn',
                senderName: 'Admin',
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
                .then((response) => {
                   console.log('SUCCESS! EmailJS Response:', response.status, response.text);
                   alert("Account deleted and notification email sent successfully.");
                   // Proceed with redirecting only after successful deletion AND email attempt
                   history.push('/admin/homepage');
                }, (error) => {
                   console.error('FAILED... EmailJS Error:', error);
                   alert("Account deleted, but failed to send notification email. Please check console for details.");
                   // Decide if you still want to redirect even if email fails
                   history.push('/admin/homepage');
                });
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