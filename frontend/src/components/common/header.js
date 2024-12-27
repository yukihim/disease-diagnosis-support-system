import './style/header.css';
import Logo from '../../assets/images/Logo.png';

// import React, { useState } from 'react';

import UserPFP from '../../assets/images/Sample_User_PFP.png';

function Header() {
    return (
        <header className="header">
            <img src={Logo} alt="Logo" className="header__logo" />
            <div className="emptyBox"></div>
            <div className="rightMostBox">
                <img src={UserPFP} alt="User PFP" className="header__userPFP" />
                <div className="name">
                    Doctor abc
                </div>
                <button>Sign out</button>
            </div>
        </header>
    );
}

export default Header;