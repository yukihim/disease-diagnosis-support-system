import './style/loginForm.css';
import Logo from '../../assets/images/Logo.png';

import React, { useState } from 'react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    return (
        <div className="loginPage">
            <form className="loginForm">
                <div className="logoContainer">
                    <img src={Logo} alt="Logo" />
                </div>
                <label>Email/Username:</label>
                <input type="text" name="email" value={email} onChange={handleEmailChange} placeholder="Enter Email/Username..." />
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Enter Password..." />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;