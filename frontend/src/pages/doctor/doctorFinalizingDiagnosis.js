import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import "./style/doctorFinalizingDiagnosis.css";

import PageLayout from '../../components/common/pageLayout';

import PatientInformationCard from '../../components/common/patientInformationCard';
import PatientPassSessions from '../../components/common/patientPassSessions/patientPassSessions';
import DoctorPatientVitalSignsAndPhysicalMeasurements from '../../components/doctor/diagnosingPatient/doctorPatientVitalSignsAndPhysicalMeasurements';
import DoctorPatientParaclinicalTestResult from '../../components/doctor/diagnosingPatient/doctorPatientParaclinicalTestResult';
import DoctorFinalizingDiagnosisForPatient from '../../components/doctor/finalizingDiagnosis/doctorFinalizingDiagnosisForPatient';

function DoctorFinalizingDiagnosis() {
    const history = useHistory();
    const location = useLocation();

    const { patientName } = location.state || {};

    function onClickSession(session) {
        history.push({  // Changed from history.push={}
            pathname: '/view_pass_session',
            state: {
                patientName: patientName, 
                patientSessionDate: session.sessionDate,
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
            <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", gap: "20px" }}>
                <DoctorPatientVitalSignsAndPhysicalMeasurements userRole="doctor" />
                <DoctorPatientParaclinicalTestResult />
            </div>

            {/* Finalizing Diagnosis */}
            <DoctorFinalizingDiagnosisForPatient />
        </PageLayout>
    );
}

export default DoctorFinalizingDiagnosis;