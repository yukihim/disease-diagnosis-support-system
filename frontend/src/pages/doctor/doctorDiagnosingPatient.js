// File: src/components/doctorDiagnosingPatient.js
import React from 'react';
import "./style/doctorDiagnosingPatient.css";

import PageLayout from '../../components/common/pageLayout';

function DoctorDiagnosingPatient() {
    return (
        <PageLayout requiredRole="doctor">
            {/* <DoctorIncomingPatient />
            <DoctorPatientSentForParaclinicalTest />
            <Calendar />
            <DoctorInpatientMonitoring />
            <DoctorTodaysAppointment /> */}
        </PageLayout>
    );
}

export default DoctorDiagnosingPatient;
