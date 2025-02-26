// File: src/components/doctorDiagnosingPatient.js
import "./style/doctorDiagnosingPatient.css";
import Header from '../../components/common/header';
import DoctorDiagnosingPatientContent from '../../components/doctor/doctorDiagnosingPatientContent';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function DoctorDiagnosingPatient() {
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/login');
        }
    }, [history]);

    return (
        <div className="doctorDiagnosingPatient">
            <Header />
            <DoctorDiagnosingPatientContent />
        </div>
    );
}

export default DoctorDiagnosingPatient;
