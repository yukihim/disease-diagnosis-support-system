import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';


import LoginForm from './components/auth/loginForm';


import ReceptionistLandingPage from './pages/receptionist/receptionistLandingPage';
import ReceptionistCalendar from './pages/receptionist/receptionistCalendar';
import ReceptionistFindPatient from './pages/receptionist/receptionistFindPatient';
import ReceptionistPatientCheckin from './pages/receptionist/receptionistPatientCheckin';


// import DoctorHomepage from './pages/doctor/doctorHomepage';
import DoctorLandingPage from './pages/doctor/doctorLandingPage';
import DoctorDiagnosingPatient from './pages/doctor/doctorDiagnosingPatient';
import DoctorViewPassSession from './pages/doctor/doctorViewPassSession';
import DoctorFinalizingDiagnosis from './pages/doctor/doctorFinalizingDiagnosis';
import DoctorPrescriptionAndProcedure from './pages/doctor/doctorPrescriptionAndProcedure';

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


        <Route path="/receptionist/homepage">
          <ReceptionistLandingPage />
        </Route>
        <Route path="/receptionist/calendar">
          <ReceptionistCalendar />
        </Route>
        <Route path="/receptionist/find_patient">
          <ReceptionistFindPatient />
        </Route>
        <Route path="/receptionist/patient_checkin">
          <ReceptionistPatientCheckin />
        </Route>


        <Route path="/doctor/homepage">
          <DoctorLandingPage />
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
        <Route path="/doctor/precription_and_procedure">
          <DoctorPrescriptionAndProcedure />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
