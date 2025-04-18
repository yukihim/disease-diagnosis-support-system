// // import React, { useState, useEffect } from 'react';
// // import './style/doctorPatientVitalSignsAndPhysicalMeasurements.css';

// // import BoxContainer from '../../common/boxContainer';
// // import BoxContainerTitle from '../../common/boxContainerTitle';
// // import BoxContainerContent from '../../common/boxContainerContent';

// // import DoctorPatientVitalSignsAndPhysicalMeasurementsCard from './doctorPatientVitalSignsAndPhysicalMeasurements/doctorPatientVitalSignsAndPhysicalMeasurementsCard';

// // function DoctorPatientVitalSignsAndPhysicalMeasurements({ userRole }) {
// //     const [patientVitals, setPatientVitals] = useState(null);
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [isEditing, setIsEditing] = useState(false);
// //     const [editableVitals, setEditableVitals] = useState({});
// //     const [isSaving, setIsSaving] = useState(false);
    
// //     // Fetch data from API
// //     const fetchVitalsData = async () => {
// //         try {
// //             setIsLoading(true);
// //             // Replace with your actual API endpoint
// //             // const response = await fetch('your-api-endpoint/patient/vitals');
// //             // const data = await response.json();
// //             // setPatientVitals(data);
            
// //             // Mock data for demonstration
// //             const mockData = {
// //                 timestamp: "2025-03-29 01:58 PM",
// //                 measurements: {
// //                     "Blood Pressure (mmHg/mmHg)": "120/80 mmHg",
// //                     "Pulse (beats/minute)": "72 beats/minute",
// //                     "Breathing Rate (breaths/minute)": "16 breaths/minute",
// //                     "Temperature (°C)": "36.8 °C",
// //                     "BMI": "22.9",
// //                     "Oxygen Saturation (%)": "98%"
// //                 }
// //             };
            
// //             // Simulate network delay
// //             setTimeout(() => {
// //                 if (userRole === 'doctor') {
// //                     setPatientVitals(mockData);
// //                 } else if (userRole === 'nurse') {
// //                     setEditableVitals({...mockData.measurements});
// //                 }
// //                 setIsLoading(false);
// //             }, 500);
            
// //         } catch (error) {
// //             console.error('Error fetching vital signs data:', error);
// //             setIsLoading(false);
// //         }
// //     };
    
// //     useEffect(() => {
// //         fetchVitalsData();
        
// //         // Set up interval to fetch data every 5 seconds - only for doctor view
// //         let intervalId;
// //         if (userRole === 'doctor') {
// //             intervalId = setInterval(() => {
// //                 fetchVitalsData();
// //                 console.log("fetchVitalsData");
// //             }, 5000);
// //         }
        
// //         // Clean up interval on component unmount
// //         return () => {
// //             if (intervalId) clearInterval(intervalId);
// //         };
// //     }, [userRole]);
    
// //     const handleInputChange = (key, value) => {
// //         setEditableVitals(prev => ({
// //             ...prev,
// //             [key]: value
// //         }));
// //     };
    
// //     const handleSaveVitals = async () => {
// //         try {
// //             setIsSaving(true);
// //             // Replace with your actual API endpoint
// //             // const response = await fetch('your-api-endpoint/patient/vitals', {
// //             //     method: 'POST',
// //             //     headers: {
// //             //         'Content-Type': 'application/json'
// //             //     },
// //             //     body: JSON.stringify(editableVitals)
// //             // });
// //             // const data = await response.json();
            
// //             // Mock successful save
// //             setTimeout(() => {
// //                 const now = new Date();
// //                 const formattedDate = now.toLocaleDateString('en-US', {
// //                     year: 'numeric',
// //                     month: '2-digit',
// //                     day: '2-digit',
// //                     hour: '2-digit',
// //                     minute: '2-digit',
// //                     hour12: true
// //                 }).replace(',', '');
                
// //                 setPatientVitals({
// //                     timestamp: formattedDate,
// //                     measurements: {...editableVitals}
// //                 });
// //                 setIsEditing(false);
// //                 setIsSaving(false);
// //             }, 1000);
            
// //         } catch (error) {
// //             console.error('Error saving vital signs data:', error);
// //             setIsSaving(false);
// //         }
// //     };
    
