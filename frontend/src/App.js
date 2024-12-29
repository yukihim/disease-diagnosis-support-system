import './App.css';

import LoginForm from './components/auth/loginForm';

import DoctorHomepage from './pages/doctor/doctorHomepage';
import DoctorDiagnosingPatient from './pages/doctor/doctorDiagnosingPatient';
import DoctorViewPassSession from './pages/doctor/doctorViewPassSession';
import DoctorFinalizingDiagnosis from './pages/doctor/doctorFinalizingDiagnosis';


import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <Router>
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
          <DoctorDiagnosingPatient />
        </Route>

        <Route path="/doctor/view_pass_session">
          <DoctorViewPassSession />
        </Route>

        <Route path="/doctor/finalizing_diagnosis">
          <DoctorFinalizingDiagnosis />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
