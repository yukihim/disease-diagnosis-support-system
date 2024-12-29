import './App.css';

import LoginForm from './components/auth/loginForm';

import DoctorHomepage from './pages/doctor/doctorHomepage';
import DoctorDiagnosingPatient from './pages/doctor/doctorDiagnosingPatient';

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

        {/* <Route path="/">
          <LoginForm />
        </Route>

        <Route path="/">
          <LoginForm />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
