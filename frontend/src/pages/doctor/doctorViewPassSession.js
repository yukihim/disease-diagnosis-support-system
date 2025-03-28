// // File: src/components/doctorViewPassSession.js
// import "./style/doctorDiagnosingPatient.css"; // You might want to update the CSS file name if necessary.
// import Header from '../../components/common/header';
// import DoctorViewPassSessionDetailsContent from '../../components/doctor/doctorViewPassSessionDetailsContent';
// import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// function DoctorViewPassSessionDetails() {
//     const history = useHistory();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             history.push('/login');
//         }
//     }, [history]);

//     return (
//         <div className="doctorDiagnosingPatient">
//             <Header />
//             <DoctorViewPassSessionDetailsContent />
//         </div>
//     );
// }

// export default DoctorViewPassSessionDetails;
