// File: src/components/doctorDiagnosingPatient.js
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies
import "./style/doctorDiagnosingPatient.css";

import PageLayout from '../../components/common/pageLayout';

import Button from '../../components/common/button';
import ButtonText from '../../components/common/buttonText';

import PatientInformationCard from '../../components/common/patientInformationCard';
import PatientPassSessions from '../../components/common/patientPassSessions/patientPassSessions';
import DoctorPatientVitalSignsAndPhysicalMeasurements from '../../components/doctor/diagnosingPatient/doctorPatientVitalSignsAndPhysicalMeasurements';
import DoctorPatientParaclinicalTestResult from '../../components/doctor/diagnosingPatient/doctorPatientParaclinicalTestResult';
import DoctorPatientDiagnosing from '../../components/doctor/diagnosingPatient/doctorPatientDiagnosing';

function DoctorDiagnosingPatient() {
    const history = useHistory();
    const location = useLocation();
    const sessionID = location.state?.sessionID; // Get sessionID from location state

    const [startDiagnosing, setStartDiagnosing] = useState(false);

    const onClickStartDiagnosing = (async () => {
        setStartDiagnosing(true);

        const token = Cookies.get('token');
        if (!token) {
            return;
        }

        try {
            // Call api to set state to 3 which is Diagnosis On Going
            const response = await fetch(`http://localhost:5001/doctor/diagnosis/start_diagnosing/${sessionID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                console.log("Set Patient state to 'Diagnosis On Going' successfully.");
            } else {
                console.error("Error setting Patient state to 'Diagnosis On Going':", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }, []);

    function onClickSession(session) {
        history.push({
            pathname: '/view_pass_session',
            state: {
                sessionID: session.sessionID, // Pass sessionID
            }
        });
    }

    return (
        <PageLayout requiredRole="doctor" useGrid={false}>
            {/* Patient Information Card */}
            <PatientInformationCard />

            {/* Patient's Pass Sessions Card */}
            <PatientPassSessions role="doctor" onClickSession={onClickSession} />

            {/* Patient's Vital Signs and Physical Measurements Card */}
            {/* Patient's Paraclinical Test Result Card */}
            <DoctorPatientVitalSignsAndPhysicalMeasurements userRole="doctor" />
            <DoctorPatientParaclinicalTestResult />

            { startDiagnosing ? (
                <Button className="startDiagnosing" onClick={onClickStartDiagnosing}>
                    <ButtonText>Start Diagnosing</ButtonText>
                </Button>
            ) : (
                <DoctorPatientDiagnosing />
            )}
        </PageLayout>
    );
}

export default DoctorDiagnosingPatient;
