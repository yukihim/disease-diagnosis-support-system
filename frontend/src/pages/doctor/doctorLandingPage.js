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
            <DoctorIncomingPatient role="doctor" />

            {/* Today's Appointment Card */}
            <DoctorTodaysAppointment />

            {/* Calendar */}
            <Calendar />

            {/* Patient Sent for Paraclinical Test Card */}
            <DoctorPatientSentForParaclinicalTest />

            {/* Inpatient Monitoring Card */}
            <DoctorInpatientMonitoring userRole="doctor" />
        </PageLayout>
    );
}

export default DoctorLandingPage;