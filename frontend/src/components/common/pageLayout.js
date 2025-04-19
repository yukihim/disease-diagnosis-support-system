// import React, { useEffect, useState } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
// import Sidebar from './sidebar';
// import Header from './header';
// import WebpageTitle from './webpageTitle';
// import Button from './button';
// import ButtonText from './buttonText';
// import './style/pageLayout.css';

// function PageLayout({ children, requiredRole = null, useGrid = true, className = '' }) {
//   const history = useHistory();
//   const location = useLocation();
//   const [userRole, setUserRole] = useState('');
//   const [userName, setUserName] = useState('');

//   const isHomePage = location.pathname.endsWith('/homepage');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       history.push('/login');
//       return;
//     }

//     try {
//       // First try to get user info from location state (passed from login)
//       let username = location.state?.username;
//       let role = location.state?.userrole;

//       // If missing, fall back to localStorage
//       if (!username) {
//         username = localStorage.getItem('username');
//       }
//       if (!role) {
//         role = localStorage.getItem('userrole');
//       }

//       // If still missing, decode from the token
//       if (!username || !role) {
//         const tokenPayload = JSON.parse(atob(token.split('.')[1]));
//         username = username || tokenPayload.username || tokenPayload.sub;
//         role = role || tokenPayload.role;
//         if (username) localStorage.setItem('username', username);
//         if (role) localStorage.setItem('userrole', role);
//       }

//       setUserName(username);
//       setUserRole(role);

//       // Enforce required role (if provided)
//       // if (requiredRole && role.toLowerCase() !== requiredRole.toLowerCase()) {
//       //   console.warn(`Access denied: Required role ${requiredRole}, but user has role ${role}`);
//       //   history.push(`/${role.toLowerCase()}/homepage`);
//       // }
//       if (requiredRole) {
//         // Check if requiredRole is an array
//         if (Array.isArray(requiredRole)) {
//           // Check if user's role is in the allowed roles array
//           const userRoleLower = role.toLowerCase();
//           const isAllowed = requiredRole.some(
//             allowedRole => allowedRole.toLowerCase() === userRoleLower
//           );
          
//           if (!isAllowed) {
//             console.warn(`Access denied: Required roles [${requiredRole.join(', ')}], but user has role ${role}`);
//             history.push(`/${role.toLowerCase()}/homepage`);
//           }
//         } else {
//           // Original single role check
//           if (role.toLowerCase() !== requiredRole.toLowerCase()) {
//             console.warn(`Access denied: Required role ${requiredRole}, but user has role ${role}`);
//             history.push(`/${role.toLowerCase()}/homepage`);
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error processing authentication:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('username');
//       localStorage.removeItem('userrole');
//       history.push('/login');
//     }
//   }, [history, location, requiredRole]);

//   const renderRoleSpecificButton = () => {
//     const role = userRole.toLowerCase();
    
//     {/* TEMPLATE */}
//     if (role === 'receptionist') {
//       return (
//         <Button onClick={() => {
//           console.log("Check in for new patient");
//           history.push("/receptionist/find_patient");
//         }}>
//           <ButtonText>
//             Check in for new patient
//           </ButtonText>
//         </Button>
//       );
//     }
//     // else if (role === 'nurse') {
//     //   return (
//     //     <Button>
//     //       <ButtonText>
//     //         Patient vitals
//     //       </ButtonText>
//     //     </Button>
//     //   );
//     // }
    
//     // For any other role, return null or a default button
//     return null;
//   };

//   return (
//     <div className="pageWrapper">
//       <Header userName={userName} userRole={userRole} />
//       <div className="contentWrapper">
//         <Sidebar userRole={userRole} />
//         <div className="containter">
//           {/* Only render WebpageTitle on homepage */}
//           {isHomePage && (
//             <WebpageTitle userName={userName} userRole={userRole}>
//               {renderRoleSpecificButton()}
//             </WebpageTitle>
//           )}
          
          
//           {/* Conditional rendering based on layout type */}
//           {useGrid ? (
//             <div className="mainContentGrid">
//               {children}
//             </div>
//           ) : (
//             <div className={`mainContentFull ${className}`}>
//               {children}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PageLayout;








































// filepath: d:\WORK\_SUBJECT\_ĐATN\src\disease-diagnosis-support-system\frontend\src\components\common\pageLayout.js
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
    const expires = new Date(new Date().getTime() + 30 * 1000);
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

      if (!username || !role) {
        console.error('Invalid token format: missing username or role');
        Cookies.remove('token', { path: '/' }); // Remove invalid cookie
        history.push('/login');
        return;
      }

      setUserName(username);
      setUserRole(role);
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