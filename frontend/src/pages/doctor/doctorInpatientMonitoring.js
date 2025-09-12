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
import API_BASE_URL from '../../config';

const POLLING_INTERVAL = 5000; // Fetch data every 5000ms (5 seconds)

function DoctorInpatientMonitoring() {
    const history = useHistory();
    const location = useLocation();

    const patientData = location.state || {};
    const userRole = location.state?.userRole || "doctor";
    const patientIDForMeasurements = 1;
    const sessionID = patientData.sessionID;

    const [loadedDeviceList, setLoadedDeviceList] = useState(false);

    // State for device measurements
    const [deviceMeasurements, setDeviceMeasurements] = useState({
        blood_sugar: [],
        heart_rate: [],
        blood_pressure: [],
        temperature: [],
        respiratory_rate: []
    });


    const [deviceList, setDeviceList] = useState({
        blood_sugar: [{id:0, name:'No Device'}],
        heart_rate: [{id:0, name:'No Device'}],
        blood_pressure: [{id:0, name:'No Device'}],
        temperature: [{id:0, name:'No Device'}],
        respiratory_rate: [{id:0, name:'No Device'}]
    });

    const [deviceStatus, setDeviceStatus] = useState({
        blood_sugar: false,
        heart_rate: false,
        blood_pressure: false,
        temperature: false,
        respiratory_rate: false
    });

    const [selectedDevice, setSelectedDevice] = useState({
        blood_sugar: {id:0, name:'No Device'},
        heart_rate: {id:0, name:'No Device'},
        blood_pressure: {id:0, name:'No Device'},
        temperature: {id:0, name:'No Device'},
        respiratory_rate: {id:0, name:'No Device'}
    });

    const [isLoadingMeasurements, setIsLoadingMeasurements] = useState(false);
    const [measurementError, setMeasurementError] = useState(null);

    // Fetch device measurements periodically

    async function fetchDeviceList() {
        const token = Cookies.get('token');
        if (!token) {
            setMeasurementError("Authentication token not found.");
            setIsLoadingMeasurements(false);
        }

        const response = await fetch(`${API_BASE_URL}/doctor/inpatient_monitoring/device_list`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        
        
        

        setDeviceList(data)
        
        

        console.log("Device List:", data)

        
        
    }

    async function fetchDeviceStatus() {
        const token = Cookies.get('token');
        if (!token) {
            setMeasurementError("Authentication token not found.");
            setIsLoadingMeasurements(false);
        }

        const response = await fetch(`${API_BASE_URL}/doctor/inpatient_monitoring/get_device_status`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                blood_sugar: selectedDevice.blood_sugar.id,
                heart_rate: selectedDevice.heart_rate.id,
                blood_pressure: selectedDevice.blood_pressure.id,
                temperature: selectedDevice.temperature.id,
                respiratory_rate: selectedDevice.respiratory_rate.id
            })
        })
        const data = await response.json();
        console.log("Device Status:", data)

        setDeviceStatus(data)
        console.log("Device Status:", deviceStatus)
    }

    async function fetchSelectedDeviceList() {
        const token = Cookies.get('token');
        if (!token) {
            setMeasurementError("Authentication token not found.");
            setIsLoadingMeasurements(false);
        }

        console.log("Fetching selected device list")

        const response = await fetch(`${API_BASE_URL}/doctor/inpatient_monitoring/${sessionID}/get_selected_device_list`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log("Fetching selected device list:", data)


        setSelectedDevice(data)
        setLoadedDeviceList(true)
    }

    useEffect(() => {
        fetchDeviceList();
        fetchSelectedDeviceList();
        fetchDeviceStatus();
    }, []);

    useEffect(() => {
        if(loadedDeviceList){
            
            const setSelectedDeviceList = async () => {
                const token = Cookies.get('token');
                if (!token) {
                    setMeasurementError("Authentication token not found.");
                    setIsLoadingMeasurements(false);
                }
                console.log("Setting selected device list")
                console.log("Selected device:", selectedDevice)

                const response = await fetch(`${API_BASE_URL}/doctor/inpatient_monitoring/${sessionID}/set_selected_device_list`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({selectedDevice})
                })
                
                
            }
            setSelectedDeviceList()
            console.log("Selected Device after setting:", selectedDevice)
        }
        
    },[selectedDevice]);
    
    


    
    useEffect(() => {
        fetchDeviceStatus();
        
        let isMounted = true;
        let intervalId = null;

        // Only start polling if devices are loaded
        if (!loadedDeviceList) {
            return;
        }
        

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

            
            


            
            try {
                console.log("get measurements")
                console.log("selectedDevice:", selectedDevice)
                
                const response = await fetch(`${API_BASE_URL}/doctor/inpatient_monitoring/medical_device_measurement`, {
                    method: 'POST',
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        blood_sugar: selectedDevice.blood_sugar.id,
                        heart_rate: selectedDevice.heart_rate.id,
                        blood_pressure: selectedDevice.blood_pressure.id,
                        temperature: selectedDevice.temperature.id,
                        respiratory_rate: selectedDevice.respiratory_rate.id
                    })
                })   
                
                const dataMeasured = await response.json();
                console.log("Data measured:", dataMeasured)
                    
                

                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                    throw new Error(errorData.message || `Failed to fetch measurements for inpatient '${patientIDForMeasurements}': ${response.statusText}`);
                }

                
                

                // // // --- Process New Data ---
                // const newProcessedData = {
                //     bloodSugarData: [],
                //     heartRateData: [],
                //     bloodPressureData: [],
                //     bodyTemperatureData: [],
                //     respiratoryRateData: []
                // };



                setDeviceMeasurements(dataMeasured)

                // *** Accumulate Data ***
                // if (isMounted) {
                //     setDeviceMeasurements(prevMeasurements => {
                //         const updatedMeasurements = { ...prevMeasurements };

                //         // Append new data and sort each category
                //         Object.keys(newProcessedData).forEach(key => {
                //             // Combine previous and new data
                //             updatedMeasurements[key] = [...prevMeasurements[key], ...newProcessedData[key]];

                //             // Sort the combined array by time
                //             updatedMeasurements[key].sort((a, b) => {
                //                 const timeA = a.time.split(':').map(Number);
                //                 const timeB = b.time.split(':').map(Number);
                //                 return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
                //             });

                //             // Optional: Limit history size to prevent excessive memory usage
                //             const MAX_HISTORY = 500; // Example limit
                //             if (updatedMeasurements[key].length > MAX_HISTORY) {
                //                 updatedMeasurements[key] = updatedMeasurements[key].slice(-MAX_HISTORY);
                //             }
                //         });

                //         // console.log(`[${new Date().toLocaleTimeString()}] Accumulated deviceMeasurements state:`, JSON.stringify(updatedMeasurements)); // Log accumulated state
                //         return updatedMeasurements;
                //     });
                //     setMeasurementError(null); // Clear error on successful fetch/update
                // }

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
            fetchDeviceStatus();
        }, POLLING_INTERVAL);

        // Cleanup function
        return () => {
            isMounted = false; // Prevent state updates after unmount
            if (intervalId) {
                clearInterval(intervalId); // Clear interval on unmount
            }
        };
    }, [patientIDForMeasurements, selectedDevice]); // Add dependencies

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
            <PatientInformationCard  type="inpatient"/>

            {/* Medical device measurements Card */}
            {/* Show loading only on initial load */}
            {isLoadingMeasurements && <div>Loading measurements...</div>}
            {measurementError && !isLoadingMeasurements && <div style={{ color: 'red', margin: '10px 0' }}>Error: {measurementError}</div>}
            {!isLoadingMeasurements && (
                <DoctorMedicalDevicesMeasurements
                    deviceMeasurements={deviceMeasurements}
                    deviceStatus={deviceStatus}
                    selectedDevice={selectedDevice}
                    setSelectedDevice={setSelectedDevice}
                    deviceList={deviceList}
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