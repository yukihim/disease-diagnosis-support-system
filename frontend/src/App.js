import './App.css';

import LoginForm from './components/auth/loginForm';

import DoctorHomepage from './pages/doctor/doctorHomepage';
import DoctorDiagnosingPatient from './pages/doctor/doctorDiagnosingPatient';
import DoctorViewPassSession from './pages/doctor/doctorViewPassSession';
import DoctorFinalizingDiagnosis from './pages/doctor/doctorFinalizingDiagnosis';
import DoctorPrescriptionAndProcedure from './pages/doctor/doctorPrescriptionAndProcedure';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [symptoms, setSymptoms] = useState('');
  const [preDiagnosis, setPreDiagnosis] = useState('');
  const [finalDiagnosis, setFinalDiagnosis] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/doctor/homepage') {
      setSymptoms('');
      setPreDiagnosis('');
      setFinalDiagnosis('');
    }
  }, [location.pathname]);

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      
      <Route path="/login">
        <LoginForm />
      </Route>

      <Route path="/doctor/homepage">
        <DoctorHomepage />
      </Route>

      <Route path="/doctor/diagnosis">
        <DoctorDiagnosingPatient symptoms={symptoms} setSymptoms={setSymptoms} preDiagnosis={preDiagnosis} setPreDiagnosis={setPreDiagnosis} />
      </Route>

      <Route path="/doctor/view_pass_session">
        <DoctorViewPassSession />
      </Route>

      <Route path="/doctor/finalizing_diagnosis">
        <DoctorFinalizingDiagnosis symptoms={symptoms} preDiagnosis={preDiagnosis} finalDiagnosis={finalDiagnosis} setFinalDiagnosis={setFinalDiagnosis} />
      </Route>

      <Route path="/doctor/precription_and_procedure">
        <DoctorPrescriptionAndProcedure symptoms={symptoms} finalDiagnosis={finalDiagnosis} />
      </Route>
    </Switch>
  );
}

export default App;