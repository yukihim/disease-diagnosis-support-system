import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';


import Homepage from './pages/homepage/homepage';


import LoginForm from './components/auth/loginForm';


// Receptionist
import ReceptionistLandingPage from './pages/receptionist/receptionistLandingPage';
import ReceptionistCalendar from './pages/receptionist/receptionistCalendar';
import ReceptionistFindPatient from './pages/receptionist/receptionistFindPatient';
import ReceptionistPatientCheckin from './pages/receptionist/receptionistPatientCheckin';


// Doctor
import DoctorLandingPage from './pages/doctor/doctorLandingPage';
import DoctorCalendar from './pages/doctor/doctorCalendar';
import DoctorDiagnosingPatient from './pages/doctor/doctorDiagnosingPatient';
import DoctorSendPatientForTest from './pages/doctor/doctorSendPatientForTest';
import DoctorFinalizingDiagnosis from './pages/doctor/doctorFinalizingDiagnosis';
import DoctorPrescriptionAndProcedure from './pages/doctor/doctorPrescriptionAndProcedure';
import DoctorViewPassSession from './pages/doctor/doctorViewPassSession';
import DoctorInpatientMonitoring from './pages/doctor/doctorInpatientMonitoring';


// Nurse
import NurseLandingPage from './pages/nurse/nurseLandingPage';
import NurseCalendar from './pages/nurse/nurseCalendar';
import NurseAddPatientMeasurements from './pages/nurse/nurseAddPatientMeasurements';


// Paraclinical
import ParaclinicalLandingPage from './pages/paraclinical/paraclinicalLandingPage';
import ParaclinicalCalendar from './pages/paraclinical/paraclinicalCalendar';
import ParaclinicalPatientTest from './pages/paraclinical/paraclinicalPatientTest';


// Admin
import AdminLandingPage from './pages/admin/adminLandingPage';
import AdminCalendar from './pages/admin/adminCalendar';
import AdminUserManagement from './pages/admin/adminUserManagement';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
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
        <Route path="/doctor/calendar">
          <DoctorCalendar />
        </Route>
        <Route path="/doctor/diagnosis">
          <DoctorDiagnosingPatient />
        </Route>
        <Route path="/doctor/send_patient_for_test">
          <DoctorSendPatientForTest />
        </Route>
        <Route path="/view_pass_session">
          <DoctorViewPassSession />
        </Route>
        <Route path="/doctor/finalizing_diagnosis">
          <DoctorFinalizingDiagnosis />
        </Route>
        <Route path="/doctor/precription_and_procedure">
          <DoctorPrescriptionAndProcedure />
        </Route>
        <Route path="/doctor/inpatient_monitoring">
          <DoctorInpatientMonitoring />
        </Route>


        <Route path="/nurse/homepage">
          <NurseLandingPage />
        </Route>
        <Route path="/nurse/calendar">
          <NurseCalendar />
        </Route>
        <Route path="/nurse/add_patient_measurements">
          <NurseAddPatientMeasurements />
        </Route>


        <Route path="/paraclinical/homepage">
          <ParaclinicalLandingPage />
        </Route>
        <Route path="/paraclinical/calendar">
          <ParaclinicalCalendar />
        </Route>
        <Route path="/paraclinical/paraclinical_patient_test">
          <ParaclinicalPatientTest />
        </Route>


        <Route path="/admin/homepage">
          <AdminLandingPage />
        </Route>
        <Route path="/admin/calendar">
          <AdminCalendar />
        </Route>
        <Route path="/admin/user_management">
          <AdminUserManagement />
        </Route>




        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
