import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies
import './style/paraclinicalPatientTestTestingCard.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';
import DropDownBox from '../../common/dropDownBox';

// Define API base URL (replace with environment variable in real app)
const API_BASE_URL = 'http://localhost:5001';

function ParaclinicalPatientTestTestingCard({ patientState }) {
    const location = useLocation();
    // Assume sessionID and patientState are passed via location state
    const sessionID = location.state?.sessionID;
    const isResultReady = patientState === 7;

    const [patientTestStructures, setPatientTestStructures] = useState([]); // Renamed from patientTestResults
    const [selectedTestIndex, setSelectedTestIndex] = useState(0);
    const [localTestResults, setLocalTestResults] = useState([]);
    const [isMeasuring, setIsMeasuring] = useState(false);
    const [isLoadingStructure, setIsLoadingStructure] = useState(false);
    const [errorStructure, setErrorStructure] = useState(null);
    const [isLoadingMeasurement, setIsLoadingMeasurement] = useState(false);
    const [errorMeasurement, setErrorMeasurement] = useState(null);


    // Fetch test structure data from API
    const fetchTestStructure = async () => {
        if (!sessionID) {
            setErrorStructure("Session ID not found.");
            return;
        }
        setIsLoadingStructure(true);
        setErrorStructure(null);
        const token = Cookies.get('token');
        if (!token) {
            setErrorStructure("Authentication token not found.");
            setIsLoadingStructure(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/paraclinical/patient_test/${sessionID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Process API data: Use provided value if exists, else default to empty string
            const structuresWithValues = data.patientTests.map(test => ({
                ...test,
                testFields: test.testFields.map(field => ({
                    ...field,
                    // Use API value if present (field.value !== undefined), otherwise default to empty string
                    value: field.value !== undefined ? field.value : ''
                }))
            }));
            setPatientTestStructures(structuresWithValues); // This triggers the useEffect below

        } catch (error) {
            console.error('Error fetching test structure:', error);
            setErrorStructure(error.message || 'Failed to fetch test structure.');
            setPatientTestStructures([]); // Clear data on error
        } finally {
            setIsLoadingStructure(false);
        }
    };

    // Effect to fetch test structure on mount or when sessionID changes
    useEffect(() => {
        fetchTestStructure();
    }, [sessionID]);

    // Effect to initialize or pre-fill localTestResults based on fetched structure
    useEffect(() => {
        if (patientTestStructures.length === 0) {
            setLocalTestResults([]); // Clear if no structure
            return;
        };

        // Directly use the processed structures which now contain values if they were ready
        let initialLocalResults = JSON.parse(JSON.stringify(patientTestStructures));

        setLocalTestResults(initialLocalResults);
        // Reset index only if necessary, e.g., if structures changed significantly
        if (selectedTestIndex >= initialLocalResults.length) {
            setSelectedTestIndex(0);
        }

    }, [patientTestStructures]); // Rerun only when structure is fetched/processed

    // Generate options for dropdown based on fetched structures
    const testOptions = localTestResults.map((test, index) => ({
        label: `${test.testName}`,
        value: index.toString()
    }));

    // Handle test selection change
    const handleTestChange = (e) => {
        setSelectedTestIndex(parseInt(e.target.value, 10));
        setErrorMeasurement(null); // Clear measurement error on test change
    };

    // Handle input change for test field values (Manual Input - Keep for now)
    const handleFieldValueChange = (fieldIndex, value) => {
        // Allow editing only if results are NOT ready and NOT currently measuring
        if (isResultReady || isMeasuring || isLoadingMeasurement) return;

        const updatedResults = [...localTestResults];
        if (updatedResults[selectedTestIndex] && updatedResults[selectedTestIndex].testFields[fieldIndex]) {
            updatedResults[selectedTestIndex].testFields[fieldIndex].value = value;
            setLocalTestResults(updatedResults);
        }
    };


    // Fetch measurements from the backend API
    const startMeasuring = async () => {
        // Don't measure if results are already ready, already measuring, no session, or no tests loaded
        if (isResultReady || isMeasuring || !sessionID || localTestResults.length === 0) return;

        const currentTest = localTestResults[selectedTestIndex];
        if (!currentTest || !currentTest.testName) {
            setErrorMeasurement("Cannot start measurement: Test details missing.");
            return;
        }

        setIsMeasuring(true); // Use isMeasuring state
        setIsLoadingMeasurement(true); // Also indicate loading measurement specifically
        setErrorMeasurement(null);
        const token = Cookies.get('token');
        if (!token) {
            setErrorMeasurement("Authentication token not found.");
            setIsMeasuring(false);
            setIsLoadingMeasurement(false);
            return;
        }

        try {
            // Use testName for the query parameter
            const testName = currentTest.testName;
            const response = await fetch(`${API_BASE_URL}/paraclinical/patient_test/${sessionID}/measuring?testName=${encodeURIComponent(testName)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const measurements = data.measurements; // Array of { key, label, value }

            console.log('Fetched measurements:', measurements);

            // Update localTestResults with fetched values
            const updatedResults = [...localTestResults];
            const targetTestFields = updatedResults[selectedTestIndex].testFields;

            measurements.forEach(measurement => {
                const fieldIndex = targetTestFields.findIndex(field => field.key === measurement.key);
                if (fieldIndex !== -1) {
                    targetTestFields[fieldIndex].value = measurement.value;
                } else {
                    console.warn(`Measurement key "${measurement.key}" not found in local test fields for ${testName}`);
                }
            });

            setLocalTestResults(updatedResults);

        } catch (error) {
            console.error('Error fetching measurements:', error);
            setErrorMeasurement(error.message || 'Failed to fetch measurements.');
        } finally {
            setIsMeasuring(false);
            setIsLoadingMeasurement(false);
        }
    };

    return (
        <BoxContainer className='paraclinicalPatientTestTestingCardBox'>
            <BoxContainerTitle className='paraclinicalPatientTestTestingCard'>
                Patient Testing {isResultReady ? "(Results Ready)" : ""}
                {isLoadingStructure && <span> Loading structure...</span>}
                {errorStructure && <span style={{ color: 'red' }}> Error: {errorStructure}</span>}
            </BoxContainerTitle>

            <BoxContainerContent className='paraclinicalPatientTestTestingCardContent'>
                {!isLoadingStructure && !errorStructure && localTestResults.length > 0 && (
                    <>
                        <DropDownBox
                            options={testOptions}
                            value={selectedTestIndex.toString()}
                            onChange={handleTestChange}
                            disabled={isMeasuring || isLoadingStructure || isLoadingMeasurement} // Disable dropdown during measurement fetch
                        />

                        <button
                            className="startMeasuringButton"
                            onClick={startMeasuring}
                            // Disable if results are ready, structure is loading, or measurement is in progress
                            disabled={isResultReady || isLoadingStructure || isMeasuring || isLoadingMeasurement}
                        >
                            {isMeasuring || isLoadingMeasurement ? 'Measuring...' : isResultReady ? 'Results Ready' : 'Start Measuring'}
                        </button>
                        {errorMeasurement && <div style={{ color: 'red', marginTop: '10px' }}>Error: {errorMeasurement}</div>}
                    </>
                )}

                {/* Display Test Fields */}
                {!isLoadingStructure && localTestResults.length > 0 && localTestResults[selectedTestIndex] &&
                    localTestResults[selectedTestIndex].testFields &&
                    localTestResults[selectedTestIndex].testFields.map((field, index) => {
                    const unit = field.unit || '';
                    const rangeLow = field.range?.low;
                    const rangeHigh = field.range?.high;
                    // Display range appropriately for numeric and non-numeric types
                    let displayRange = 'N/A';
                    if (typeof rangeLow === 'number' && typeof rangeHigh === 'number') {
                        displayRange = `${rangeLow} - ${rangeHigh} ${unit}`;
                    } else if (rangeLow === 'negative' && rangeHigh === 'negative') {
                        displayRange = 'Negative';
                    } else if (unit === 'string') {
                         displayRange = 'Textual Description';
                    } else if (unit) {
                        displayRange = `(${unit})`; // Show unit if range isn't standard numeric
                    }


                    return (
                        <div key={index} className="testField">
                            <div className="fieldInfo">
                                <div className="fieldName">
                                    {/* Use label for display, keep key for potential internal use */}
                                    <strong>{field.label}</strong> ({field.key})
                                </div>
                                <div className="fieldRange">
                                    Normal Range: {displayRange}
                                </div>
                            </div>
                            <div className="fieldInput">
                                <input
                                    type="text"
                                    value={field.value}
                                    onChange={(e) => handleFieldValueChange(index, e.target.value)}
                                    placeholder={isResultReady ? '' : `Enter value`}
                                    // Disable manual input if measuring, results are ready, or measurement is loading
                                    disabled={isMeasuring || isResultReady || isLoadingMeasurement}
                                    readOnly={isMeasuring || isResultReady || isLoadingMeasurement} // Make readOnly for same conditions
                                />
                                {unit && unit !== 'string' && unit !== 'presence' && <span className="fieldUnit">{unit}</span>}
                            </div>
                        </div>
                    );
                })}
                 {/* Show loading indicator specifically for measurements if structure is loaded but measurements are fetching */}
                 {isLoadingMeasurement && !isLoadingStructure && <div style={{marginTop: '10px'}}>Loading measurements...</div>}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ParaclinicalPatientTestTestingCard;