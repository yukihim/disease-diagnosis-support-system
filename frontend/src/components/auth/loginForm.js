// File: src/components/LoginForm.js
import './style/loginForm.css';
import Logo from '../../assets/images/Logo.png';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const role_landing_page = {
    'doctor': '/doctor/homepage',
    'admin': '/admin/homepage',
}

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError('');

    //     try {
    //         const response = await fetch('http://localhost:5000/authentication/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ username: email, password }),
    //         });

    //         const data = await response.json();
    //         console.log('Response status:', response.status);
    //         console.log('Response data:', data);
            
    //         if (response.status === 200) {
    //             // With HTTP-only cookies, we don't store the token in localStorage anymore
    //             // We just need the role for redirection
    //             const role = data.role;
    //             console.log('User role:', role);
    
    //             // Redirect based on the user role
    //             history.push(role_landing_page[role]);
    //         } else if (response.status === 400) {
    //             setError('Wrong username or password. Please check your credentials.');
    //             console.error('Authentication error:', data);
    //         }
    //     } catch (err) {
    //         console.error('Error during login:', err);
    //         setError('An error occurred. Please try again.');
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await fetch('http://localhost:5001/authentication/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password }),
            });
    
            const data = await response.json();
            console.log('Response status:', response.status);
            console.log('Response data:', data);
            
            if (response.status === 200) {
                // Store the token in localStorage (or you could use HTTP-only cookies instead)
                localStorage.setItem('token', data.access_token);
                
                // Decode the JWT token to get the role
                const tokenPayload = JSON.parse(atob(data.access_token.split('.')[1]));
                const role = tokenPayload.role;
                console.log('User role:', role);
    
                // Redirect based on the user role
                history.push(role_landing_page[role]);
            } else if (response.status === 400) {
                setError('Wrong username or password. Please check your credentials.');
                console.error('400 - Authentication error:', data);
            }
        } catch (err) {
            console.error('Error during login:', err);
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
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter Email/Username..."
                />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter Password..."
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;