// import React, { useState, useEffect } from 'react';
// import './style/doctorPatientVitalSignsAndPhysicalMeasurements.css';

// import BoxContainer from '../../common/boxContainer';
// import BoxContainerTitle from '../../common/boxContainerTitle';
// import BoxContainerContent from '../../common/boxContainerContent';

// import DoctorPatientVitalSignsAndPhysicalMeasurementsCard from './doctorPatientVitalSignsAndPhysicalMeasurements/doctorPatientVitalSignsAndPhysicalMeasurementsCard';

// function DoctorPatientVitalSignsAndPhysicalMeasurements({ userRole }) {
//     const [patientVitals, setPatientVitals] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
    
//     // Fetch data from API
//     const fetchVitalsData = async () => {
//         try {
//             setIsLoading(true);
//             // Replace with your actual API endpoint
//             // const response = await fetch('your-api-endpoint/patient/vitals');
//             // const data = await response.json();
//             // setPatientVitals(data);
            
//             // Mock data for demonstration
//             const mockData = {
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
//                 setPatientVitals(mockData);
//                 setIsLoading(false);
//             }, 500);
            
//         } catch (error) {
//             console.error('Error fetching vital signs data:', error);
//             setIsLoading(false);
//         }
//     };
    
//     useEffect(() => {
//         fetchVitalsData();
        
//         // Set up interval to fetch data every 5 seconds
//         const intervalId = setInterval(() => {
//             fetchVitalsData();
//         }, 5000);
        
//         // Clean up interval on component unmount
//         return () => clearInterval(intervalId);
//     }, []);
    
//     return (
//         <BoxContainer className='doctorPatientVitalSignsAndPhysicalMeasurementsBox'>
//             <BoxContainerTitle className='doctorPatientVitalSignsAndPhysicalMeasurements'>
//                 Patient's Vital Signs
//                 {isLoading && <span className="loading-indicator">Loading new data...</span>}
//             </BoxContainerTitle>

//             <BoxContainerContent className='doctorPatientVitalSignsAndPhysicalMeasurementsContent'>
//                 {patientVitals ? (
//                     <>
//                         <div className="vitalsTimestamp">
//                             Last updated: {patientVitals.timestamp}
//                         </div>
//                         <DoctorPatientVitalSignsAndPhysicalMeasurementsCard 
//                             patientVitalSignsAndPhysicalMeasurements={patientVitals.measurements} 
//                         />
//                     </>
//                 ) : (
//                     <div className="no-data">
//                         No vital signs or physical measurements available
//                     </div>
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

import DoctorPatientVitalSignsAndPhysicalMeasurementsCard from './doctorPatientVitalSignsAndPhysicalMeasurements/doctorPatientVitalSignsAndPhysicalMeasurementsCard';

function DoctorPatientVitalSignsAndPhysicalMeasurements({ userRole }) {
    const [patientVitals, setPatientVitals] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editableVitals, setEditableVitals] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    
    // Fetch data from API
    const fetchVitalsData = async () => {
        try {
            setIsLoading(true);
            // Replace with your actual API endpoint
            // const response = await fetch('your-api-endpoint/patient/vitals');
            // const data = await response.json();
            // setPatientVitals(data);
            
            // Mock data for demonstration
            const mockData = {
                timestamp: "2025-03-29 01:58 PM",
                measurements: {
                    "Blood Pressure (mmHg/mmHg)": "120/80 mmHg",
                    "Pulse (beats/minute)": "72 beats/minute",
                    "Breathing Rate (breaths/minute)": "16 breaths/minute",
                    "Temperature (°C)": "36.8 °C",
                    "BMI": "22.9",
                    "Oxygen Saturation (%)": "98%"
                }
            };
            
            // Simulate network delay
            setTimeout(() => {
                setPatientVitals(mockData);
                setEditableVitals({...mockData.measurements});
                setIsLoading(false);
            }, 500);
            
        } catch (error) {
            console.error('Error fetching vital signs data:', error);
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchVitalsData();
        
        // Set up interval to fetch data every 5 seconds - only for doctor view
        let intervalId;
        if (userRole === 'doctor') {
            intervalId = setInterval(() => {
                fetchVitalsData();
                console.log("fetchVitalsData");
            }, 5000);
        }
        
        // Clean up interval on component unmount
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [userRole]);
    
    const handleInputChange = (key, value) => {
        setEditableVitals(prev => ({
            ...prev,
            [key]: value
        }));
    };
    
    const handleSaveVitals = async () => {
        try {
            setIsSaving(true);
            // Replace with your actual API endpoint
            // const response = await fetch('your-api-endpoint/patient/vitals', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(editableVitals)
            // });
            // const data = await response.json();
            
            // Mock successful save
            setTimeout(() => {
                const now = new Date();
                const formattedDate = now.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                }).replace(',', '');
                
                setPatientVitals({
                    timestamp: formattedDate,
                    measurements: {...editableVitals}
                });
                setIsEditing(false);
                setIsSaving(false);
            }, 1000);
            
        } catch (error) {
            console.error('Error saving vital signs data:', error);
            setIsSaving(false);
        }
    };
    
    return (
        <BoxContainer className='doctorPatientVitalSignsAndPhysicalMeasurementsBox'>
            <BoxContainerTitle className='doctorPatientVitalSignsAndPhysicalMeasurements'>
                Patient's Vital Signs
                {userRole === 'doctor' && isLoading && 
                    <span className="loading-indicator">Loading new data...</span>
                }
                {userRole === 'nurse' && (
                    <div className="nurse-controls">
                        {!isEditing ? (
                            <button 
                                className="edit-button" 
                                onClick={() => setIsEditing(true)}
                                disabled={isLoading}
                            >
                                Edit Vitals
                            </button>
                        ) : (
                            <>
                                <button 
                                    className="save-button" 
                                    onClick={handleSaveVitals}
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button 
                                    className="cancel-button" 
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditableVitals({...patientVitals.measurements});
                                    }}
                                    disabled={isSaving}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                )}
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPatientVitalSignsAndPhysicalMeasurementsContent'>
                {patientVitals ? (
                    <>
                        <div className="vitalsTimestamp">
                            Last updated: {patientVitals.timestamp}
                        </div>
                        {isEditing && userRole === 'nurse' ? (
                            <div className="editable-vitals-form">
                                {Object.keys(editableVitals).map(key => (
                                    <div className="vital-input-group" key={key}>
                                        <label>{key}</label>
                                        <input
                                            type="text"
                                            value={editableVitals[key]}
                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                            disabled={isSaving}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <DoctorPatientVitalSignsAndPhysicalMeasurementsCard 
                                patientVitalSignsAndPhysicalMeasurements={patientVitals.measurements} 
                            />
                        )}
                    </>
                ) : (
                    <div className="no-data">
                        No vital signs or physical measurements available
                    </div>
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPatientVitalSignsAndPhysicalMeasurements;