// //     return (
// //         <BoxContainer className='doctorPatientVitalSignsAndPhysicalMeasurementsBox'>
// //             <BoxContainerTitle className='doctorPatientVitalSignsAndPhysicalMeasurements'>
// //                 Patient's Vital Signs
// //                 {userRole === 'doctor' && isLoading && 
// //                     <span className="loading-indicator">Loading new data...</span>
// //                 }
// //                 {userRole === 'nurse' && (
// //                     <div className="nurse-controls">
// //                         {!isEditing ? (
// //                             <button 
// //                                 className="edit-button" 
// //                                 onClick={() => setIsEditing(true)}
// //                                 disabled={isLoading}
// //                             >
// //                                 Edit Vitals
// //                             </button>
// //                         ) : (
// //                             <>
// //                                 <button 
// //                                     className="save-button" 
// //                                     onClick={handleSaveVitals}
// //                                     disabled={isSaving}
// //                                 >
// //                                     {isSaving ? 'Saving...' : 'Save Changes'}
// //                                 </button>
// //                                 <button 
// //                                     className="cancel-button" 
// //                                     onClick={() => {
// //                                         setIsEditing(false);
// //                                         setEditableVitals({...patientVitals.measurements});
// //                                     }}
// //                                     disabled={isSaving}
// //                                 >
// //                                     Cancel
// //                                 </button>
// //                             </>
// //                         )}
// //                     </div>
// //                 )}
// //             </BoxContainerTitle>

