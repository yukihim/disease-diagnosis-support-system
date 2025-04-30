import React from 'react';
import './style/receptionistPatientInformationForm.css';

import SpecificInformationItemWrapper from '../../../common/specificInformationItemWrapper';

// Define all possible fields here, matching the keys in patientData state
const allPatientFields = [
    { key: "Name", label: "Name" },
    { key: "DOB", label: "DOB", type: "date" },
    { key: "Gender", label: "Gender" },
    { key: "Phone Number", label: "Phone Number" },
    { key: "SSN", label: "SSN" },
    { key: "Health Insurance Code", label: "Health Insurance Code" },
    { key: "Height (cm)", label: "Height (cm)" },
    { key: "Weight (kg)", label: "Weight (kg)" },
    { key: "Job", label: "Job" },
    { key: "Address", label: "Address" },
    { key: "Follow-up Date", label: "Follow-up Date", type: "date" },
];

// Accept patientData, isEditing, onFormChange, and fieldsToShow props
function ReceptionistPatientInformationForm({ patientData, isEditing, onFormChange, fieldsToShow }) {

    // handleChange now calls the prop function
    const handleChange = (field, value) => {
        // If the user clears the date picker for Follow-up Date, ensure we pass an empty string, not "None"
        if (field === "Follow-up Date" && value === "None") {
             onFormChange(field, '');
        } else {
            onFormChange(field, value); // Call the handler passed from parent
        }
    };

    // Filter the fields based on the fieldsToShow prop
    // If fieldsToShow is not provided, default to showing all fields (or handle as needed)
    const fieldsToRender = fieldsToShow
        ? allPatientFields.filter(field => fieldsToShow.includes(field.key))
        : allPatientFields; // Default to all if prop not passed


    return (
        <div className="receptionistPatientInformationForm">
            {fieldsToRender.map(field => {
                // Determine the original value
                let originalValue = patientData[field.key] ?? '';
                let valueToPass = originalValue;

                // Special handling for "Follow-up Date" when it's an empty string
                // Only change the display value, not the value used for editing
                if (field.key === "Follow-up Date" && originalValue === '') {
                    // When NOT editing, display "None"
                    // When editing, keep it as '' for the date input
                    valueToPass = isEditing ? '' : "None";
                }

                // Render the component with the potentially modified value
                return (
                    <SpecificInformationItemWrapper
                        key={field.key}
                        item={field.label}
                        // Pass the potentially modified value for display/editing
                        itemValue={valueToPass}
                        isEditing={isEditing}
                        // The onChange handler receives the actual input value (e.g., 'yyyy-MM-dd' or '')
                        onChange={(value) => handleChange(field.key, value)}
                        fieldType={field.type}
                        // Apply grid span for Address field
                        customStyle={{ gridColumn: field.label === "Address" ? "span 3" : "span 1" }}
                    />
                );
            })}
        </div>
    );
}

export default ReceptionistPatientInformationForm;