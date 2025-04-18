// // // File: src/components/LoginForm.js
// // import './style/loginForm.css';
// // import Logo from '../../assets/images/Logo.png';
// // import React, { useState } from 'react';
// // import { useHistory } from 'react-router-dom';

// // function LoginForm() {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [error, setError] = useState('');
// //     const history = useHistory();

// //     const handleEmailChange = (e) => setEmail(e.target.value);
// //     const handlePasswordChange = (e) => setPassword(e.target.value);
    
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setError('');
    
// //         try {
// //             const response = await fetch('http://localhost:5001/authentication/login', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({ username: email, password }),
// //             });
    
// //             const data = await response.json();
// //             console.log('Response status:', response.status);
// //             console.log('Response data:', data);
            
// //             if (response.status === 200) {
// //                 // Store the token in localStorage (or you could use HTTP-only cookies instead)
// //                 localStorage.setItem('token', data.access_token);
                
// //                 // Decode the JWT token to get the role
// //                 const tokenPayload = JSON.parse(atob(data.access_token.split('.')[1]));

// //                 const username = tokenPayload.username;
// //                 const role = tokenPayload.role;
                
// //                 console.log('Username:', username);
// //                 console.log('Userrole:', role);
    
// //                 // Redirect based on the user role
// //                 history.push({
// //                     pathname: `/${role}/homepage`,
// //                     state: { username: username, userrole: role }
// //                 });
// //             } else if (response.status === 400) {
// //                 setError('Wrong username or password. Please check your credentials.');
// //                 console.error('400 - Authentication error:', data);
// //             }
// //         } catch (err) {
// //             console.error('Error during login:', err);
// //             setError('An error occurred. Please try again.');
// //         }
// //     };

// //     return (
// //         <div className="loginPage">
// //             <form className="loginForm" onSubmit={handleSubmit}>
// //                 <div className="logoContainer">
// //                     <img src={Logo} alt="Logo" />
// //                 </div>
// //                 <label>Email/Username:</label>
// //                 <input
// //                     type="text"
// //                     name="email"
// //                     value={email}
// //                     onChange={handleEmailChange}
// //                     placeholder="Enter Email/Username..."
// //                 />
// //                 <label>Password:</label>
// //                 <input
// //                     type="password"
// //                     name="password"
// //                     value={password}
// //                     onChange={handlePasswordChange}
// //                     placeholder="Enter Password..."
// //                 />
// //                 {error && <p className="error">{error}</p>}
// //                 <button type="submit">Login</button>
// //             </form>
// //         </div>
// //     );
// // }

// // export default LoginForm;
















// import './style/loginForm.css';
// import Logo from '../../assets/images/Logo.png';
// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// function LoginForm() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const history = useHistory();

//     const handleEmailChange = (e) => setEmail(e.target.value);
//     const handlePasswordChange = (e) => setPassword(e.target.value);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setIsLoading(true);
    
//         try {
//             const response = await fetch('http://localhost:5001/authentication/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username: email, password }),
//             });
    
//             const data = await response.json();
            
//             if (response.status === 200 && data.access_token) {
//                 // Store the token in localStorage
//                 localStorage.setItem('token', data.access_token);
                
//                 // Decode the JWT token to get user information
//                 const tokenPayload = JSON.parse(atob(data.access_token.split('.')[1]));
//                 const username = tokenPayload.username || tokenPayload.sub;
//                 const role = tokenPayload.role?.toLowerCase();
                
//                 if (!username || !role) {
//                     throw new Error('Invalid token format: missing username or role');
//                 }
                
//                 // Store user info in localStorage for persistence
//                 localStorage.setItem('username', username);
//                 localStorage.setItem('userrole', role);
                
//                 // Determine landing page based on role
//                 const landingPage = `/${role}/homepage` || '/login';
                
//                 // Redirect with state
//                 history.push({
//                     pathname: landingPage,
//                     state: { 
//                         username: username,
//                         userrole: role
//                     }
//                 });
//             } else {
//                 setError(data.message || 'Authentication failed. Please check your credentials.');
//             }
//         } catch (err) {
//             console.error('Login error:', err);
//             setError('An error occurred. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="loginPage">
//             <form className="loginForm" onSubmit={handleSubmit}>
//                 <div className="logoContainer">
//                     <img src={Logo} alt="Logo" />
//                 </div>
//                 <label>Email/Username:</label>
//                 <input
//                     type="text"
//                     name="email"
//                     value={email}
//                     onChange={handleEmailChange}
//                     placeholder="Enter Email/Username..."
//                     disabled={isLoading}
//                 />
//                 <label>Password:</label>
//                 <input
//                     type="password"
//                     name="password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     placeholder="Enter Password..."
//                     disabled={isLoading}
//                 />
//                 {error && <p className="error">{error}</p>}
//                 <button type="submit" disabled={isLoading}>
//                     {isLoading ? 'Logging in...' : 'Login'}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default LoginForm;































import './style/loginForm.css';
// import Logo from '../../assets/images/Logo.png';
import Logo from '../../assets/logos/logo152.png';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/authentication/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });

      const data = await response.json();
      if (response.status === 200 && data.access_token) {
        // Store token in localStorage
        localStorage.setItem('token', data.access_token);
        // Decode token to get user info
        const tokenPayload = JSON.parse(atob(data.access_token.split('.')[1]));
        const username = tokenPayload.username || tokenPayload.sub;
        const role = (tokenPayload.role && tokenPayload.role.toLowerCase()) || null;

        if (!username || !role) {
          throw new Error('Invalid token format: missing username or role');
        }

        // Store user info for persistence
        localStorage.setItem('username', username);
        localStorage.setItem('userrole', role);

        // Determine landing page and pass state
        const landingPage = `/${role}/homepage`;
        history.push({
          pathname: landingPage,
          state: { username: username, userrole: role }
        });
      } else {
        setError(data.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="logoContainer">
          <img className="logo" src={Logo} alt="Logo" />
        </div>
        <label>Email/Username:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter Email/Username..."
          disabled={isLoading}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter Password..."
          disabled={isLoading}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;