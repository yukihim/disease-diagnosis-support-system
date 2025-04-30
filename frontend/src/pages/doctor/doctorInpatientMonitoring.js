import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import PageLayout from '../../components/common/pageLayout';

// Import doctor monitoring inpatient components
import PatientInformationCard from '../../components/common/patientInformationCard';
import DoctorMedicalDevicesMeasurements from '../../components/doctor/inpatientMonitoring/doctorMedicalDevicesMeasurements';
import PatientPassSessions from '../../components/common/patientPassSessions/patientPassSessions';
import DoctorEventsCapturing from '../../components/doctor/inpatientMonitoring/doctorEventsCapturing';
import DoctorGoBackAndBeginDiagnosisSession from '../../components/doctor/inpatientMonitoring/doctorGoBackAndBeginDiagnosisSession';

// Define API_BASE_URL directly
const API_BASE_URL = "http://localhost:5001/doctor";
const POLLING_INTERVAL = 5000; // Fetch data every 5000ms (5 seconds)

function DoctorInpatientMonitoring() {
    const history = useHistory();
    const location = useLocation();

    const patientData = location.state || {};
    const userRole = location.state?.userRole || "doctor";
    const patientIDForMeasurements = patientData.patientID;
    const sessionID = patientData.sessionID;

    // State for device measurements
    const [deviceMeasurements, setDeviceMeasurements] = useState({
        bloodSugarData: [],
        heartRateData: [],
        bloodPressureData: [],
        bodyTemperatureData: [],
        respiratoryRateData: []
    });
    const [isLoadingMeasurements, setIsLoadingMeasurements] = useState(false);
    const [measurementError, setMeasurementError] = useState(null);

    // Fetch device measurements periodically

    useEffect(() => {
        let isMounted = true;
        let intervalId = null;

        const fetchMeasurements = async (isInitialLoad = false) => {
            if (!patientIDForMeasurements) {
                if (isMounted) {
                    setMeasurementError("Patient ID not provided for measurements.");
                    setIsLoadingMeasurements(false);
                }
                return;
            }
            const token = Cookies.get('token');
            if (!token) {
                if (isMounted) {
                    setMeasurementError("Authentication token not found.");
                    setIsLoadingMeasurements(false);
                }
                return;
            }

            // Don't set loading to true on subsequent polls
            if (isInitialLoad) {
                setIsLoadingMeasurements(true);
            }

            try {
                const response = await fetch(`http://localhost:5001/doctor/inpatient_monitoring/medical_device_measurement/${patientIDForMeasurements}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                    throw new Error(errorData.message || `Failed to fetch measurements for inpatient '${patientIDForMeasurements}': ${response.statusText}`);
                }

                const data = await response.json();
                const results = data.testResults || [];
                // console.log(`[${new Date().toLocaleTimeString()}] Raw fetched results:`, JSON.stringify(results)); // Log raw fetched data

                // console.log("testResults:", results); // Log testResults

                // --- Process New Data ---
                const newProcessedData = {
                    bloodSugarData: [],
                    heartRateData: [],
                    bloodPressureData: [],
                    bodyTemperatureData: [],
                    respiratoryRateData: []
                };

                results.forEach(m => {
                    const measurementTime = new Date(m.timeMeasured);
                    const time = !isNaN(measurementTime) ? measurementTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : 'Invalid Time';
                    const value = m.value;
                    const name = m.name?.toLowerCase() || '';

                    if (time === 'Invalid Time') {
                        console.warn("Skipping measurement due to invalid time:", m);
                        return;
                    }

                    if (name.includes('glucose') || name.includes('blood sugar')) {
                        newProcessedData.bloodSugarData.push({ time, sugarLevel: parseFloat(value) });
                    } else if (name.includes('heart rate')) {
                        newProcessedData.heartRateData.push({ time, rate: parseInt(value) });
                    } else if (name.includes('blood pressure')) {
                        const parts = value?.match(/(\d+)\/(\d+)/);
                        if (parts) {
                            newProcessedData.bloodPressureData.push({ time, systolic: parseInt(parts[1]), diastolic: parseInt(parts[2]) });
                        }
                    } else if (name.includes('temperature')) {
                        newProcessedData.bodyTemperatureData.push({ time, temp: parseFloat(value) });
                    } else if (name.includes('respiratory') || name.includes('breathing')) {
                        newProcessedData.respiratoryRateData.push({ time, respRate: parseInt(value) });
                    }
                });

                // *** Accumulate Data ***
                if (isMounted) {
                    setDeviceMeasurements(prevMeasurements => {
                        const updatedMeasurements = { ...prevMeasurements };

                        // Append new data and sort each category
                        Object.keys(newProcessedData).forEach(key => {
                            // Combine previous and new data
                            updatedMeasurements[key] = [...prevMeasurements[key], ...newProcessedData[key]];

                            // Sort the combined array by time
                            updatedMeasurements[key].sort((a, b) => {
                                const timeA = a.time.split(':').map(Number);
                                const timeB = b.time.split(':').map(Number);
                                return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
                            });

                            // Optional: Limit history size to prevent excessive memory usage
                            const MAX_HISTORY = 500; // Example limit
                            if (updatedMeasurements[key].length > MAX_HISTORY) {
                                updatedMeasurements[key] = updatedMeasurements[key].slice(-MAX_HISTORY);
                            }
                        });

                        // console.log(`[${new Date().toLocaleTimeString()}] Accumulated deviceMeasurements state:`, JSON.stringify(updatedMeasurements)); // Log accumulated state
                        return updatedMeasurements;
                    });
                    setMeasurementError(null); // Clear error on successful fetch/update
                }

            } catch (error) {
                console.error("Failed to fetch or process measurements:", error);
                if (isMounted) {
                    setMeasurementError(`Failed to load measurements: ${error.message}`);
                }
            } finally {
                // Only set loading to false after the initial load attempt
                if (isInitialLoad && isMounted) {
                    setIsLoadingMeasurements(false);
                }
            }
        };

        // Fetch immediately on mount
        fetchMeasurements(true);
        // Set up interval for subsequent fetches
        intervalId = setInterval(() => {
            fetchMeasurements(false); // Pass false for subsequent polls
        }, POLLING_INTERVAL);

        // Cleanup function
        return () => {
            isMounted = false; // Prevent state updates after unmount
            if (intervalId) {
                clearInterval(intervalId); // Clear interval on unmount
            }
        };
    }, [patientIDForMeasurements]); // Re-run effect if patientID changes

    function onClickSession(session) {
        // ... (onClickSession logic remains the same) ...
        history.push({
            pathname: '/view_pass_session',
            state: {
                sessionID: session.sessionID,
            }
        });
    }
    

    return (
        <PageLayout requiredRole={["doctor", "nurse"]} useGrid={false}>
            {/* Patient Information Card */}
            <PatientInformationCard role={userRole} patientName={patientData.name} sex={patientData.sex} age={patientData.age} />

            {/* Medical device measurements Card */}
            {/* Show loading only on initial load */}
            {isLoadingMeasurements && <div>Loading measurements...</div>}
            {measurementError && !isLoadingMeasurements && <div style={{ color: 'red', margin: '10px 0' }}>Error: {measurementError}</div>}
            {!isLoadingMeasurements && (
                <DoctorMedicalDevicesMeasurements
                    bloodSugarData={deviceMeasurements.bloodSugarData}
                    heartRateData={deviceMeasurements.heartRateData}
                    bloodPressureData={deviceMeasurements.bloodPressureData}
                    bodyTemperatureData={deviceMeasurements.bodyTemperatureData}
                    respiratoryRateData={deviceMeasurements.respiratoryRateData}
                />
            )}

            {/* Patient's Pass Sessions Card */}
            <PatientPassSessions role={userRole} onClickSession={onClickSession} sessionID={sessionID} />

            {/* Events Capturing Card - Pass inpatientID */}
            {/* Ensure patientIDForMeasurements is available before rendering */}
            {patientIDForMeasurements ? (
                 <DoctorEventsCapturing inpatientID={patientIDForMeasurements} />
            ) : (
                 <div>Loading patient context for events...</div> // Or handle missing ID appropriately
            )}

            {/* Go Back & Begin Diagnosis Button */}
            <DoctorGoBackAndBeginDiagnosisSession userRole={userRole} patientName={patientData.name} sessionID={sessionID} />
        </PageLayout>
    );
}

export default DoctorInpatientMonitoring;