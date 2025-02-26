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
        // Perform any signout logic here (e.g., clearing tokens, etc.)
        try {
            const access_token = localStorage.getItem('access_token'); // Assuming the token is stored in localStorage
            const response = await fetch('http://localhost:5000/Authentication/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response data:', data);

                console.log(data.access_token);
                
                // Clear the token from localStorage
                localStorage.removeItem('access_token');
                
                // Redirect to the login page
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