import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies
import './style/pageLayout.css';

import Header from './header';
import Sidebar from './sidebar';
import WebpageTitle from './webpageTitle';
import Button from './button';
import ButtonText from './buttonText';

function PageLayout({ children, requiredRole = null, useGrid = true, className = '' }) {
  const history = useHistory();
  const location = useLocation();
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add state to track auth status

  const isHomePage = location.pathname.endsWith('/homepage');

  useEffect(() => {
    const token = Cookies.get('token'); // Read token from cookie

    if (!token) {
      console.log("No token found in cookies, redirecting to login.");
      history.push('/login');
      return;
    }

    // Reset ttl if page reloaded
    console.log("Token found, resetting expiration time.");
    // Calculate expiration time: 30 seconds from now
    const expires = new Date(new Date().getTime() + 30 * 60 * 1000);
    Cookies.set('token', token, {
      expires: expires, // Set the expiration time
      path: '/',      // Make cookie available across the entire site
      // secure: true, // Uncomment in production if using HTTPS
      sameSite: 'Lax' // Recommended for security
    });

    try {
      // Decode token directly from the cookie
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const username = tokenPayload.username || tokenPayload.sub;
      // Ensure role is lowercase if it exists
      const role = (tokenPayload.role && typeof tokenPayload.role === 'string' ? tokenPayload.role.toLowerCase() : null);
      const userID = tokenPayload.userID || tokenPayload.sub; // Ensure userID is defined

      if (!username || !role) {
        console.error('Invalid token format: missing username or role');
        Cookies.remove('token', { path: '/' }); // Remove invalid cookie
        history.push('/login');
        return;
      }

      setUserName(username);
      setUserRole(role);
      setUserID(userID);
      setIsAuthenticated(true); // Mark as authenticated

      // --- Remove localStorage interactions ---
      // localStorage.removeItem('username'); // No longer needed
      // localStorage.removeItem('userrole'); // No longer needed
      // localStorage.setItem('username', username); // Don't write back to localStorage
      // localStorage.setItem('userrole', role); // Don't write back to localStorage
      // ---

      // Enforce required role (if provided)
      if (requiredRole) {
        const userRoleLower = role.toLowerCase();
        const isAllowed = Array.isArray(requiredRole)
          ? requiredRole.some(allowedRole => allowedRole.toLowerCase() === userRoleLower)
          : userRoleLower === requiredRole.toLowerCase();

        if (!isAllowed) {
          const requiredRolesString = Array.isArray(requiredRole) ? requiredRole.join(', ') : requiredRole;
          console.warn(`Access denied: Required role(s) [${requiredRolesString}], but user has role ${role}`);
          // Redirect to user's own homepage to prevent access loops
          history.push(`/${userRoleLower}/homepage`);
        }
      }
    } catch (error) {
      console.error('Error processing token from cookie:', error);
      Cookies.remove('token', { path: '/' }); // Remove potentially corrupt cookie
      // --- Remove localStorage interactions on error ---
      // localStorage.removeItem('token');
      // localStorage.removeItem('username');
      // localStorage.removeItem('userrole');
      // ---
      history.push('/login');
    }
  }, [history, location.pathname, requiredRole]); // location.pathname dependency ensures re-check on navigation

  const renderRoleSpecificButton = () => {
    // ... (rest of the function remains the same) ...
    const role = userRole.toLowerCase();

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
    }
    // else if (role === 'nurse') {
    //   return (
    //     <Button>
    //       <ButtonText>
    //         Patient vitals
    //       </ButtonText>
    //     </Button>
    //   );
    // }

    // For any other role, return null or a default button
    return null;
  };


  // Render nothing or a loading indicator until authentication check is complete
  if (!isAuthenticated && location.pathname !== '/login') {
      // Avoid rendering layout if not authenticated and not already on login page
      // You might want to show a loading spinner here
      return null;
  }


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