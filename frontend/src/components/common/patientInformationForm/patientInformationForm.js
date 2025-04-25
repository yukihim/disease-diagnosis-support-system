import React from 'react';
import './style/patientInformationForm.css';

import SpecificInformationItemWrapper from '../specificInformationItemWrapper';

// Helper function to calculate age from DOB string (DD/MM/YYYY)
function calculateAge(dobString) {
    if (!dobString || typeof dobString !== 'string') return 'N/A'; // Handle missing or invalid input
    try {
        const parts = dobString.split('/');
        if (parts.length !== 3) return 'Invalid Format';
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
        const year = parseInt(parts[2], 10);

        if (isNaN(day) || isNaN(month) || isNaN(year)) return 'Invalid Date Parts';

        const birthDate = new Date(year, month, day);
         // Basic validation: Check if the constructed date parts match the input
        if (isNaN(birthDate.getTime()) || birthDate.getDate() !== day || birthDate.getMonth() !== month || birthDate.getFullYear() !== year) {
             return 'Invalid Date';
        }

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 0 ? age : 'Invalid Date'; // Return calculated age or 'Invalid Date'
    } catch (error) {
        console.error("Error calculating age:", error);
        return 'Error'; // Return 'Error' in case of unexpected issues
    }
}


const patientFields = [
    { key: "Name", label: "Name" },
    // { key: "DOB", label: "DOB" }, // Decide if you still want to show DOB separately
    { key: "Age", label: "Age" }, // This field will display the calculated age
    { key: "Gender", label: "Gender" },
    { key: "Type", label: "Type" },
    { key: "Phone Number", label: "Phone Number" },
    { key: "Job", label: "Job" },
    { key: "SSN", label: "SSN" },
    { key: "Health Insurance Code", label: "Health Insurance Code" },
    { key: "Height (cm)", label: "Height (cm)" },
    { key: "Weight (kg)", label: "Weight (kg)" },
    { key: "Address", label: "Address" },
    { key: "Follow-up Date", label: "Follow-up Date" },
];

function PatientInformationForm({ patientInformation }) {
    return (
        <div className="patientInformationForm">
            {patientFields.map(field => {
                let displayValue;

                if (field.key === "Age") {
                    // Calculate age using the DOB field from the data object
                    displayValue = calculateAge(patientInformation["DOB"]);
                } else {
                    // Get the value directly from patientInformation for other fields
                    displayValue = patientInformation[field.key];
                }

                // Ensure a fallback for undefined/null values from data
                displayValue = (displayValue !== undefined && displayValue !== null) ? displayValue : 'N/A';

                return (
                    <SpecificInformationItemWrapper
                        key={field.key}
                        item={field.label}
                        itemValue={displayValue}
                    />
                );
            })}
        </div>
    );
}

export default PatientInformationForm;