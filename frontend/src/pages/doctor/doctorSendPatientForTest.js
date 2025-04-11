import React from 'react';

import PageLayout from '../../components/common/pageLayout';

// Import doctor send patient for test components
import PatientInformationCard from '../../components/common/patientInformationCard';
import DoctorSendPatientForTestCard from '../../components/doctor/sendPatientForTest/doctorSendPatientForTestCard';

function DoctorSendPatientForTest() {
    return (
        <PageLayout requiredRole="doctor" useGrid={false}>
            {/* Patient Information Card */}
            <PatientInformationCard role="doctor"  />

            {/* Send Patient For Test Card */}
            <DoctorSendPatientForTestCard />
        </PageLayout>
    );
}

export default DoctorSendPatientForTest;