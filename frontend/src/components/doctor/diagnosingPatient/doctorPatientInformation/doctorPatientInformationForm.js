import React from 'react';
import './style/doctorPatientInformationForm.css';

import SpecificInformationItemWrapper from '../../../common/specificInformationItemWrapper';

const patientFields = [
    { key: "Name", label: "Name" },
    { key: "DOB", label: "DOB" },
    { key: "Gender", label: "Gender" },
    { key: "Phone Number", label: "Phone Number" },
    { key: "SSN", label: "SSN" },
    { key: "Health Insurance Code", label: "Health Insurance Code" },
    { key: "Job", label: "Job" },
    { key: "Address", label: "Address" },
    { key: "Height (cm)", label: "Height (cm)" },
    { key: "Weight (kg)", label: "Weight (kg)" },
];

const condensedPatientFields = [
    { key: "Name", label: "Name" },
    { key: "SSN", label: "SSN" },
];

function DoctorPatientInformationForm({ patientInformation, isCondensed }) {
    const fieldsToDisplay = isCondensed ? condensedPatientFields : patientFields;
    
    return (
        <div className="doctorPatientInformationForm">
            {fieldsToDisplay.map(field => (
                <SpecificInformationItemWrapper
                    key={field.key}
                    item={field.label}
                    itemValue={patientInformation[field.key]}
                />
            ))}
        </div>
    );
}

export default DoctorPatientInformationForm;