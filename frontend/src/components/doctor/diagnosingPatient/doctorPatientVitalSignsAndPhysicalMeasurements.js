import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { useLocation } from 'react-router-dom'; // For accessing location state
import Cookies from 'js-cookie'; // Assuming you might need Cookies for API calls
import './style/doctorPatientVitalSignsAndPhysicalMeasurements.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';
import DropDownBox from '../../common/dropDownBox'; // Import DropDownBox

import Button from '../../common/button'; // Import Button if needed
import ButtonText from '../../common/buttonText'; // Import ButtonText if needed

import DoctorPatientVitalSignsAndPhysicalMeasurementsCard from './doctorPatientVitalSignsAndPhysicalMeasurements/doctorPatientVitalSignsAndPhysicalMeasurementsCard';

// Define the structure of vitals expected (keys for measurements only)
const vitalSignsKeys = [
    "Blood Pressure (mmHg)",
    "Pulse (beats/minute)",
    "Breathing Rate (breaths/minute)",
    "Temperature (°C)",
    "BMI",
    "Oxygen Saturation (%)"
];

// Helper to create an empty structure for editable vitals
const createEmptyVitalsStructure = () => vitalSignsKeys.reduce((acc, key) => {
    acc[key] = "";
    return acc;
}, {});


function DoctorPatientVitalSignsAndPhysicalMeasurements({ userRole }) { // Added sessionID prop
    const location = useLocation(); // Use location to get sessionID
    // patientVitalsHistory stores an array of past measurements (flat structure)
    const [patientVitalsHistory, setPatientVitalsHistory] = useState([]);
    // selectedVitalsIndex tracks which measurement set is selected (for doctor)
    const [selectedVitalsIndex, setSelectedVitalsIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Controls nurse's edit mode
    const [editableVitals, setEditableVitals] = useState(createEmptyVitalsStructure()); // Holds values for nurse input
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null); // Added error state

    const sessionID = location.state?.sessionID; // Get sessionID from location state

    // Fetch data from API - Wrapped in useCallback
    const fetchVitalsData = useCallback(async () => {
        // Need sessionID or patientID to fetch specific patient data
        if (!sessionID) {
            setError("Session ID not provided. Cannot fetch vitals.");
            setPatientVitalsHistory([]);
            return;
        }

        setIsLoading(true);
        setError(null); // Clear previous errors
        const token = Cookies.get('token'); // Get token for auth
        if (!token) {
            setError("User not authenticated.");
            setIsLoading(false);
            return;
        }

        try {
            // --- API Call ---
            const apiUrl = `http://localhost:5001/doctor/diagnosis/vital_signs/${sessionID}`;
            // console.log("PATIENT VITAL SIGNS _ Fetching vitals from:", apiUrl);
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // console.log("PATIENT VITAL SIGNS _ API response status:", response.status); // Log the response status

            if (!response.ok) {
                let errorMsg = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorData.error || errorMsg;
                } catch (e) { /* Ignore parsing error */ }
                throw new Error(errorMsg);
            }

            const data = await response.json(); // Assuming data is {"vitalSigns": [...]}
            const vitalsData = data.vitalSigns || []; // Default to empty array if key is missing

            // Assuming backend keys match vitalSignsKeys and timestamp is 'timeMeasured'
             const formattedVitalsData = vitalsData.map(record => ({
                timestamp: record.timeMeasured, // Use the key from backend response
                "Blood Pressure (mmHg)": record.bloodPressure,
                "Pulse (beats/minute)": record.pulse,
                "Breathing Rate (breaths/minute)": record.breathingRate,
                "Temperature (°C)": record.temperature,
                "BMI": record.bmi,
                "Oxygen Saturation (%)": record.oxygenSaturation
            }));


            setPatientVitalsHistory(formattedVitalsData);
            // Reset selection to the newest entry (index 0) if data exists
            setSelectedVitalsIndex(formattedVitalsData.length > 0 ? 0 : -1); // Use -1 if no data

            // Initialize editableVitals for the nurse (always starts fresh)
            if (userRole === 'nurse') {
                setEditableVitals(createEmptyVitalsStructure());
                setIsEditing(false); // Nurse must click button to start
            }

        } catch (err) {
            console.error('Error fetching vital signs history:', err);
            setError(err.message || "Failed to fetch vital signs.");
            setPatientVitalsHistory([]); // Ensure empty array on error
            if (userRole === 'nurse') {
                setEditableVitals(createEmptyVitalsStructure()); // Reset to empty on error
            }
        } finally {
            setIsLoading(false);
        }
    }, [sessionID, userRole]); // Add sessionID and userRole as dependencies

    useEffect(() => {
        fetchVitalsData();
    }, [fetchVitalsData]); // Depend on the memoized fetch function

    const handleInputChange = (key, value) => {
        setEditableVitals(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Handle saving NEW vitals (Nurse)
    const handleSaveVitals = useCallback(async () => {
        if (!sessionID) {
             setError("Session ID not provided. Cannot save vitals.");
             return;
        }
        setIsSaving(true);
        setError(null);
        const token = Cookies.get('token');
        if (!token) {
            setError("User not authenticated.");
            setIsSaving(false);
            return;
        }

        try {
            // console.log("Saving new vitals:", editableVitals);
            // Replace with your actual API endpoint to save NEW vitals (likely a Nurse endpoint)
            // Example: const apiUrl = `http://localhost:5001/nurse/input_vital_sign/${sessionID}`;
            // Need to map frontend keys back to backend expected keys if they differ
            const payload = {
                bloodPressure: editableVitals["Blood Pressure (mmHg)"],
                pulse: editableVitals["Pulse (beats/minute)"],
                breathingRate: editableVitals["Breathing Rate (breaths/minute)"],
                temperature: editableVitals["Temperature (°C)"],
                bmi: editableVitals["BMI"],
                oxygenSaturation: editableVitals["Oxygen Saturation (%)"]
            };

            // const response = await fetch(apiUrl, {
            //     method: 'POST',
            //     headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            //     body: JSON.stringify(payload) // Send mapped payload
            // });
            // if (!response.ok) {
            //      let errorMsg = `HTTP error! status: ${response.status}`;
            //      try { const errorData = await response.json(); errorMsg = errorData.message || errorMsg; } catch(e){}
            //      throw new Error(errorMsg);
            // }
            // const savedData = await response.json(); // API might return the saved record or just success

            // Mock successful save
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Use a consistent timestamp format (ideally from server response)
            const now = new Date();
            const timestamp = now.toISOString(); // Example: "2025-05-01T10:30:00.000Z"

            const newlySavedVitals = {
                timestamp: timestamp, // Use server timestamp if possible
                ...editableVitals // Spread the measurement values
            };

            // Add the new record to the history (client-side) and refetch or update state
            setPatientVitalsHistory(prev => [newlySavedVitals, ...prev]);
            setSelectedVitalsIndex(0); // Select the newly added record
            setIsEditing(false); // Exit edit mode
            setEditableVitals(createEmptyVitalsStructure()); // Clear the form

            // Optionally: Trigger a refetch if needed: fetchVitalsData();

        } catch (err) {
            console.error('Error saving vital signs data:', err);
            setError(err.message || "Failed to save vital signs.");
        } finally {
            setIsSaving(false);
        }
    }, [editableVitals, sessionID, fetchVitalsData]); // Include dependencies

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset editableVitals to empty structure
        setEditableVitals(createEmptyVitalsStructure());
        setError(null); // Clear any previous save errors
    };

    const handleStartEditing = () => {
        // Start with a blank slate for new measurements
        setEditableVitals(createEmptyVitalsStructure());
        setIsEditing(true);
        setError(null); // Clear errors when starting edit
    };

    // Handle dropdown change (Doctor)
    const handleVitalsChange = (e) => {
        setSelectedVitalsIndex(parseInt(e.target.value, 10));
    };

    // Generate options for dropdown (Doctor)
    const vitalsOptions = patientVitalsHistory.map((vitals, index) => ({
        // Format timestamp for display if needed
        label: `Measurement at ${new Date(vitals.timestamp).toLocaleString()}`, // Example formatting
        value: index.toString()
    }));

    // Get the currently selected vitals data for display (Doctor)
    // Extract only the measurement keys for the card component
    const currentSelectedVitalsData = patientVitalsHistory[selectedVitalsIndex];
    const measurementsForCard = currentSelectedVitalsData
        ? vitalSignsKeys.reduce((acc, key) => {
              acc[key] = currentSelectedVitalsData[key] ?? ''; // Use nullish coalescing for default
              return acc;
          }, {})
        : null;

    // Get the latest measurements for Nurse view mode
    const latestVitalsData = patientVitalsHistory.length > 0 ? patientVitalsHistory[0] : null;
    const latestMeasurementsForCard = latestVitalsData
        ? vitalSignsKeys.reduce((acc, key) => {
              acc[key] = latestVitalsData[key] ?? '';
              return acc;
          }, {})
        : null;


    return (
        <BoxContainer className='doctorPatientVitalSignsAndPhysicalMeasurementsBox'>
            <BoxContainerTitle className='doctorPatientVitalSignsAndPhysicalMeasurements'>
                Patient's Vital Signs
                {isLoading &&
                    <span className="loading-indicator"> Loading...</span>
                }
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPatientVitalSignsAndPhysicalMeasurementsContent'>
                {/* Error Display */}
                {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>Error: {error}</div>}

                {/* Loading Indicator */}
                {isLoading && <div className="loading-indicator">Loading vital signs history...</div>}

                {/* Doctor View */}
                {!isLoading && userRole === 'doctor' && (
                    patientVitalsHistory.length > 0 ? (
                        <>
                            {/* Dropdown for Doctor */}
                            {patientVitalsHistory.length > 1 && ( // Only show if more than one record
                                <DropDownBox
                                    options={vitalsOptions}
                                    value={selectedVitalsIndex.toString()}
                                    onChange={handleVitalsChange}
                                    style={{ marginBottom: '15px' }} // Add some spacing
                                />
                            )}
                            {/* Display Selected Vitals */}
                            {measurementsForCard && (
                                <>
                                    {/* Optional: Display timestamp separately if needed */}
                                    {/* <div className="vitalsTimestamp">
                                        Recorded at: {new Date(currentSelectedVitalsData.timestamp).toLocaleString()}
                                    </div> */}
                                    <DoctorPatientVitalSignsAndPhysicalMeasurementsCard
                                        // Pass only the measurement key-value pairs
                                        patientVitalSignsAndPhysicalMeasurements={measurementsForCard}
                                    />
                                </>
                            )}
                        </>
                    ) : (
                        <div className="no-data">No data</div> // Show only if no error
                    )
                )}

                {/* Nurse View */}
                {!isLoading && userRole === 'nurse' && (
                    isEditing ? (
                        // Nurse Edit Form for NEW vitals
                        <div className="editableVitalsForm">
                            {/* Map over the defined keys to ensure order and completeness */}
                            {vitalSignsKeys.map(key => (
                                <div className="vitalInputGroup" key={key}>
                                    <label>{key}</label>
                                    <input
                                        type="text"
                                        value={editableVitals[key]}
                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                        disabled={isSaving}
                                        placeholder={`Enter ${key}`}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Nurse View Mode (Show last recorded data if available, or prompt to enter)
                        latestMeasurementsForCard ? (
                            <>
                                <div className="vitalsTimestamp" style={{ marginBottom: '10px', fontSize: '0.9em', color: '#555' }}>
                                    Last recorded: {new Date(latestVitalsData.timestamp).toLocaleString()} {/* Show newest */}
                                </div>
                                <DoctorPatientVitalSignsAndPhysicalMeasurementsCard
                                    patientVitalSignsAndPhysicalMeasurements={latestMeasurementsForCard}
                                />
                            </>
                        ) : (
                             !error && <div className="no-data">No vital signs recorded yet. Click 'Enter New Vitals'.</div> // Show only if no error
                        )
                    )
                )}


                {/* Nurse Controls */}
                {userRole === 'nurse' && !isLoading && ( // Hide controls while loading initial data
                    <div className="nurseControls" style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                        {!isEditing ? (
                            <Button
                                className="editButton" // Consider specific styling
                                onClick={handleStartEditing}
                                disabled={isSaving} // Disable if a save is somehow in progress (unlikely here)
                            >
                                <ButtonText>Enter New Vitals</ButtonText>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    className="saveButton" // Consider specific styling
                                    onClick={handleSaveVitals}
                                    disabled={isSaving}
                                >
                                    <ButtonText>{isSaving ? 'Saving...' : 'Save Measurements'}</ButtonText>
                                </Button>
                                <Button
                                    className="cancelButton" // Consider specific styling
                                    onClick={handleCancelEdit}
                                    disabled={isSaving} // Disable cancel during save
                                    style={{ backgroundColor: '#6c757d' }} // Example secondary button color
                                >
                                    <ButtonText>Cancel</ButtonText>
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPatientVitalSignsAndPhysicalMeasurements;