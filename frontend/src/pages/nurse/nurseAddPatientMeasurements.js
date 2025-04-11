import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import PageLayout from '../../components/common/pageLayout';

import PatientInformationCard from '../../components/common/patientInformationCard';
import PatientPassSessions from '../../components/common/patientPassSessions/patientPassSessions';
import DoctorPatientVitalSignsAndPhysicalMeasurements from '../../components/doctor/diagnosingPatient/doctorPatientVitalSignsAndPhysicalMeasurements';
// import DoctorPatientParaclinicalTestResult from '../../components/doctor/diagnosingPatient/doctorPatientParaclinicalTestResult';
import NurseGoBackButton from '../../components/nurse/addPatientMeasurements/nurseGoBackButton';

function NurseAddPatientMeasurements() {
    const history = useHistory();
    const location = useLocation();

    const { patientName } = location.state || {};

    function onClickSession(session) {
        history.push({
            pathname: '/view_pass_session',
            state: {
                patientName: patientName, 
                patientSessionDate: session.sessionDate,
            }
        });
    }

    return (
        <PageLayout requiredRole="nurse" useGrid={false}>
            {/* Patient Information Card */}
            <PatientInformationCard />

            {/* Patient's Pass Sessions Card */}
            <PatientPassSessions role="nurse" onClickSession={onClickSession} />

            {/* Patient's Vital Signs and Physical Measurements Card */}
            {/* Patient's Paraclinical Test Result Card */}
            <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", gap: "20px" }}>
                <DoctorPatientVitalSignsAndPhysicalMeasurements userRole="nurse" />
                {/* <DoctorPatientParaclinicalTestResult /> */}
            </div>

            {/* Go back button */}
            <NurseGoBackButton />
        </PageLayout>
    );
}

export default NurseAddPatientMeasurements;
