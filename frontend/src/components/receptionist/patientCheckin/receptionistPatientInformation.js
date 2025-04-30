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
    followUpDate: "Follow-up Date",
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
    "Follow-up Date": "followUpDate",
};

// Define field groups (keys should match the frontend form keys)
const personalFields = ["Name", "DOB", "Gender", "Phone Number", "Job", "Address"];
const identificationFields = ["SSN", "Health Insurance Code"];
const additionalFields = ["Height (cm)", "Weight (kg)", "Follow-up Date"];

// Define section keys
const SECTIONS = {
    PERSONAL: 'personal',
    IDENTIFICATION: 'identification',
    ADDITIONAL: 'additional',
};

function ReceptionistPatientInformation() {
    // State to track which section is currently being edited (null if none)
    const [editingSection, setEditingSection] = useState(null);
    const [patientData, setPatientData] = useState(initialPatientState);
    // isLoading now tracks both fetching and saving operations
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Store original data to revert changes if needed (optional, but good practice)
    const [originalPatientData, setOriginalPatientData] = useState(initialPatientState);


    const location = useLocation();
    const sessionID = location.state?.sessionID || location.state?.patientName;

    // --- Fetch Patient Data ---
    useEffect(() => {
        if (!sessionID) {
            setError("Patient ID not found in location state.");
            setPatientData(initialPatientState);
            setOriginalPatientData(initialPatientState); // Also set original state
            return;
        }

        const fetchPatientInfo = async () => {
            setIsLoading(true); // Indicate loading start
            setError(null);
            setEditingSection(null); // Ensure not in edit mode on new fetch
            const token = Cookies.get('token');

            if (!token) {
                setError("User not authenticated.");
                setIsLoading(false);
                return;
            }

            try {
                const apiUrl = `http://localhost:5001/receptionist/finalize_check_in/patient_information/${sessionID}`;
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
                        formattedData[frontendKey] = value ?? "";
                    }
                }
                setPatientData(formattedData);
                setOriginalPatientData(formattedData); // Store fetched data as original

            } catch (err) {
                console.error("Error fetching patient information:", err);
                setError(err.message || "Failed to fetch patient information.");
                setPatientData(initialPatientState);
                setOriginalPatientData(initialPatientState); // Reset original data on error
            } finally {
                setIsLoading(false); // Indicate loading end
            }
        };

        fetchPatientInfo();
    }, [sessionID]);

    // --- Handle Form Changes ---
    const handleFormChange = useCallback((fieldKey, value) => {
        setPatientData(prev => ({
            ...prev,
            [fieldKey]: value
        }));
        // Clear save error if user starts typing again
        if (error && editingSection) {
            setError(null);
        }
    }, [error, editingSection]);

    // --- Handle Save ---
    const handleSaveChanges = async () => {
        if (!editingSection) return; // Should not happen if button logic is correct
        if (!sessionID) {
            alert("Error: Cannot save without Patient ID.");
            return;
        }
        setIsLoading(true); // Indicate saving start
        setError(null);
        const token = Cookies.get('token');

        if (!token) {
            setError("User not authenticated.");
            alert("Error: Authentication failed.");
            setIsLoading(false);
            return;
        }

        // Payload still contains all data, as the API likely expects the full object
        const payload = {};
        for (const frontendKey in frontendToBackendKeyMap) {
            if (patientData.hasOwnProperty(frontendKey)) {
                const backendKey = frontendToBackendKeyMap[frontendKey];
                let value = patientData[frontendKey];
                // Remove units before sending to backend
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
            const apiUrl = `http://localhost:5001/receptionist/finalize_check_in/patient_information/${sessionID}/edit`;
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
            alert("Saved successfully!");
            setOriginalPatientData(patientData); // Update original data to the saved state
            setEditingSection(null); // Exit editing mode for the saved section

        } catch (err) {
            console.error("Error saving patient information:", err);
            setError(err.message || "Failed to save patient information.");
            // Keep editing mode active on save error so user can retry or fix
            alert(`Error: ${err.message || "Failed to save."}`);
        } finally {
            setIsLoading(false); // Indicate saving end
        }
    };

    // --- Toggle Edit/Save Button Click ---
    // Handles toggling edit state for a specific section
    const handleToggleEdit = (section) => {
        if (isLoading) return; // Don't change state while loading/saving

        if (editingSection === section) {
            // Currently editing this section, so "Save" was clicked
            handleSaveChanges();
        } else if (editingSection === null) {
            // Not editing any section, so "Edit" was clicked
            setEditingSection(section);
            setError(null); // Clear any previous errors when starting edit
        } else {
            // Trying to edit a different section while another is active
            alert("Please save or cancel changes in the current section before editing another.");
        }
    };

    // --- Handle Cancel --- (Optional: Add a cancel button)
    const handleCancelEdit = (section) => {
        if (editingSection === section) {
            setPatientData(originalPatientData); // Revert changes
            setEditingSection(null);
            setError(null);
        }
    };


    // --- Render Logic ---
    const renderContent = () => {
        // Show initial loading indicator only when not editing and loading is true
        if (isLoading && editingSection === null && !error) {
            return <div style={{ textAlign: 'center', padding: '20px' }}>Loading patient data...</div>;
        }
        // Show fetch error only when not editing
        if (error && editingSection === null) {
            return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error fetching data: {error}</div>;
        }
        // Show save error prominently if it occurs during save attempt
        if (error && editingSection !== null) {
             // Display error above the forms or within the specific section
             // For simplicity, displaying it globally here
             console.warn("Save Error State:", error); // Log to see if it reaches here
        }


        // Helper to determine button text
        const getButtonText = (section) => {
            if (editingSection === section) {
                return isLoading ? 'Saving...' : 'Save';
            }
            return 'Edit';
        };

        // Helper to determine if a button should be disabled
        const isButtonDisabled = (section) => {
            // Disable if any operation is in progress
            if (isLoading) return true;
            // Disable if another section is being edited
            if (editingSection !== null && editingSection !== section) return true;
            // Otherwise, enable
            return false;
        };

        return (
            <>
                {/* Display Save Error Message */}
                 {error && editingSection !== null && (
                    <div style={{ textAlign: 'center', padding: '10px', color: 'red', fontWeight: 'bold' }}>
                        Save Error: {error}
                    </div>
                 )}

                {/* Personal Information Section */}
                <BoxContainer className='receptionistPatientInformationBox'>
                    <BoxContainerTitle className='receptionistPatientInformation'>
                        Personal Information
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'right' }}>
                            <Button
                                className='receptionistPatientInformationEditButton'
                                onClick={() => handleToggleEdit(SECTIONS.PERSONAL)}
                                disabled={isButtonDisabled(SECTIONS.PERSONAL)}
                            >
                                <ButtonText>{getButtonText(SECTIONS.PERSONAL)}</ButtonText>
                            </Button>
                            {/* Optional Cancel Button */}
                            {editingSection === SECTIONS.PERSONAL && !isLoading && (
                                <Button
                                    onClick={() => handleCancelEdit(SECTIONS.PERSONAL)}
                                    style={{ marginLeft: '10px' }}
                                    className="cancel"
                                >
                                    <ButtonText>Cancel</ButtonText>
                                </Button>
                            )}
                        </div>
                    </BoxContainerTitle>
                    <BoxContainerContent className='receptionistPatientInformationContent'>
                        <ReceptionistPatientInformationForm
                            patientData={patientData}
                            isEditing={editingSection === SECTIONS.PERSONAL}
                            onFormChange={handleFormChange}
                            fieldsToShow={personalFields}
                        />
                    </BoxContainerContent>
                </BoxContainer>

                {/* Identification Information Section */}
                <BoxContainer className='receptionistPatientInformationBox'>
                    <BoxContainerTitle className='receptionistPatientInformation'>
                        Identification Information
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'right' }}>
                            <Button
                                className='receptionistPatientInformationEditButton'
                                onClick={() => handleToggleEdit(SECTIONS.IDENTIFICATION)}
                                disabled={isButtonDisabled(SECTIONS.IDENTIFICATION)}
                            >
                                <ButtonText>{getButtonText(SECTIONS.IDENTIFICATION)}</ButtonText>
                            </Button>
                            {/* Optional Cancel Button */}
                            {editingSection === SECTIONS.IDENTIFICATION && !isLoading && (
                                <Button
                                    onClick={() => handleCancelEdit(SECTIONS.IDENTIFICATION)}
                                    style={{ marginLeft: '10px' }}
                                    className="cancel"
                                >
                                    <ButtonText>Cancel</ButtonText>
                                </Button>
                            )}
                        </div>
                    </BoxContainerTitle>
                    <BoxContainerContent className='receptionistPatientInformationContent'>
                        <ReceptionistPatientInformationForm
                            patientData={patientData}
                            isEditing={editingSection === SECTIONS.IDENTIFICATION}
                            onFormChange={handleFormChange}
                            fieldsToShow={identificationFields}
                        />
                    </BoxContainerContent>
                </BoxContainer>

                {/* Additional Information Section */}
                <BoxContainer className='receptionistPatientInformationBox'>
                    <BoxContainerTitle className='receptionistPatientInformation'>
                        Additional Information
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'right' }}>
                            <Button
                                className='receptionistPatientInformationEditButton'
                                onClick={() => handleToggleEdit(SECTIONS.ADDITIONAL)}
                                disabled={isButtonDisabled(SECTIONS.ADDITIONAL)}
                            >
                                <ButtonText>{getButtonText(SECTIONS.ADDITIONAL)}</ButtonText>
                            </Button>
                            {/* Optional Cancel Button */}
                            {editingSection === SECTIONS.ADDITIONAL && !isLoading && (
                                <Button
                                    onClick={() => handleCancelEdit(SECTIONS.ADDITIONAL)}
                                    style={{ marginLeft: '10px' }}
                                    className="cancel"
                                >
                                    <ButtonText>Cancel</ButtonText>
                                </Button>
                            )}
                        </div>
                    </BoxContainerTitle>
                    <BoxContainerContent className='receptionistPatientInformationContent'>
                        <ReceptionistPatientInformationForm
                            patientData={patientData}
                            isEditing={editingSection === SECTIONS.ADDITIONAL}
                            onFormChange={handleFormChange}
                            fieldsToShow={additionalFields}
                        />
                    </BoxContainerContent>
                </BoxContainer>
            </>
        );
    };

    return (
        // Render the sections or loading/error message
        renderContent()
    );
}

export default ReceptionistPatientInformation;