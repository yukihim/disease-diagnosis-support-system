// // File: src/components/doctorFinalizingDiagnosis.js
// import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import "./style/doctorFinalizingDiagnosis.css";

// function DoctorFinalizingDiagnosis() {
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
//             <DoctorFinalizingDiagnosisContent />
//         </div>
//     );
// }

// export default DoctorFinalizingDiagnosis;
