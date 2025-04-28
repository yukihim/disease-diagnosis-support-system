import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import './style/receptionistPatientInformation.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import Button from '../../common/button';
import ButtonText from '../../common/buttonText';

import ReceptionistPatientInformationForm from './receptionistPatientInformation/receptionistPatientInformationForm';

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
};

// Mapping from backend keys to frontend form keys
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
};

// Mapping from frontend form keys to backend keys for saving
const frontendToBackendKeyMap = {
    "Name": "name",
    "DOB": "dob",
    "Gender": "gender",
    "Phone Number": "phone",
    "SSN": "ssn",
    "Health Insurance Code": "hic",
    "Height (cm)": "height",
    "Weight (kg)": "weight",
    "Job": "job",
    "Address": "address",
};


function ReceptionistPatientInformation() {
    const [isEditing, setIsEditing] = useState(false);
    const [patientData, setPatientData] = useState(initialPatientState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Removed saveStatus state as we'll use alert
    // const [saveStatus, setSaveStatus] = useState('');

    const location = useLocation();
    const patientID = location.state?.patientID || location.state?.patientName;

    // --- Fetch Patient Data ---
    useEffect(() => {
        if (!patientID) {
            setError("Patient ID not found in location state.");
            setPatientData(initialPatientState);
            return;
        }

        const fetchPatientInfo = async () => {
            setIsLoading(true);
            setError(null);
            // setSaveStatus(''); // No longer needed
            const token = Cookies.get('token');

            if (!token) {
                setError("User not authenticated.");
                setIsLoading(false);
                return;
            }

            try {
                const apiUrl = `http://localhost:5001/receptionist/finalize_check_in/patient_information/${patientID}`;
                console.log("Fetching patient info from:", apiUrl);

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                    throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Response Data (Patient Info):", data);

                const formattedData = { ...initialPatientState };
                for (const backendKey in backendToFrontendKeyMap) {
                    if (data.hasOwnProperty(backendKey)) {
                        const frontendKey = backendToFrontendKeyMap[backendKey];
                        let value = data[backendKey];
                        if (frontendKey === "Height (cm)" && value && !String(value).includes('cm')) {
                            value = `${value} cm`;
                        }
                        if (frontendKey === "Weight (kg)" && value && !String(value).includes('kg')) {
                            value = `${value} kg`;
                        }
                        formattedData[frontendKey] = value ?? "";
                    }
                }
                setPatientData(formattedData);

            } catch (err) {
                console.error("Error fetching patient information:", err);
                setError(err.message || "Failed to fetch patient information.");
                setPatientData(initialPatientState);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatientInfo();
    }, [patientID]);

    // --- Handle Form Changes ---
    const handleFormChange = useCallback((fieldKey, value) => {
        setPatientData(prev => ({
            ...prev,
            [fieldKey]: value
        }));
        // Clear general error when user starts editing again
        if (error) {
            setError(null);
        }
        // No need to clear saveStatus anymore
        // if (saveStatus) {
        //     setSaveStatus('');
        // }
    }, [error]); // Dependency only on error now

    // --- Handle Save ---
    const handleSaveChanges = async () => {
        if (!patientID) {
            alert("Error: Cannot save without Patient ID."); // Use alert
            return;
        }
        setIsLoading(true);
        setError(null);
        // setSaveStatus('Saving...'); // No longer needed
        const token = Cookies.get('token');

        if (!token) {
            setError("User not authenticated."); // Keep general error state for display
            alert("Error: Authentication failed."); // Use alert
            setIsLoading(false);
            return;
        }

        const payload = {};
        for (const frontendKey in frontendToBackendKeyMap) {
            if (patientData.hasOwnProperty(frontendKey)) {
                const backendKey = frontendToBackendKeyMap[frontendKey];
                let value = patientData[frontendKey];
                if (frontendKey === "Height (cm)") {
                    value = String(value).replace('cm', '').trim();
                }
                if (frontendKey === "Weight (kg)") {
                    value = String(value).replace('kg', '').trim();
                }
                payload[backendKey] = value;
            }
        }

        try {
            const apiUrl = `http://localhost:5001/receptionist/finalize_check_in/patient_information/${patientID}/edit`;
            console.log("Saving patient info to:", apiUrl);
            console.log("Payload:", JSON.stringify(payload));

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                throw new Error(errorData.error || errorData.message || `Save failed: ${response.status}`);
            }

            const result = await response.json();
            console.log("Save Response:", result);
            // setSaveStatus("Saved successfully!"); // Replace with alert
            alert("Saved successfully!"); // Use alert for success
            setIsEditing(false);

        } catch (err) {
            console.error("Error saving patient information:", err);
            setError(err.message || "Failed to save patient information."); // Keep general error state
            // setSaveStatus(`Error: ${err.message || "Failed to save."}`); // Replace with alert
            alert(`Error: ${err.message || "Failed to save."}`); // Use alert for error
        } finally {
            setIsLoading(false);
        }
    };

    // --- Toggle Edit/Save Button Click ---
    const onClickEditButton = () => {
        if (isEditing) {
            handleSaveChanges();
        } else {
            setIsEditing(true);
            // setSaveStatus(''); // No longer needed
        }
    };

    return (
        <BoxContainer className='receptionistPatientInformationBox'>
            <BoxContainerTitle className='receptionistPatientInformation'>
                Patient Information
                <Button
                    className='receptionistPatientInformationEditButton'
                    onClick={onClickEditButton}
                    disabled={isLoading}
                >
                    <ButtonText>
                        {isEditing ? (isLoading ? 'Saving...' : 'Save') : 'Edit'}
                    </ButtonText>
                </Button>
            </BoxContainerTitle>

            <BoxContainerContent className='receptionistPatientInformationContent'>
                {isLoading && !isEditing ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading patient data...</div>
                ) : error && !isEditing ? ( // Only show general fetch error when not editing
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    <ReceptionistPatientInformationForm
                        patientData={patientData}
                        isEditing={isEditing}
                        onFormChange={handleFormChange}
                    />
                )}
                {/* Removed the saveStatus display div */}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistPatientInformation;