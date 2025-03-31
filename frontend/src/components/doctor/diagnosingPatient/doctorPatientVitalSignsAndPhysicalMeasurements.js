import React, { useState, useEffect } from 'react';
import './style/doctorPatientVitalSignsAndPhysicalMeasurements.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorPatientVitalSignsAndPhysicalMeasurementsCard from './doctorPatientVitalSignsAndPhysicalMeasurements/doctorPatientVitalSignsAndPhysicalMeasurementsCard';

function DoctorPatientVitalSignsAndPhysicalMeasurements() {
    const [patientVitals, setPatientVitals] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
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
                setIsLoading(false);
            }, 500);
            
        } catch (error) {
            console.error('Error fetching vital signs data:', error);
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchVitalsData();
        
        // Set up interval to fetch data every 5 seconds
        const intervalId = setInterval(() => {
            fetchVitalsData();
        }, 5000);
        
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    
    return (
        <BoxContainer className='doctorPatientVitalSignsAndPhysicalMeasurementsBox'>
            <BoxContainerTitle className='doctorPatientVitalSignsAndPhysicalMeasurements'>
                Patient's Vital Signs
                {isLoading && <span className="loading-indicator">Loading new data...</span>}
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPatientVitalSignsAndPhysicalMeasurementsContent'>
                {patientVitals ? (
                    <>
                        <div className="vitalsTimestamp">
                            Last updated: {patientVitals.timestamp}
                        </div>
                        <DoctorPatientVitalSignsAndPhysicalMeasurementsCard 
                            patientVitalSignsAndPhysicalMeasurements={patientVitals.measurements} 
                        />
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