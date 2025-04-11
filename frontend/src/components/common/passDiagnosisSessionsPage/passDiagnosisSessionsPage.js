import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import PageLayout from '../pageLayout';

import PatientInformationCard from '../patientInformationCard'
import DoctorPatientVitalSignsAndPhysicalMeasurements from '../../doctor/diagnosingPatient/doctorPatientVitalSignsAndPhysicalMeasurements';
import DoctorPatientParaclinicalTestResult from '../../doctor/diagnosingPatient/doctorPatientParaclinicalTestResult';
import DoctorPrescriptionAndProcedureDiagnosisResult from '../../doctor/prescriptionAndProcedure/doctorPrescriptionAndProcedureDiagnosisResult';
import GoBackButton from './components/goBackButton';
import Prescription from './components/prescription';
import Procedure from './components/procedure';

function PassDiagnosisSessionsPage() {
    const history = useHistory();
    const location = useLocation();

    const { patientName, patientSessionDate } = location.state || {};

    console.log("Patient Name: ", patientName);
    console.log("Patient Session Date: ", patientSessionDate);

    const onClickGoBackToPreviousPage = () => {
        // Return to previous page
        history.goBack();
    }

    return (
        <PageLayout useGrid={false}>
            {/* Patient Information Card */}
            <PatientInformationCard />

            {/* Patient's Vital Signs and Physical Measurements Card */}
            {/* Patient's Paraclinical Test Result Card */}
            <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", gap: "20px" }}>
                <DoctorPatientVitalSignsAndPhysicalMeasurements />
                <DoctorPatientParaclinicalTestResult />
            </div>

            {/* Diagnosis Result */}
            <DoctorPrescriptionAndProcedureDiagnosisResult />

            {/* Prescriptions & Procedure */}
            <Prescription />
            <Procedure />

            {/* Return */}
            <GoBackButton onClickGoBackToPreviousPage={onClickGoBackToPreviousPage} />
        </PageLayout>
    );
}

export default PassDiagnosisSessionsPage;