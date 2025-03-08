import './style/header.css';
import Logo from '../../assets/images/Logo.png';
import React from 'react';
import { useHistory } from 'react-router-dom';
import UserPFP from '../../assets/images/Sample_User_PFP.png';

function Header() {
    const history = useHistory();

    const handleIconClick = () => {
        history.push('/doctor/homepage');
    }

    const handleSignOut = async () => {
        try {
            // Get token from localStorage
            const token = localStorage.getItem('token');
            
            if (!token) {
                console.log('No token found. Redirecting to login.');
                localStorage.removeItem('token'); // Clear it just to be sure
                history.push('/login');
                return;
            }
    
            // Include the JWT token in the Authorization header
            const response = await fetch('http://localhost:5001/authentication/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            // First check if the response is OK before trying to read the body
            if (response.ok) {
                // Only try to parse JSON if we got a successful response
                const data = await response.json();
                console.log('Logout successful:', data.message);
            } else {
                console.error('Logout failed with status:', response.status);
                // Don't try to read the response body again if it's not OK
            }
    
            // Always clear the token and redirect regardless of server response
            localStorage.removeItem('token');
            history.push('/login');
        } catch (err) {
            console.error('Error during logout:', err);
            // Even if there's an exception, clear the token and redirect
            localStorage.removeItem('token');
            history.push('/login');
        }
    };

    return (
        <header className="header">
            <img src={Logo} alt="Logo" className="header__logo" onClick={handleIconClick} />
            <div className="emptyBox"></div>
            <div className="rightMostBox">
                <img src={UserPFP} alt="User PFP" className="header__userPFP" />
                <div className="name">
                    Doctor abc
                </div>
                <button onClick={handleSignOut}>Sign out</button>
            </div>
        </header>
    );
}

export default Header;