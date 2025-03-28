// // File: src/components/doctorPrescriptionAndProcedure.js
// import "./style/doctorFinalizingDiagnosis.css"; // Ensure the CSS file is correct or create a separate one if needed.
// import Header from '../../components/common/header';
// import DoctorPrescriptionAndProcedureContent from '../../components/doctor/doctorPrescriptionAndProcedureContent';
// import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// function DoctorPrescriptionAndProcedure() {
//     const history = useHistory();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             history.push('/login');
//         }
//     }, [history]);

//     return (
//         <div className="doctorFinalizingDiagnosis">
//             <Header />
//             <DoctorPrescriptionAndProcedureContent />
//         </div>
//     );
// }

// export default DoctorPrescriptionAndProcedure;
