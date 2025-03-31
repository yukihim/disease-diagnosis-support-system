import React from 'react';
import PageLayout from '../../components/common/pageLayout';

// Import receptionist patient check in components
import ReceptionistPatientInformation from '../../components/receptionist/patientCheckin/receptionistPatientInformation';
import PatientPassSessions from '../../components/common/PatientPassSessions/patientPassSessions';
import ReceptionistFinalizeAndCheckinPatient from '../../components/receptionist/patientCheckin/receptionistFinalizeAndCheckinPatient';

function ReceptionistPatientCheckin() {
    return (
        <PageLayout requiredRole="receptionist" useGrid={false}>
            <ReceptionistPatientInformation />
            <PatientPassSessions role="receptionist" />
            <ReceptionistFinalizeAndCheckinPatient />
        </PageLayout>
    );
}

export default ReceptionistPatientCheckin;