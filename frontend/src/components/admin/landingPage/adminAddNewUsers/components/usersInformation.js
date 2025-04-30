import React, { useState } from 'react';
import Cookies from 'js-cookie';
import emailjs from '@emailjs/browser';
import './style/usersInformation.css';
import { useHistory } from 'react-router-dom';

import Button from '../../../../common/button';
import ButtonText from '../../../../common/buttonText';
import { generatePassword } from '../../../../../utils/admin/utils'; // Import the function

// Replace with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_1hcvss7';
const EMAILJS_TEMPLATE_ID = 'template_ivgz5qi'; // Template configured for deletion notification
const EMAILJS_PUBLIC_KEY = 'Gk5db20IwPdzTF_mh';

// Remove the local generatePassword function as it's now imported
// const generatePassword = (length = 12) => { ... };

function UsersInformation() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const roles = ['Doctor', 'Nurse', 'Paraclinical', 'Receptionist', 'Admin'];
    const departments = ['Lão - Ngoại', 'Lão - Nội', 'Hồi sức cấp cứu'];
    const rooms = ['301', '302', '303'];

    const sendCreationEmail = (newUser) => {
        const templateParams = {
            subject: 'Account Creation Notification',
            userName: newUser.username,
            message: `Account created successfully for ${newUser.username}. Your password is: ${newUser.password}`,
            receiverEmail: newUser.email,
            senderName: 'Admin',
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
            .then((response) => {
                console.log('SUCCESS! EmailJS Response:', response.status, response.text);
                window.location.reload()
                // alert("User created and notification email sent successfully.");
            }, (error) => {
                console.error('FAILED... EmailJS Error:', error);
                window.location.reload()
                // alert(`User created successfully, but failed to send notification email to ${newUser.email}. Please inform the user manually. Password: ${newUser.password}`);
            });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        // Use the imported generatePassword function
        const generatedPassword = generatePassword();
        const newUser = {
            username,
            password: generatedPassword,
            email,
            role: formatValue(role),
            dept: selectedDept,
            room: selectedRoom,
        };

        try {
            const token = Cookies.get('token');
            if (!token) {
                alert('Error: Authentication token not found.');
                setIsLoading(false);
                return;
            }

            const response = await fetch('http://localhost:5001/admin/landing_page/add_new_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newUser),
            });

            const result = await response.json();

            if (response.ok) {
                alert(`User ${newUser.username} created successfully!`);
                sendCreationEmail(newUser);
                setUsername('');
                setEmail('');
                setRole('');
                setSelectedDept('');
                setSelectedRoom('');
                // Optionally redirect: history.push('/admin/homepage');
                // window.location.reload()
            } else {
                alert(`Error: ${result.message || 'Failed to add user.'}`);
            }
        } catch (error) {
            console.error("Error adding user:", error);
            alert('Error: An unexpected error occurred while adding the user.');
        } finally {
            setIsLoading(false);
        }
    };

    const formatValue = (value) => value ? value.toLowerCase().replace(/[\s-]/g, '_') : '';

    return (
        <form onSubmit={handleSubmit} className="usersInformationForm">
            {/* Form fields remain the same */}
            <div className="inputGroup">
                <label htmlFor="username">Username:</label>
                <input
                    className='inputField'
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email:</label>
                <input
                    className='inputField'
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="dept">Department:</label>
                <select
                    className='inputField'
                    id="dept"
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    required
                    disabled={isLoading}
                >
                    <option value="" disabled>Select a department</option>
                    {departments.map((d) => (
                        <option className='optionsStyle' key={d} value={(d)}>
                            {d}
                        </option>
                    ))}
                </select>
            </div>
            <div style={{ display: 'grid', height: '100%', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="inputGroup">
                    <label htmlFor="role">Role:</label>
                    <select
                        className='inputField'
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        disabled={isLoading}
                    >
                        <option value="" disabled>Select a role</option>
                        {roles.map((r) => (
                            <option className='optionsStyle' key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="inputGroup">
                    <label htmlFor="room">Room:</label>
                    <select
                        className='inputField'
                        id="room"
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        disabled={isLoading || !role || role.toLowerCase() === 'admin'}
                    >
                        <option value="" disabled>Select a room (if applicable)</option>
                        {rooms.map((r) => (
                            <option className='optionsStyle' key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <Button type="submit" className="addUserButton" onClick={handleSubmit} disabled={isLoading}>
                <ButtonText> {isLoading ? 'Adding...' : 'Add User'} </ButtonText>
            </Button>
        </form>
    );
}

export default UsersInformation;