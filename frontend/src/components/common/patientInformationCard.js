import React, { useState, useEffect } from 'react'; // Added useState, useEffect
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies
import './style/patientInformationCard.css';

import BoxContainer from './boxContainer';
import BoxContainerTitle from './boxContainerTitle';
import BoxContainerContent from './boxContainerContent';

import PatientInformationForm from './patientInformationForm/patientInformationForm';

// Remove or comment out initialPatientInformationHolder as data will be fetched
/*
const initialPatientInformationHolder = [
    // ... mock data ...
];
*/

// Define initial empty state structure matching the form fields
const initialPatientState = {
    "Name": "",
    "DOB": "",
    "Gender": "",
    "Phone Number": "",
    "SSN": "",
    "Health Insurance Code": "",
    "Height (cm)": "",
    "Weight (kg)": "",
    "Job": "",
    "Address": "",
    "Follow-up Date": "",
    "Type": "",
    // Add any other fields expected by the form, even if not directly from this specific API
};

// Mapping from backend keys (assuming structure from ReceptionistPatientInformation) to frontend form keys
const backendToFrontendKeyMap = {
    name: "Name",
    dob: "DOB",
    gender: "Gender",
    phone: "Phone Number",
    ssn: "SSN",
    hic: "Health Insurance Code",
    height: "Height (cm)",
    weight: "Weight (kg)",
    job: "Job",
    address: "Address",
    followUpDate: "Follow-up Date",
    type: "Type",
    // Add mappings for any other relevant backend fields if the API provides them
};


// Define field groups (keys should match the frontend form keys)
const personalFields = ["Name", "Gender", "Age", "DOB", "Phone Number", "Job", "Address"];
const identificationFields = ["SSN", "Health Insurance Code"];
const additionalFields = ["Type", "Height (cm)", "Weight (kg)", "Follow-up Date"]; // 'Type' might need a source

function PatientInformationCard() {
    const location = useLocation();
    // Get sessionID from location state, similar to ReceptionistPatientInformation
    // Use a more specific key if possible, e.g., patientIdToFetch
    const sessionID = location.state?.sessionID || location.state?.patientName; // Fallback to name if ID not present

    const [patientInformation, setPatientInformation] = useState(null); // Initialize state for fetched data
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Fetch Patient Data ---
    useEffect(() => {
        // Skip fetch if sessionID is not available
        if (!sessionID) {
            setError("Patient identifier (ID or Name) not found in location state.");
            setPatientInformation(null); // Ensure no stale data is shown
            return;
        }

        const fetchPatientInfo = async () => {
            setIsLoading(true);
            setError(null);
            setPatientInformation(null); // Clear previous data before fetching
            const token = Cookies.get('token');

            if (!token) {
                setError("User not authenticated.");
                setIsLoading(false);
                return;
            }

            try {
                // Use the sessionID (which might be ID or name) in the URL
                const apiUrl = `http://localhost:5001/receptionist/finalize_check_in/patient_information/${sessionID}`;
                // console.log("Fetching patient info for card from:", apiUrl);

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                    // Use error message from backend if available
                    throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                // console.log("RECEPTIONIST PATIENT INFORMATION _ API Response Data (Patient Info Card):", data);

                // Format data from backend keys to frontend keys
                const formattedData = { ...initialPatientState }; // Start with default structure
                for (const backendKey in backendToFrontendKeyMap) {
                    if (data.hasOwnProperty(backendKey)) {
                        const frontendKey = backendToFrontendKeyMap[backendKey];
                        // Use nullish coalescing to handle null/undefined from API, default to empty string
                        formattedData[frontendKey] = data[backendKey] ?? "";
                    }
                }
                // Add sessionID or sessionID if needed elsewhere, though not directly in the form fields
                // formattedData.identifier = sessionID;

                setPatientInformation(formattedData);

            } catch (err) {
                console.error("Error fetching patient information for card:", err);
                setError(err.message || "Failed to fetch patient information.");
                setPatientInformation(null); // Clear data on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatientInfo();
    }, [sessionID]); // Re-fetch if sessionID changes

    // --- Rendering Logic ---

    if (isLoading) {
        return (
            <BoxContainer className='patientInformationBoxTop'>
                <BoxContainerTitle className='patientInformationTitle'>
                    Patient Information
                </BoxContainerTitle>
                <BoxContainerContent className='patientInformationContent'>
                    Loading patient data...
                </BoxContainerContent>
            </BoxContainer>
        );
    }

    if (error) {
        return (
            <BoxContainer className='patientInformationBoxTop'>
                <BoxContainerTitle className='patientInformationTitle'>
                    Patient Information
                </BoxContainerTitle>
                <BoxContainerContent className='patientInformationContent' style={{ color: 'red' }}>
                    Error: {error}
                </BoxContainerContent>
            </BoxContainer>
        );
    }

    // Handle case where patientInformation is null after fetch (e.g., not found by API)
    if (!patientInformation) {
        return (
            <BoxContainer className='patientInformationBoxTop'>
                <BoxContainerTitle className='patientInformationTitle'>
                    Patient Information
                </BoxContainerTitle>
                <BoxContainerContent className='patientInformationContent'>
                    Patient not found or data unavailable.
                </BoxContainerContent>
            </BoxContainer>
        );
    }

    // Render the sections with fetched data
    return (
        <>
            <BoxContainer className='patientInformationBoxTop'>
                <BoxContainerTitle className='patientInformationTitle'>
                    Patient's Personal Information
                </BoxContainerTitle>
                <BoxContainerContent className='patientInformationContent'>
                    <PatientInformationForm
                        patientInformation={patientInformation}
                        fieldsToShow={personalFields}
                    />
                </BoxContainerContent>
            </BoxContainer>

            <BoxContainer className='patientInformationBox'>
                <BoxContainerTitle className='patientInformationTitle'>
                    Patient's Identification Information
                </BoxContainerTitle>
                <BoxContainerContent className='patientInformationContent'>
                    <PatientInformationForm
                        patientInformation={patientInformation}
                        fieldsToShow={identificationFields}
                    />
                </BoxContainerContent>
            </BoxContainer>

            <BoxContainer className='patientInformationBox'>
                <BoxContainerTitle className='patientInformationTitle'>
                    Patient's Additional Information
                </BoxContainerTitle>
                <BoxContainerContent className='patientInformationContent'>
                    <PatientInformationForm
                        patientInformation={patientInformation}
                        fieldsToShow={additionalFields}
                    />
                </BoxContainerContent>
            </BoxContainer>
        </>
    );
}

export default PatientInformationCard;