// //             <BoxContainerContent className='doctorPatientVitalSignsAndPhysicalMeasurementsContent'>
// //                 {patientVitals ? (
// //                     <>
// //                         <div className="vitalsTimestamp">
// //                             Last updated: {patientVitals.timestamp}
// //                         </div>
// //                         {isEditing && userRole === 'nurse' ? (
// //                             <div className="editable-vitals-form">
// //                                 {Object.keys(editableVitals).map(key => (
// //                                     <div className="vital-input-group" key={key}>
// //                                         <label>{key}</label>
// //                                         <input
// //                                             type="text"
// //                                             value={editableVitals[key]}
// //                                             onChange={(e) => handleInputChange(key, e.target.value)}
// //                                             disabled={isSaving}
// //                                         />
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         ) : (
// //                             <DoctorPatientVitalSignsAndPhysicalMeasurementsCard 
// //                                 patientVitalSignsAndPhysicalMeasurements={patientVitals.measurements} 
// //                             />
// //                         )}
// //                     </>
// //                 ) : (
// //                     <div className="no-data">
// //                         No vital signs or physical measurements available
// //                     </div>
// //                 )}
// //             </BoxContainerContent>
// //         </BoxContainer>
// //     );
// // }

// // export default DoctorPatientVitalSignsAndPhysicalMeasurements;


















// import React, { useState, useEffect } from 'react';
// import './style/doctorPatientVitalSignsAndPhysicalMeasurements.css';

// import BoxContainer from '../../common/boxContainer';
// import BoxContainerTitle from '../../common/boxContainerTitle';
// import BoxContainerContent from '../../common/boxContainerContent';

// import DoctorPatientVitalSignsAndPhysicalMeasurementsCard from './doctorPatientVitalSignsAndPhysicalMeasurements/doctorPatientVitalSignsAndPhysicalMeasurementsCard';

// function DoctorPatientVitalSignsAndPhysicalMeasurements({ userRole }) {
//     // patientVitals stores the *last successfully fetched or saved* data
//     const [patientVitals, setPatientVitals] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isEditing, setIsEditing] = useState(false); // Controls nurse's edit mode
//     const [editableVitals, setEditableVitals] = useState({}); // Holds values for nurse input
//     const [isSaving, setIsSaving] = useState(false);

//     // Define the structure of vitals expected
//     const vitalSignsStructure = {
//         "Blood Pressure (mmHg/mmHg)": "",
//         "Pulse (beats/minute)": "",
//         "Breathing Rate (breaths/minute)": "",
//         "Temperature (°C)": "",
//         "BMI": "",
//         "Oxygen Saturation (%)": ""
//     };

//     // Fetch data from API
//     const fetchVitalsData = async () => {
//         try {
//             setIsLoading(true);
//             // Replace with your actual API endpoint to get the *latest* vitals
//             // const response = await fetch('your-api-endpoint/patient/vitals/latest');
//             // const data = await response.json();

//             // Mock data for demonstration (represents latest saved data)
//             const mockLatestData = {
//                 timestamp: "2025-03-29 01:58 PM",
//                 measurements: {
//                     "Blood Pressure (mmHg/mmHg)": "120/80 mmHg",
//                     "Pulse (beats/minute)": "72 beats/minute",
//                     "Breathing Rate (breaths/minute)": "16 breaths/minute",
//                     "Temperature (°C)": "36.8 °C",
//                     "BMI": "22.9",
//                     "Oxygen Saturation (%)": "98%"
//                 }
//             };

//             // Simulate network delay
//             setTimeout(() => {
//                 // Both roles can potentially see the latest data initially
//                 setPatientVitals(mockLatestData);

//                 // Initialize editableVitals for the nurse based on structure,
//                 // potentially pre-filling with latest data if needed, or keep empty
//                 if (userRole === 'nurse') {
//                     // Option 1: Start with empty fields
//                     setEditableVitals({ ...vitalSignsStructure });
//                     // Option 2: Start with latest data in edit fields (if desired)
//                     // setEditableVitals({ ...(mockLatestData?.measurements || vitalSignsStructure) });
//                     setIsEditing(true); // Start nurse in edit mode by default
//                 }

//                 setIsLoading(false);
//             }, 500);

//         } catch (error) {
//             console.error('Error fetching vital signs data:', error);
//             setPatientVitals(null); // Ensure null on error
//             if (userRole === 'nurse') {
//                 setEditableVitals({ ...vitalSignsStructure }); // Reset to empty on error
//                 setIsEditing(true); // Keep nurse in edit mode
//             }
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchVitalsData();

//         // Set up interval to fetch data every 5 seconds - only for doctor view
//         let intervalId;
//         if (userRole === 'doctor') {
//             intervalId = setInterval(() => {
//                 fetchVitalsData();
//                 console.log("fetchVitalsData for doctor");
//             }, 5000);
//         }

//         // Clean up interval on component unmount
//         return () => {
//             if (intervalId) clearInterval(intervalId);
//         };
//     }, [userRole]); // Rerun effect if userRole changes

//     const handleInputChange = (key, value) => {
//         setEditableVitals(prev => ({
//             ...prev,
//             [key]: value
//         }));
//     };

//     const handleSaveVitals = async () => {
//         try {
//             setIsSaving(true);
//             console.log("Saving vitals:", editableVitals);
//             // Replace with your actual API endpoint to save vitals
//             // const response = await fetch('your-api-endpoint/patient/vitals', {
//             //     method: 'POST',
//             //     headers: { 'Content-Type': 'application/json' },
//             //     body: JSON.stringify(editableVitals)
//             // });
//             // if (!response.ok) throw new Error('Failed to save vitals');
//             // const savedData = await response.json(); // Assuming API returns the saved data with timestamp

//             // Mock successful save
//             await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

//             const now = new Date();
//             const formattedDate = now.toLocaleDateString('en-US', {
//                 year: 'numeric', month: '2-digit', day: '2-digit',
//                 hour: '2-digit', minute: '2-digit', hour12: true
//             }).replace(',', '');

//             const newlySavedVitals = {
//                 timestamp: formattedDate,
//                 measurements: { ...editableVitals }
//             };

//             setPatientVitals(newlySavedVitals); // Update the displayed vitals
//             setIsEditing(false); // Exit edit mode after save
//             setIsSaving(false);

//         } catch (error) {
//             console.error('Error saving vital signs data:', error);
//             // Optionally show an error message to the user
//             setIsSaving(false);
//         }
//     };

//     const handleCancelEdit = () => {
//         setIsEditing(false);
//         // Optionally reset editableVitals to last saved state if needed
//         // setEditableVitals({ ...(patientVitals?.measurements || vitalSignsStructure) });
//     };

//      const handleStartEditing = () => {
//         // Pre-fill edit fields with the latest data when starting to edit
//         setEditableVitals({ ...(patientVitals?.measurements || vitalSignsStructure) });
//         setIsEditing(true);
//     };


//     return (
//         <BoxContainer className='doctorPatientVitalSignsAndPhysicalMeasurementsBox'>
//             <BoxContainerTitle className='doctorPatientVitalSignsAndPhysicalMeasurements'>
//                 Patient's Vital Signs
//                 {userRole === 'doctor' && isLoading &&
//                     <span className="loading-indicator">Loading new data...</span>
//                 }
//                 {userRole === 'nurse' && (
//                     <div className="nurse-controls">
//                         {!isEditing ? (
//                             <button
//                                 className="edit-button"
//                                 onClick={handleStartEditing} // Use specific handler
//                                 disabled={isLoading || isSaving} // Disable if loading or already saving
//                             >
//                                 Enter/Edit Vitals
//                             </button>
//                         ) : (
//                             <>
//                                 <button
//                                     className="save-button"
//                                     onClick={handleSaveVitals}
//                                     disabled={isSaving || isLoading}
//                                 >
//                                     {isSaving ? 'Saving...' : 'Save Changes'}
//                                 </button>
//                                 <button
//                                     className="cancel-button"
//                                     onClick={handleCancelEdit} // Use specific handler
//                                     disabled={isSaving || isLoading}
//                                 >
//                                     Cancel
//                                 </button>
//                             </>
//                         )}
//                     </div>
//                 )}
//             </BoxContainerTitle>

//             <BoxContainerContent className='doctorPatientVitalSignsAndPhysicalMeasurementsContent'>
//                 {isLoading && !patientVitals && userRole === 'doctor' && <div className="loading-indicator">Loading...</div>}
//                 {isLoading && userRole === 'nurse' && <div className="loading-indicator">Loading...</div>}

//                 {!isLoading && userRole === 'doctor' && (
//                     patientVitals ? (
//                         <>
//                             <div className="vitalsTimestamp">
//                                 Last updated: {patientVitals.timestamp}
//                             </div>
//                             <DoctorPatientVitalSignsAndPhysicalMeasurementsCard
//                                 patientVitalSignsAndPhysicalMeasurements={patientVitals.measurements}
//                             />
//                         </>
//                     ) : (
//                         <div className="no-data">No vital signs available</div>
//                     )
//                 )}

//                 {!isLoading && userRole === 'nurse' && (
//                     isEditing ? (
//                         // Nurse Edit Form
//                         <div className="editable-vitals-form">
//                             {Object.keys(editableVitals).map(key => (
//                                 <div className="vital-input-group" key={key}>
//                                     <label>{key}</label>
//                                     <input
//                                         type="text"
//                                         value={editableVitals[key]}
//                                         onChange={(e) => handleInputChange(key, e.target.value)}
//                                         disabled={isSaving}
//                                         placeholder={`Enter ${key}`} // Add placeholder
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         // Nurse View Mode (Show last saved data if available)
//                         patientVitals ? (
//                              <>
//                                 <div className="vitalsTimestamp">
//                                     Last updated: {patientVitals.timestamp}
//                                 </div>
//                                 <DoctorPatientVitalSignsAndPhysicalMeasurementsCard
//                                     patientVitalSignsAndPhysicalMeasurements={patientVitals.measurements}
//                                 />
//                             </>
//                         ) : (
//                              <div className="no-data">No vital signs recorded yet. Click 'Enter/Edit Vitals'.</div>
//                         )
//                     )
//                 )}
//             </BoxContainerContent>
//         </BoxContainer>
//     );
// }

// export default DoctorPatientVitalSignsAndPhysicalMeasurements;


















































import React, { useState, useEffect } from 'react';
import './style/doctorPatientVitalSignsAndPhysicalMeasurements.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';
import DropDownBox from '../../common/dropDownBox'; // Import DropDownBox

import DoctorPatientVitalSignsAndPhysicalMeasurementsCard from './doctorPatientVitalSignsAndPhysicalMeasurements/doctorPatientVitalSignsAndPhysicalMeasurementsCard';

function DoctorPatientVitalSignsAndPhysicalMeasurements({ userRole }) {
    // patientVitalsHistory stores an array of past measurements
    const [patientVitalsHistory, setPatientVitalsHistory] = useState([]);
    // selectedVitalsIndex tracks which measurement set is selected (for doctor)
    const [selectedVitalsIndex, setSelectedVitalsIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Controls nurse's edit mode
    const [editableVitals, setEditableVitals] = useState({}); // Holds values for nurse input
    const [isSaving, setIsSaving] = useState(false);

    // Define the structure of vitals expected
    const vitalSignsStructure = {
        "Blood Pressure (mmHg/mmHg)": "",
        "Pulse (beats/minute)": "",
        "Breathing Rate (breaths/minute)": "",
        "Temperature (°C)": "",
        "BMI": "",
        "Oxygen Saturation (%)": ""
    };

    // Fetch data from API
    const fetchVitalsData = async () => {
        try {
            setIsLoading(true);
            // Replace with your actual API endpoint to get *all relevant* vitals history
            // const response = await fetch('your-api-endpoint/patient/vitals/history');
            // const data = await response.json(); // Assuming data is an array sorted newest first

            // Mock data for demonstration (array of measurements)
            const mockHistoryData = [
                { // Newest
                    timestamp: "2025-04-18 10:30 AM",
                    measurements: {
                        "Blood Pressure (mmHg/mmHg)": "125/82 mmHg",
                        "Pulse (beats/minute)": "75 beats/minute",
                        "Breathing Rate (breaths/minute)": "17 breaths/minute",
                        "Temperature (°C)": "37.0 °C",
                        "BMI": "23.1", // Assuming BMI might be recalculated or re-entered
                        "Oxygen Saturation (%)": "97%"
                    }
                },
                { // Older
                    timestamp: "2025-04-18 08:15 AM",
                    measurements: {
                        "Blood Pressure (mmHg/mmHg)": "120/80 mmHg",
                        "Pulse (beats/minute)": "72 beats/minute",
                        "Breathing Rate (breaths/minute)": "16 breaths/minute",
                        "Temperature (°C)": "36.8 °C",
                        "BMI": "22.9",
                        "Oxygen Saturation (%)": "98%"
                    }
                },
                 { // Even Older
                    timestamp: "2025-04-17 04:00 PM",
                    measurements: {
                        "Blood Pressure (mmHg/mmHg)": "118/78 mmHg",
                        "Pulse (beats/minute)": "70 beats/minute",
                        "Breathing Rate (breaths/minute)": "16 breaths/minute",
                        "Temperature (°C)": "36.7 °C",
                        "BMI": "22.9",
                        "Oxygen Saturation (%)": "99%"
                    }
                }
            ];

            // Simulate network delay
            setTimeout(() => {
                setPatientVitalsHistory(mockHistoryData);
                // Reset selection to the newest entry (index 0)
                setSelectedVitalsIndex(0);

                // Initialize editableVitals for the nurse (always starts fresh)
                if (userRole === 'nurse') {
                    setEditableVitals({ ...vitalSignsStructure });
                    // Decide if nurse starts in edit mode or needs to click button
                    setIsEditing(true); // Option: Start nurse in edit mode
                }

                setIsLoading(false);
            }, 500);

        } catch (error) {
            console.error('Error fetching vital signs history:', error);
            setPatientVitalsHistory([]); // Ensure empty array on error
            if (userRole === 'nurse') {
                setEditableVitals({ ...vitalSignsStructure }); // Reset to empty on error
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVitalsData();

        // Set up interval to fetch data every 5 seconds - only for doctor view
        let intervalId;
        if (userRole === 'doctor') {
            intervalId = setInterval(() => {
                fetchVitalsData(); // Refetch history
                console.log("fetchVitalsData for doctor");
            }, 5000); // Adjust interval as needed
        }

        // Clean up interval on component unmount
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [userRole]); // Rerun effect if userRole changes

    const handleInputChange = (key, value) => {
        setEditableVitals(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Handle saving NEW vitals (Nurse)
    const handleSaveVitals = async () => {
        try {
            setIsSaving(true);
            console.log("Saving new vitals:", editableVitals);
            // Replace with your actual API endpoint to save NEW vitals
            // const response = await fetch('your-api-endpoint/patient/vitals', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(editableVitals) // Send only the new measurements
            // });
            // if (!response.ok) throw new Error('Failed to save vitals');
            // const savedData = await response.json(); // API should return the newly saved record with timestamp

            // Mock successful save
            await new Promise(resolve => setTimeout(resolve, 1000));

            const now = new Date();
            const formattedDate = now.toLocaleDateString('en-US', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', hour12: true
            }).replace(',', '');

            const newlySavedVitals = {
                timestamp: formattedDate, // Use server timestamp if possible
                measurements: { ...editableVitals }
            };

            // Add the new record to the history (client-side) and refetch or update state
            setPatientVitalsHistory(prev => [newlySavedVitals, ...prev]);
            setSelectedVitalsIndex(0); // Select the newly added record for doctor view consistency
            setIsEditing(false); // Exit edit mode
            setEditableVitals({ ...vitalSignsStructure }); // Clear the form
            setIsSaving(false);
            // Optionally: Trigger a refetch if needed: fetchVitalsData();

        } catch (error) {
            console.error('Error saving vital signs data:', error);
            setIsSaving(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset editableVitals to empty structure
        setEditableVitals({ ...vitalSignsStructure });
    };

     const handleStartEditing = () => {
        // Start with a blank slate for new measurements
        setEditableVitals({ ...vitalSignsStructure });
        setIsEditing(true);
    };

    // Handle dropdown change (Doctor)
    const handleVitalsChange = (e) => {
        setSelectedVitalsIndex(parseInt(e.target.value, 10));
    };

    // Generate options for dropdown (Doctor)
    const vitalsOptions = patientVitalsHistory.map((vitals, index) => ({
        label: `Measurement at ${vitals.timestamp}`,
        value: index.toString()
    }));

    // Get the currently selected vitals data for display (Doctor)
    const currentSelectedVitals = patientVitalsHistory[selectedVitalsIndex];

    return (
        <BoxContainer className='doctorPatientVitalSignsAndPhysicalMeasurementsBox'>
            <BoxContainerTitle className='doctorPatientVitalSignsAndPhysicalMeasurements'>
                Patient's Vital Signs
                {userRole === 'doctor' && isLoading &&
                    <span className="loading-indicator"> Loading...</span>
                }
                {userRole === 'nurse' && (
                    <div className="nurse-controls">
                        {!isEditing ? (
                            <button
                                className="edit-button"
                                onClick={handleStartEditing}
                                disabled={isLoading || isSaving}
                            >
                                Remeasuring Vital Signs
                            </button>
                        ) : (
                            <>
                                <button
                                    className="save-button"
                                    onClick={handleSaveVitals}
                                    disabled={isSaving || isLoading}
                                >
                                    {isSaving ? 'Saving...' : 'Save Measurements'}
                                </button>
                                {/* <button
                                    className="cancel-button"
                                    onClick={handleCancelEdit}
                                    disabled={isSaving || isLoading}
                                >
                                    Cancel
                                </button> */}
                            </>
                        )}
                    </div>
                )}
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPatientVitalSignsAndPhysicalMeasurementsContent'>
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
                            {currentSelectedVitals && (
                                <>
                                    <div className="vitalsTimestamp">
                                        Recorded at: {currentSelectedVitals.timestamp}
                                    </div>
                                    <DoctorPatientVitalSignsAndPhysicalMeasurementsCard
                                        patientVitalSignsAndPhysicalMeasurements={currentSelectedVitals.measurements}
                                    />
                                </>
                            )}
                        </>
                    ) : (
                        <div className="no-data">No vital signs history available</div>
                    )
                )}

                {/* Nurse View */}
                {!isLoading && userRole === 'nurse' && (
                    isEditing ? (
                        // Nurse Edit Form for NEW vitals
                        <div className="editable-vitals-form">
                            {Object.keys(editableVitals).map(key => (
                                <div className="vital-input-group" key={key}>
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
                        patientVitalsHistory.length > 0 ? (
                             <>
                                <div className="vitalsTimestamp">
                                    Last recorded: {patientVitalsHistory[0].timestamp} {/* Show newest */}
                                </div>
                                <DoctorPatientVitalSignsAndPhysicalMeasurementsCard
                                    patientVitalSignsAndPhysicalMeasurements={patientVitalsHistory[0].measurements}
                                />
                             </>
                        ) : (
                             <div className="no-data">No vital signs recorded yet. Click 'Enter New Vitals'.</div>
                        )
                    )
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPatientVitalSignsAndPhysicalMeasurements;