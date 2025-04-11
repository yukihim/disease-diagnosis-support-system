import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import PageLayout from '../../components/common/pageLayout';

// Import doctor monitoring inpatient components
import PatientInformationCard from '../../components/common/patientInformationCard';
import DoctorMedicalDevicesMeasurements from '../../components/doctor/inpatientMonitoring/doctorMedicalDevicesMeasurements';
import PatientPassSessions from '../../components/common/patientPassSessions/patientPassSessions';
import DoctorEventsCapturing from '../../components/doctor/inpatientMonitoring/doctorEventsCapturing';
import DoctorGoBackAndBeginDiagnosisSession from '../../components/doctor/inpatientMonitoring/doctorGoBackAndBeginDiagnosisSession';

function DoctorSendPatientForTest() {
    const history = useHistory();
    const location = useLocation();

    const { patientName, userRole } = location.state || {};

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
        <PageLayout requiredRole={["doctor", "nurse"]} useGrid={false}>
            {/* Patient Information Card */}
            <PatientInformationCard role={userRole}  />

            {/* Additional Information Card */}

            {/* Medical device measurements Card */}
            <DoctorMedicalDevicesMeasurements />

            {/* Patient's Pass Sessions Card */}
            <PatientPassSessions role={userRole} onClickSession={onClickSession} />

            {/* Events Capturing Card */}
            <DoctorEventsCapturing />

            {/* Go Back & Begin Diagnosis Button */}
            <DoctorGoBackAndBeginDiagnosisSession userRole={userRole} patientName={patientName} />
        </PageLayout>
    );
}

export default DoctorSendPatientForTest;