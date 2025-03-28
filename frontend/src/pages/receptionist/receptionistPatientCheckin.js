import React from 'react';
import PageLayout from '../../components/common/pageLayout';

// Import receptionist patient check in components
import ReceptionistPatientInformation from '../../components/receptionist/patientCheckin/receptionistPatientInformation';
import ReceptionistPatientPassSessions from '../../components/receptionist/patientCheckin/receptionistPatientPassSessions';
import ReceptionistFinalizeAndCheckinPatient from '../../components/receptionist/patientCheckin/receptionistFinalizeAndCheckinPatient';

function ReceptionistPatientCheckin() {
    return (
        <PageLayout requiredRole="receptionist" useGrid={false}>
            <ReceptionistPatientInformation />
            <ReceptionistPatientPassSessions />
            <ReceptionistFinalizeAndCheckinPatient />
        </PageLayout>
    );
}

export default ReceptionistPatientCheckin;