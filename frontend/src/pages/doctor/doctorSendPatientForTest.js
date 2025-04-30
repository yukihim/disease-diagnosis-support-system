import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

import PageLayout from '../../components/common/pageLayout';

// Import doctor send patient for test components
import PatientInformationCard from '../../components/common/patientInformationCard';
import DoctorSendPatientForTestCard from '../../components/doctor/sendPatientForTest/doctorSendPatientForTestCard';

function DoctorSendPatientForTest() {
    const location = useLocation();
    const sessionID = location.state?.sessionID; // Get sessionID from navigation state

    // Basic check if sessionID is missing
    if (!sessionID) {
        return (
            <PageLayout requiredRole="doctor">
                <div style={{ color: 'red', padding: '20px' }}>
                    Error: Session ID not found. Cannot proceed. Please go back and try again.
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout requiredRole="doctor" useGrid={false}>
            {/* Patient Information Card */}
            <PatientInformationCard role="doctor"  />

            {/* Send Patient For Test Card */}
            <DoctorSendPatientForTestCard sessionID={sessionID} />
        </PageLayout>
    );
}

export default DoctorSendPatientForTest;