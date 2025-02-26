// File: src/components/doctorHomepage.js
import "./style/doctorHomepage.css";
import Header from '../../components/common/header';
import DoctorHomepageContent from '../../components/doctor/doctorHomepageContent';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function DoctorHomepage() {
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/login'); // Redirect to login if token is missing
        }
    }, [history]);

    return (
        <div className="doctorHomepage">
            <Header />
            <DoctorHomepageContent />
        </div>
    );
}

export default DoctorHomepage;
