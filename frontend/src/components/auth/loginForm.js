import './style/loginForm.css';
import Logo from '../../assets/logos/logo152.png';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import the js-cookie library

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
        // --- Start Cookie Implementation ---

        // Calculate expiration time: 30 seconds from now
        const expires = new Date(new Date().getTime() + 30 * 60 * 1000);

        // Store token in a cookie that expires in 30 seconds
        Cookies.set('token', data.access_token, {
            expires: expires, // Set the expiration time
            path: '/',      // Make cookie available across the entire site
            // secure: true, // Uncomment in production if using HTTPS
            sameSite: 'Lax' // Recommended for security
        });

        // --- End Cookie Implementation ---

        // Decode token to get user info (still needed for immediate redirect)
        const tokenPayload = JSON.parse(atob(data.access_token.split('.')[1]));
        const username = tokenPayload.username || tokenPayload.sub;
        // Ensure role is lowercase if it exists
        const role = (tokenPayload.role && typeof tokenPayload.role === 'string' ? tokenPayload.role.toLowerCase() : null);
        const userID = tokenPayload.userID || tokenPayload.sub; // Ensure userID is defined

        if (!username || !role) {
          // Clear the potentially invalid cookie if parsing failed
          Cookies.remove('token', { path: '/' });
          throw new Error('Invalid token format: missing username or role');
        }

        // --- Remove localStorage usage ---
        // localStorage.setItem('token', data.access_token); // Replaced by Cookies.set
        // localStorage.setItem('username', username);      // No longer storing separately
        // localStorage.setItem('userrole', role);        // No longer storing separately
        // ---

        // Determine landing page and pass state for the *initial* navigation
        // IMPORTANT: Other parts of your app will now need to read the 'token' cookie
        // and decode it to get user info on page loads/refreshes, instead of reading from localStorage.
        const landingPage = `/${role}/homepage`;
        history.push({
          pathname: landingPage,
          // You might still pass state for the immediate redirect, but don't rely on it for persistence.
          state: { userID: userID, username: username, userrole: role }
        });

      } else {
        setError(data.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      // Ensure error message is a string
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`An error occurred: ${errorMessage}. Please try again.`);
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
          autoComplete="username" // Added for better UX
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter Password..."
          disabled={isLoading}
          autoComplete="current-password" // Added for better UX
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