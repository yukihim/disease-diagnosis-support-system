import React from 'react';
import { useHistory } from 'react-router-dom';
import './style/homepage.css';

import LineChartComponent from '../../components/common/lineChart';

function HomePage() {
  const history = useHistory();

  const handleSignIn = () => {
    history.push('/login');
  };

  return (
    <div className="simple-home-page">
      <header className="simple-header">
        <h1>AsiDoc</h1>
        <div className="subtitle">Disease Diagnosis Support System</div>
      </header>

      <main className="simple-main">
        <section className="intro-section">
          <h2>Welcome to AsiDoc</h2>
          <p>
            A comprehensive medical platform designed to assist healthcare professionals
            in diagnosing diseases with greater accuracy and efficiency.
          </p>
          
          <div className="intro-features">
            <div className="feature">
              <h3>AI-Assisted Diagnosis</h3>
              <p>Advanced algorithms to support clinical decisions</p>
            </div>
            
            <div className="feature">
              <h3>Patient Management</h3>
              <p>Streamlined workflows for patient care</p>
            </div>
            
            <div className="feature">
              <h3>Team Collaboration</h3>
              <p>Seamless communication between healthcare providers</p>
            </div>
          </div>
        </section>

        <LineChartComponent />
        
        <section className="signin-container">
          <button className="signin-button" onClick={handleSignIn}>
            Sign In to Access the System
          </button>
        </section>
      </main>

      <footer className="simple-footer">
        <p>© 2025 AsiDoc. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;