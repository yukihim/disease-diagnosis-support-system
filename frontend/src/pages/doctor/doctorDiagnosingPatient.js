// File: src/components/doctorDiagnosingPatient.js
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import "./style/doctorDiagnosingPatient.css";

import PageLayout from '../../components/common/pageLayout';

import PatientInformationCard from '../../components/common/patientInformationCard';
import PatientPassSessions from '../../components/common/patientPassSessions/patientPassSessions';
import DoctorPatientVitalSignsAndPhysicalMeasurements from '../../components/doctor/diagnosingPatient/doctorPatientVitalSignsAndPhysicalMeasurements';
import DoctorPatientParaclinicalTestResult from '../../components/doctor/diagnosingPatient/doctorPatientParaclinicalTestResult';
import DoctorPatientDiagnosing from '../../components/doctor/diagnosingPatient/doctorPatientDiagnosing';

function DoctorDiagnosingPatient() {
    const history = useHistory();
    const location = useLocation();

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
            {/* <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", gap: "20px" }}>
                <DoctorPatientVitalSignsAndPhysicalMeasurements userRole="doctor" />
                <DoctorPatientParaclinicalTestResult />
            </div> */}
            <DoctorPatientVitalSignsAndPhysicalMeasurements userRole="doctor" />
            <DoctorPatientParaclinicalTestResult />

            {/* Diagnosing Card */}
            <DoctorPatientDiagnosing />
        </PageLayout>
    );
}

export default DoctorDiagnosingPatient;
