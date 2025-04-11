import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import "./style/doctorPrescriptionAndProcedure.css";

import PageLayout from '../../components/common/pageLayout';

import PatientInformationCard from '../../components/common/patientInformationCard';
import PatientPassSessions from '../../components/common/patientPassSessions/patientPassSessions';
import DoctorPatientVitalSignsAndPhysicalMeasurements from '../../components/doctor/diagnosingPatient/doctorPatientVitalSignsAndPhysicalMeasurements';
import DoctorPatientParaclinicalTestResult from '../../components/doctor/diagnosingPatient/doctorPatientParaclinicalTestResult';
import DoctorPrescriptionAndProcedureDiagnosisResult from '../../components/doctor/prescriptionAndProcedure/doctorPrescriptionAndProcedureDiagnosisResult';
import DoctorPrescriptionAndProcedurePrescriptionsCard from '../../components/doctor/prescriptionAndProcedure/doctorPrescriptionAndProcedurePrescriptionsCard';
import DoctorPrescriptionAndProcedureProceduresCard from '../../components/doctor/prescriptionAndProcedure/doctorPrescriptionAndProcedureProceduresCard';
import DoctorPrescriptionAndProcedureEndDiagnosisSessionButton from '../../components/doctor/prescriptionAndProcedure/doctorPrescriptionAndProcedureEndDiagnosisSessionButton';

function DoctorPrescriptionAndProcedure() {
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

    const onClickEndDiagnosisSession = () => {
        // Logic to end the diagnosis session
        // For example, you might want to navigate to a different page or show a confirmation message
        alert("Diagnosis session ended successfully!");
        history.push('/doctor/homepage'); // Redirect to the home page after ending the session
    }

    return (
        <PageLayout requiredRole="doctor" useGrid={false}>
            {/* Patient Information Card */}
            <PatientInformationCard />

            {/* Patient's Pass Sessions Card */}
            <PatientPassSessions role="doctor" onClickSession={onClickSession}  />

            {/* Patient's Vital Signs and Physical Measurements Card */}
            {/* Patient's Paraclinical Test Result Card */}
            <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", gap: "20px" }}>
                <DoctorPatientVitalSignsAndPhysicalMeasurements />
                <DoctorPatientParaclinicalTestResult />
            </div>

            {/* Diagnosis Result */}
            <DoctorPrescriptionAndProcedureDiagnosisResult />

            {/* Prescriptions & Procedure */}
            <DoctorPrescriptionAndProcedurePrescriptionsCard />
            <DoctorPrescriptionAndProcedureProceduresCard />

            {/* End Diagnosis Session Button */}
            <DoctorPrescriptionAndProcedureEndDiagnosisSessionButton onClickEndDiagnosisSession={onClickEndDiagnosisSession} />
        </PageLayout>
    );
}

export default DoctorPrescriptionAndProcedure;

