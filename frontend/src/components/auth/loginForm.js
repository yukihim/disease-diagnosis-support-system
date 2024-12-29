import './style/loginForm.css';
import Logo from '../../assets/images/Logo.png';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Store the token in localStorage or context
                localStorage.setItem('token', data.access_token);
                // Redirect based on user role
                const role = data.role;
                if (role === 'doctor') {
                    history.push('/doctor/homepage');
                } else {
                    history.push(`/${role}/homepage`);
                }
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="loginPage">
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="logoContainer">
                    <img src={Logo} alt="Logo" />
                </div>
                <label>Email/Username:</label>
                <input type="text" name="email" value={email} onChange={handleEmailChange} placeholder="Enter Email/Username..." />
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Enter Password..." />
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;