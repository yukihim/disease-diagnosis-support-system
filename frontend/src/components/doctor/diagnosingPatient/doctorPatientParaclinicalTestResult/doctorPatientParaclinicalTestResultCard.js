import React from 'react';
import './style/doctorPatientParaclinicalTestResultCard.css';

import SpecificInformationItemWrapper from '../../../common/specificInformationItemWrapper';

function DoctorPatientParaclinicalTestResultCard({ patientTestResult }) {
    return (
        <div className="doctorPatientVitalSignsAndPhysicalMeasurementsCard">
            {patientTestResult.testFields.map((field, index) => (
                <SpecificInformationItemWrapper
                    key={index}
                    className="patientParaclinicalTestResult"
                    item={`${field.label} (${field.key})`}
                    itemValue={`${field.value} [Normal: ${field.normalRange}]`}
                />
            ))}
        </div>
    );
}

export default DoctorPatientParaclinicalTestResultCard;