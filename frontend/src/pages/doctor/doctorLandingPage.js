import React from 'react';

import PageLayout from '../../components/common/pageLayout';
import Calendar from '../../components/common/calendar';

// Import doctor landingpage components
import DoctorIncomingPatient from '../../components/doctor/landingPage/doctorIncomingPatient';
import DoctorPatientSentForParaclinicalTest from '../../components/doctor/landingPage/doctorPatientSentForParaclinicalTest';
import DoctorInpatientMonitoring from '../../components/doctor/landingPage/doctorInpatientMonitoring';
import DoctorTodaysAppointment from '../../components/doctor/landingPage/doctorTodaysAppointment';

function DoctorLandingPage() {
    return (
        <PageLayout requiredRole="doctor">
            {/* Incoming Patient Card */}
            <DoctorIncomingPatient />

            {/* Patient Sent for Paraclinical Test Card */}
            <DoctorPatientSentForParaclinicalTest />

            {/* Calendar */}
            <Calendar />

            {/* Inpatient Monitoring Card */}
            <DoctorInpatientMonitoring />

            {/* Today's Appointment Card */}
            <DoctorTodaysAppointment />
        </PageLayout>
    );
}

export default DoctorLandingPage;