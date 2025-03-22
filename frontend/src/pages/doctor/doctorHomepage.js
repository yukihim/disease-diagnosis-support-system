import React from 'react';
import PageLayout from '../../components/common/pageLayout';
import IncomingPatient from '../../components/doctor/smallerComponents/incomingPatient/incomingPatient';
import PatientSentForParaclinicalTest from '../../components/doctor/smallerComponents/patientSentForParaclinicalTest/patientSentForParaclinicalTest';
import Calendar from '../../components/common/calendar';
import MonitoringInpatient from '../../components/doctor/smallerComponents/monitoringInpatient/monitoringInpatient';
import TodaysAppointment from '../../components/doctor/smallerComponents/todaysAppointment/todaysAppointment';

function DoctorHomepage() {
    return (
        <PageLayout requiredRole="doctor">
            {/* First row */}
            <IncomingPatient />
            <PatientSentForParaclinicalTest />
            <Calendar />
            
            {/* Second row */}
            <MonitoringInpatient />
            <TodaysAppointment />
        </PageLayout>
    );
}

export default DoctorHomepage;