import React from 'react';
import './style/patientInformationForm.css';

import SpecificInformationItemWrapper from '../specificInformationItemWrapper';

const patientFields = [
    { key: "Name", label: "Name" },
    { key: "DOB", label: "DOB" },
    { key: "Gender", label: "Gender" },
    { key: "Type", label: "Type" },
    { key: "Phone Number", label: "Phone Number" },
    { key: "Job", label: "Job" },
    // Potential Column 2
    { key: "SSN", label: "SSN" },
    { key: "Health Insurance Code", label: "Health Insurance Code" },
    { key: "Height (cm)", label: "Height (cm)" },
    { key: "Weight (kg)", label: "Weight (kg)" },
    // Address might span or be last
    { key: "Address", label: "Address" },
];

function PatientInformationForm({ patientInformation }) {
    return (
        <div className="patientInformationForm">
            {patientFields.map(field => (
                <SpecificInformationItemWrapper
                    key={field.key}
                    item={field.label}
                    itemValue={patientInformation[field.key]}
                />
            ))}
        </div>
    );
}

export default PatientInformationForm;