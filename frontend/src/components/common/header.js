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
            const response = await fetch('http://localhost:5000/Authentication/logout', {
                method: 'POST',
                credentials: 'include', // Important: This enables cookies to be sent with the request
            });

            if (response.ok) {
                // The cookie is cleared by the server
                history.push('/login');
            } else {
                const errorData = await response.json();
                console.error('Logout error:', errorData);
            }
        } catch (err) {
            console.error('Error during logout:', err);
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