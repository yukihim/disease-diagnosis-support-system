// File: src/components/doctorDiagnosingPatient.js
import React from 'react';
import "./style/doctorDiagnosingPatient.css";

import PageLayout from '../../components/common/pageLayout';

import DoctorPatientInformation from '../../components/doctor/diagnosingPatient/doctorPatientInformation';
import PatientPassSessions from '../../components/common/PatientPassSessions/patientPassSessions';
import DoctorPatientVitalSignsAndPhysicalMeasurements from '../../components/doctor/diagnosingPatient/doctorPatientVitalSignsAndPhysicalMeasurements';
import DoctorPatientParaclinicalTestResult from '../../components/doctor/diagnosingPatient/doctorPatientParaclinicalTestResult';
import DoctorPatientDiagnosing from '../../components/doctor/diagnosingPatient/doctorPatientDiagnosing';

function DoctorDiagnosingPatient() {
    return (
        <PageLayout requiredRole="doctor" useGrid={false}>
            {/* Patient Information Card */}
            <DoctorPatientInformation />

            {/* Patient's Pass Sessions Card */}
            <PatientPassSessions role="doctor" />

            {/* Patient's Vital Signs and Physical Measurements Card */}
            {/* Patient's Paraclinical Test Result Card */}
            <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", gap: "20px" }}>
                <DoctorPatientVitalSignsAndPhysicalMeasurements />
                <DoctorPatientParaclinicalTestResult />
            </div>

            {/* Diagnosing Card */}
            <DoctorPatientDiagnosing />
        </PageLayout>
    );
}

export default DoctorDiagnosingPatient;
