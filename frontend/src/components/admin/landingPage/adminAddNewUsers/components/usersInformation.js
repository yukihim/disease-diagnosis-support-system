import React, { useState } from 'react';
import './style/usersInformation.css';

import Button from '../../../../common/button'; // Assuming you have a Button component
import ButtonText from '../../../../common/buttonText';

function UsersInformation() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(''); // Default role or first option

    const roles = ['Doctor', 'Nurse', 'Paraclinical', 'Receptionist', 'Admin'];

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        
        alert(`User added: ${username}, ${email}, ${role}`); // Example alert for demonstration

        // Example: Call an API to add the new user
    };

    return (
        <form onSubmit={handleSubmit} className="usersInformationForm"> {/* Add a class for styling */}
            <div className="inputGroup">
                <label htmlFor="username">Username:</label>
                <input
                    className='inputField'
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="password">Password:</label>
                <input
                    className='inputField'
                    type="text"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="role">Role:</label>
                <select
                    className='inputField'
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a role</option>
                    {roles.map((r) => (
                        <option className='optionsStyle' key={r} value={r.toLowerCase().replace(' ', '_')}> {/* Use a consistent value format */}
                            {r}
                        </option>
                    ))}
                </select>
            </div>
            <Button type="submit" className="addUserButton" onClick={handleSubmit}>
                <ButtonText> Add User </ButtonText>
            </Button>
        </form>
    );
}

export default UsersInformation;