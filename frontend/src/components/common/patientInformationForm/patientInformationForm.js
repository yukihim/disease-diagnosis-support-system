import React from 'react';
import './style/patientInformationForm.css';

import SpecificInformationItemWrapper from '../specificInformationItemWrapper';

// Helper function to calculate age from DOB string (MM-DD-YYYY or YYYY-MM-DD)
function calculateAge(dobString) {
    if (!dobString) return 'N/A';

    let datePart = dobString.split(' ')[0]; // Handle potential time part if any
    let parts;
    let dob;

    if (datePart.includes('-')) {
        parts = datePart.split('-');
        if (parts.length === 3) {
            // Check if it's YYYY-MM-DD
            if (parts[0].length === 4) {
                dob = new Date(datePart); // Already in a good format (YYYY-MM-DD)
            }
            // Check if it's MM-DD-YYYY
            else if (parts[2].length === 4) {
                // Format as YYYY-MM-DD for Date object (Month is 0-indexed)
                dob = new Date(parts[2], parseInt(parts[0], 10) - 1, parts[1]);
            }
        }
    }


    if (!dob || isNaN(dob.getTime())) {
        return 'Invalid DOB'; // Handle invalid date format or value
    }

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age >= 0 ? age : 'Invalid DOB'; // Return calculated age or error
}


// Define all possible fields here
const allPatientFields = [
    { key: "Name", label: "Name" },
    { key: "Gender", label: "Gender" },
    { key: "Age", label: "Age" }, // This field will display the calculated age
    { key: "DOB", label: "DOB", type: "date" }, // Keep DOB for calculation, add type
    { key: "Type", label: "Type" },
    { key: "Phone Number", label: "Phone Number" },
    { key: "Job", label: "Job" },
    { key: "SSN", label: "SSN" },
    { key: "Health Insurance Code", label: "Health Insurance Code" },
    { key: "Height (cm)", label: "Height (cm)" },
    { key: "Weight (kg)", label: "Weight (kg)" },
    { key: "Address", label: "Address" },
    { key: "Follow-up Date", label: "Follow-up Date", type: "date" },
];

// Accept fieldsToShow prop
function PatientInformationForm({ patientInformation, fieldsToShow }) {
    // If patientInformation is null or undefined, render nothing or a placeholder
    if (!patientInformation) {
        return <div className="patientInformationForm">No patient data available.</div>;
    }

    // Filter the fields based on the fieldsToShow prop
    // If fieldsToShow is not provided, default to showing all fields (or handle as needed)
    const fieldsToRender = fieldsToShow
        ? allPatientFields.filter(field => fieldsToShow.includes(field.key))
        : allPatientFields; // Default to all if prop not passed

    return (
        <div className="patientInformationForm">
            {fieldsToRender.map(field => {
                // Skip rendering DOB itself if Age is being calculated/shown, unless DOB is explicitly in fieldsToShow
                if (field.key === "DOB" && fieldsToRender.some(f => f.key === "Age")) {
                    // Only render DOB if it's specifically requested in fieldsToShow
                    if (!fieldsToShow || !fieldsToShow.includes("DOB")) {
                         return null;
                    }
                }

                let displayValue;

                if (field.key === "Age") {
                    // Calculate age using the DOB field from the data object
                    displayValue = calculateAge(patientInformation["DOB"]);
                } else {
                    // Get the value directly from patientInformation for other fields
                    displayValue = patientInformation[field.key];
                }

                // Ensure a fallback for undefined/null values from data
                // Keep "None" as is if it's the value for Follow-up Date
                if (field.key === "Follow-up Date" && displayValue === "None") {
                    // Keep "None"
                } else {
                     displayValue = (displayValue !== undefined && displayValue !== null && displayValue !== '') ? displayValue : 'N/A';
                }


                return (
                    <SpecificInformationItemWrapper
                        key={field.key}
                        item={field.label}
                        itemValue={displayValue}
                        // Pass isEditing={false} if this form is always read-only
                        isEditing={false}
                        // Pass fieldType if SpecificInformationItemWrapper uses it for formatting
                        fieldType={field.type}
                        customStyle={{ gridColumn: field.label == "Address" ? "1 / -1" : "span 1" }}
                    />
                );
            })}
        </div>
    );
}

export default PatientInformationForm;