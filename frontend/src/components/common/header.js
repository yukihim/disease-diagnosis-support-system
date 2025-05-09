import React from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies
import './style/header.css';
import Logo from '../../assets/images/Logo.png';
import UserPFP from '../../assets/images/Sample_User_PFP.png';

function Header({ userName, userRole }) {
  const history = useHistory();

  // Format the role to display with first letter capitalized
  const formattedRole = userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : '';

  // When clicking the logo, navigate to your role’s homepage.
  const handleIconClick = () => {
    const role = userRole || localStorage.getItem('userrole');
    if (role) {
      history.push(`/${role.toLowerCase()}/homepage`);
    } else {
      console.warn('No user role found, redirecting to login');
      history.push('/login');
    }
  };

  // Sign out clears stored data and navigates to login.
  // const handleSignOut = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       try {
  //         const response = await fetch('http://localhost:5001/authentication/logout', {
  //           method: 'POST',
  //           headers: {
  //             'Authorization': `Bearer ${token}`,
  //             'Content-Type': 'application/json'
  //           }
  //         });
  //         if (response.ok) {
  //           console.log('Logout successful');
  //         } else {
  //           console.warn('Logout API returned error:', response.status);
  //         }
  //       } catch (apiError) {
  //         console.error('API call failed:', apiError);
  //       }
  //     }
  //   } finally {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('username');
  //     localStorage.removeItem('userrole');
  //     history.push('/login');
  //   }
  // };


  // Sign out clears stored data and navigates to login.
  const handleSignOut = async () => {
    try {
      const token = Cookies.get('token'); // Get token from cookie
      if (token) {
        try {
          // Optional: Call backend logout endpoint
          const response = await fetch('http://localhost:5001/authentication/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              // 'Content-Type': 'application/json'
            }
            // No body needed typically for logout
          });
          if (response.ok) {
            console.log('Logout successful on backend');
          } else {
            console.warn('Backend logout API returned error:', response.status);
            // Still proceed with frontend logout even if backend fails
          }
        } catch (apiError) {
          console.error('API call to backend logout failed:', apiError);
          // Still proceed with frontend logout
        }
      }
    } finally {
      // --- Clear Authentication Data ---
      Cookies.remove('token', { path: '/' }); // Remove the token cookie
      // localStorage.removeItem('token'); // Keep commented out or remove
      // localStorage.removeItem('username'); // Keep commented out or remove
      // localStorage.removeItem('userrole'); // Keep commented out or remove
      // ---

      // Redirect to login page
      history.push('/login');
    }
  };

  return (
    <header className="header">
      <div className="headerContent">
        <div onClick={handleIconClick} style={{ cursor: 'pointer' }}>
          <img src={Logo} alt="Logo" className="headerLogo" />
        </div>
        <div className="rightMostBox">
          <img src={UserPFP} alt="User PFP" className="headerUserPFP" />
          <div className="name">
            {formattedRole && `${formattedRole}: `}
            {userName || 'User'}
          </div>
          <button className="signOutButton" type="button" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;