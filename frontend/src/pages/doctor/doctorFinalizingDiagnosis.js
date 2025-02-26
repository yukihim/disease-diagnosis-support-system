// File: src/components/doctorFinalizingDiagnosis.js
import "./style/doctorFinalizingDiagnosis.css";
import Header from '../../components/common/header';
import DoctorFinalizingDiagnosisContent from '../../components/doctor/doctorFinalizingDiagnosisContent';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function DoctorFinalizingDiagnosis() {
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/login');
        }
    }, [history]);

    return (
        <div className="doctorFinalizingDiagnosis">
            <Header />
            <DoctorFinalizingDiagnosisContent />
        </div>
    );
}

export default DoctorFinalizingDiagnosis;
