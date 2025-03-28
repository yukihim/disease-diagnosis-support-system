import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';
import WebpageTitle from './webpageTitle';
import Button from './button';
import ButtonText from './buttonText';
import './style/pageLayout.css';

function PageLayout({ children, requiredRole = null, useGrid = true, className = '' }) {
  const history = useHistory();
  const location = useLocation();
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');

  const isHomePage = location.pathname.endsWith('/homepage');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
      return;
    }

    try {
      // First try to get user info from location state (passed from login)
      let username = location.state?.username;
      let role = location.state?.userrole;

      // If missing, fall back to localStorage
      if (!username) {
        username = localStorage.getItem('username');
      }
      if (!role) {
        role = localStorage.getItem('userrole');
      }

      // If still missing, decode from the token
      if (!username || !role) {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        username = username || tokenPayload.username || tokenPayload.sub;
        role = role || tokenPayload.role;
        if (username) localStorage.setItem('username', username);
        if (role) localStorage.setItem('userrole', role);
      }

      setUserName(username);
      setUserRole(role);

      // Enforce required role (if provided)
      if (requiredRole && role.toLowerCase() !== requiredRole.toLowerCase()) {
        console.warn(`Access denied: Required role ${requiredRole}, but user has role ${role}`);
        history.push(`/${role.toLowerCase()}/homepage`);
      }
    } catch (error) {
      console.error('Error processing authentication:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userrole');
      history.push('/login');
    }
  }, [history, location, requiredRole]);

  const renderRoleSpecificButton = () => {
    const role = userRole.toLowerCase();
    
    {/* TEMPLATE */}
    if (role === 'receptionist') {
      return (
        <Button onClick={() => {
          console.log("Check in for new patient");
          history.push("/receptionist/find_patient");
        }}>
          <ButtonText>
            Check in for new patient
          </ButtonText>
        </Button>
      );
    } else if (role === 'nurse') {
      return (
        <Button>
          <ButtonText>
            Patient vitals
          </ButtonText>
        </Button>
      );
    }
    
    // For any other role, return null or a default button
    return null;
  };

  return (
    <div className="pageWrapper">
      <Header userName={userName} userRole={userRole} />
      <div className="contentWrapper">
        <Sidebar userRole={userRole} />
        <div className="containter">
          {/* Only render WebpageTitle on homepage */}
          {isHomePage && (
            <WebpageTitle userName={userName} userRole={userRole}>
              {renderRoleSpecificButton()}
            </WebpageTitle>
          )}
          
          
          {/* Conditional rendering based on layout type */}
          {useGrid ? (
            <div className="mainContentGrid">
              {children}
            </div>
          ) : (
            <div className={`mainContentFull ${className}`}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageLayout;