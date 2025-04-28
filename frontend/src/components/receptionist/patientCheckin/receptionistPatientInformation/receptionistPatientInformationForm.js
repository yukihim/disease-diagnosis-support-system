import React from 'react'; // Removed useState
import './style/receptionistPatientInformationForm.css';

import SpecificInformationItemWrapper from '../../../common/specificInformationItemWrapper';

// Receive patientData and onFormChange from parent
function ReceptionistPatientInformationForm({ patientData, isEditing, onFormChange }) {

    // No internal state needed anymore

    // handleChange now calls the prop function
    const handleChange = (field, value) => {
        onFormChange(field, value); // Call the handler passed from parent
    };

    const patientFields = [
        // Keys should match the keys in the patientData state object
        { key: "Name", label: "Name" },
        { key: "DOB", label: "DOB" },
        { key: "Gender", label: "Gender" },
        { key: "Phone Number", label: "Phone Number" },
        { key: "SSN", label: "SSN" },
        { key: "Health Insurance Code", label: "Health Insurance Code" },
        { key: "Height (cm)", label: "Height (cm)" },
        { key: "Weight (kg)", label: "Weight (kg)" },
        { key: "Job", label: "Job" },
        { key: "Address", label: "Address" },
        { key: "Follow-up Date", label: "Follow-up Date" }, // Keep or remove based on requirements
    ];

    return (
        <div className="receptionistPatientInformationForm">
            {patientFields.map(field => (
                <SpecificInformationItemWrapper
                    key={field.key}
                    item={field.label}
                    // Use patientData prop directly
                    itemValue={patientData[field.key] ?? ''} // Use nullish coalescing for safety
                    isEditing={isEditing}
                    onChange={(value) => handleChange(field.key, value)}
                />
            ))}
        </div>
    );
}

export default ReceptionistPatientInformationForm;