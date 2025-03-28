import React from 'react';
import './style/doctorPatientSentForParaclinicalTestOverview.css';

import PatientSentForParaclinicalTestAmount from './components/patientSentForParaclinicalTestAmount';

function DoctorPatientSentForParaclinicalTestOverview({ patientSentForParaclinicalTestCount }) {
    return (
        <div className="doctorPatientSentForParaclinicalTestOverview">
            <PatientSentForParaclinicalTestAmount patientSentForParaclinicalTestCount={patientSentForParaclinicalTestCount} />
        </div>
    );
}

export default DoctorPatientSentForParaclinicalTestOverview;