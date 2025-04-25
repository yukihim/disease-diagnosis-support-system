// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom'; // Import useLocation
// import './style/paraclinicalPatientTestTestingCard.css';

// import BoxContainer from '../../common/boxContainer';
// import BoxContainerTitle from '../../common/boxContainerTitle';
// import BoxContainerContent from '../../common/boxContainerContent';

// import DropDownBox from '../../common/dropDownBox';

// function ParaclinicalPatientTestTestingCard() {
//     const location = useLocation(); // Get location object
//     const patientState = location.state?.patientState; // Extract patient state
//     const isResultReady = patientState === 'Test Result Ready'; // Check if results are ready

//     const [patientTestResults, setTestResults] = useState([]);
//     const [selectedTestIndex, setSelectedTestIndex] = useState(0);
//     const [localTestResults, setLocalTestResults] = useState([]);
//     const [isMeasuring, setIsMeasuring] = useState(false);

//     // Fetch test structure data from API (or use mock)
//     const fetchTestStructure = async () => {
//         try {
//             // Mock data for demonstration
//             const mockData = [
//                 {
//                     testName: "Complete Blood Count",
//                     testFields: [
//                         { key: "White Blood Cell Count", label: "WBC", value: "", normalRange: "4.5-11.0 x10^9/L" },
//                         { key: "Red Blood Cell Count", label: "RBC", value: "", normalRange: "4.5-5.5 x10^12/L" },
//                         { key: "Hemoglobin", label: "Hgb", value: "", normalRange: "13.5-17.5 g/dL" },
//                         { key: "Hematocrit", label: "Hct", value: "", normalRange: "41-50%" },
//                         { key: "Mean Corpuscular Volume", label: "MCV", value: "", normalRange: "80-100 fL" },
//                         { key: "Mean Corpuscular Hemoglobin", label: "MCH", value: "", normalRange: "27-31 pg" },
//                         { key: "Mean Corpuscular Hemoglobin Concentration", label: "MCHC", value: "", normalRange: "32-36 g/dL" },
//                         { key: "Platelet Count", label: "PLT", value: "", normalRange: "150-450 x10^9/L" }
//                     ]
//                 },
//                 {
//                     testName: "Liver Function Test",
//                     testFields: [
//                         { key: "Total Bilirubin", label: "TBIL", value: "", normalRange: "0.3-1.0 mg/dL" },
//                         { key: "Alanine Aminotransferase", label: "ALT", value: "", normalRange: "7-56 U/L" },
//                         { key: "Aspartate Aminotransferase", label: "AST", value: "", normalRange: "5-40 U/L" },
//                         { key: "Alkaline Phosphatase", label: "ALP", value: "", normalRange: "44-147 U/L" }
//                     ]
//                 }
//             ];

//             setTestResults(mockData);
//             // Don't set localTestResults here anymore, handle in the next useEffect

//         } catch (error) {
//             console.error('Error fetching test types: ', error);
//         }
//     };

//     // Effect to fetch test structure on mount
//     useEffect(() => {
//         fetchTestStructure();
//     }, []);

//     // Effect to initialize or pre-fill localTestResults based on patientState
//     useEffect(() => {
//         if (patientTestResults.length === 0) return; // Wait for structure data

//         let initialLocalResults = JSON.parse(JSON.stringify(patientTestResults)); // Deep copy

//         if (isResultReady) {
//             // Pre-fill with mock data if results are ready
//             initialLocalResults = initialLocalResults.map(test => ({
//                 ...test,
//                 testFields: test.testFields.map(field => ({
//                     ...field,
//                     value: generateRandomValue(field.normalRange) // Generate mock value
//                 }))
//             }));
//         }
//         // If not ready, initialLocalResults remains a copy with empty values

//         setLocalTestResults(initialLocalResults);
//         setSelectedTestIndex(0); // Reset selected test index

//     }, [patientTestResults, isResultReady]); // Rerun when structure or state changes

//     // Generate options for dropdown
//     const testOptions = patientTestResults.map((test, index) => ({
//         label: `${test.testName}`,
//         value: index.toString()
//     }));

//     // Handle test selection change
//     const handleTestChange = (e) => {
//         setSelectedTestIndex(parseInt(e.target.value, 10));
//     };

//     // Handle input change for test field values
//     const handleFieldValueChange = (fieldIndex, value) => {
//         // Only allow changes if results are not ready and not currently measuring
//         if (isResultReady || isMeasuring) return;

//         const updatedResults = [...localTestResults];
//         // Ensure the selected test and its fields exist before updating
//         if (updatedResults[selectedTestIndex] && updatedResults[selectedTestIndex].testFields[fieldIndex]) {
//             updatedResults[selectedTestIndex].testFields[fieldIndex].value = value;
//             setLocalTestResults(updatedResults);
//         }
//     };

//     // Extract units from normal range
//     const extractUnit = (normalRange) => {
//         const matches = normalRange.match(/[^\d.-]+.*$/);
//         return matches ? matches[0].trim() : '';
//     };

//     // Generate random value within normal range
//     const generateRandomValue = (normalRange) => {
//         const range = normalRange.match(/(\d+(\.\d+)?)-(\d+(\.\d+)?)/);
//         if (!range) return "N/A"; // Return N/A if range parsing fails

//         const lowerBound = parseFloat(range[1]);
//         const upperBound = parseFloat(range[3]);

//         // Generate random value between bounds
//         const value = lowerBound + Math.random() * (upperBound - lowerBound);

//         // Sometimes generate abnormal values (20% chance)
//         const abnormalChance = Math.random();
//         if (abnormalChance > 0.9) {
//             // Value above normal range
//             return (upperBound + (Math.random() * upperBound * 0.2)).toFixed(1);
//         } else if (abnormalChance > 0.8) {
//             // Value below normal range
//             return (lowerBound - (Math.random() * lowerBound * 0.2)).toFixed(1);
//         }

//         // Return normal value
//         return value.toFixed(1);
//     };

//     // Simulate medical device measurement
//     const startMeasuring = async () => {
//         // Prevent starting if results are already ready or already measuring
//         if (isResultReady || isMeasuring) return;

//         setIsMeasuring(true);

//         const updatedResults = [...localTestResults];
//         // Ensure the selected test and its fields exist
//         if (!updatedResults[selectedTestIndex] || !updatedResults[selectedTestIndex].testFields) {
//             setIsMeasuring(false);
//             return;
//         }
//         const testFields = updatedResults[selectedTestIndex].testFields;

//         // Simulate measuring each field one by one
//         for (let i = 0; i < testFields.length; i++) {
//             // Optional delay: await new Promise(resolve => setTimeout(resolve, 500)); // Simulate 0.5 second per measurement

//             const field = testFields[i];
//             const value = generateRandomValue(field.normalRange);

//             testFields[i].value = value;

//             // Update state to show progress incrementally
//             setLocalTestResults([...updatedResults]);
//         }

//         setIsMeasuring(false);
//         // Note: In a real scenario, you might want to update the patient's state
//         // back in the parent component or via API call after measurement is complete.
//     };

//     return (
//         <BoxContainer className='paraclinicalPatientTestTestingCardBox'>
//             <BoxContainerTitle className='paraclinicalPatientTestTestingCard'>
//                 Patient Testing {isResultReady ? "(Results Ready)" : ""}
//             </BoxContainerTitle>

//             <BoxContainerContent className='paraclinicalPatientTestTestingCardContent'>
//                 {/* Choosing Test Type */}
//                 <DropDownBox
//                     options={testOptions}
//                     value={selectedTestIndex.toString()}
//                     onChange={handleTestChange}
//                     disabled={isMeasuring || isResultReady} // Disable if measuring or results ready
//                 />

//                 <button
//                     className="startMeasuringButton"
//                     onClick={startMeasuring}
//                     disabled={isMeasuring || isResultReady} // Disable if measuring or results ready
//                 >
//                     {/* Change button text based on state */}
//                     {isMeasuring ? 'Measuring...' : isResultReady ? 'Results Ready' : 'Start Measuring'}
//                 </button>

//                 {/* Display test fields for input */}
//                 {localTestResults.length > 0 && localTestResults[selectedTestIndex] &&
//                     localTestResults[selectedTestIndex].testFields &&
//                     localTestResults[selectedTestIndex].testFields.map((field, index) => {
//                     const unit = extractUnit(field.normalRange);
//                     return (
//                         <div key={index} className="testField">
//                             <div className="fieldInfo">
//                                 <div className="fieldName">
//                                     <strong>{field.label}</strong> ({field.key})
//                                 </div>
//                                 <div className="fieldRange">
//                                     Normal Range: {field.normalRange}
//                                 </div>
//                             </div>
//                             <div className="fieldInput">
//                                 <input
//                                     type="text"
//                                     value={field.value}
//                                     onChange={(e) => handleFieldValueChange(index, e.target.value)}
//                                     placeholder={isResultReady ? 'N/A' : `Enter value ${unit}`}
//                                     // Disable if measuring or results are ready
//                                     disabled={isMeasuring || isResultReady}
//                                     // Make read-only if results are ready for better UX
//                                     readOnly={isResultReady}
//                                 />
//                                 {unit && <span className="fieldUnit">{unit}</span>}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </BoxContainerContent>
//         </BoxContainer>
//     );
// }

// export default ParaclinicalPatientTestTestingCard;

















































import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './style/paraclinicalPatientTestTestingCard.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';
import DropDownBox from '../../common/dropDownBox';

function ParaclinicalPatientTestTestingCard() {
    const location = useLocation();
    const patientState = location.state?.patientState;
    const isResultReady = patientState === 'Test Result Ready';

    const [patientTestResults, setTestResults] = useState([]);
    const [selectedTestIndex, setSelectedTestIndex] = useState(0);
    const [localTestResults, setLocalTestResults] = useState([]);
    const [isMeasuring, setIsMeasuring] = useState(false);

    // Fetch test structure data from API (or use mock)
    const fetchTestStructure = async () => {
        try {
            // Mock data based on grouped_test_options structure
            const mockData = [
                {
                    testName: "Complete Blood Count", // Matches label in grouped_test_options
                    testFields: [
                        // Parameters from grouped_test_options['Blood Tests'][0].parameters
                        { key: "Hemoglobin (Hgb)", label: "Hgb", value: "", unit: "g/dL", range: { low: 12, high: 18 } },
                        { key: "Hematocrit (Hct)", label: "Hct", value: "", unit: "%", range: { low: 36, high: 50 } },
                        { key: "White Blood Cell Count (WBC)", label: "WBC", value: "", unit: "cells/mm³", range: { low: 4500, high: 11000 } },
                        { key: "Platelet Count", label: "PLT", value: "", unit: "cells/mm³", range: { low: 150000, high: 350000 } },
                    ]
                },
                {
                    testName: "Liver Function Test", // Matches label in grouped_test_options
                    testFields: [
                        // Parameters from grouped_test_options['Blood Tests'][4].parameters
                        { key: "Alanine Aminotransferase (ALT)", label: "ALT", value: "", unit: "U/L", range: { low: 10, high: 40 } },
                        { key: "Aspartate Aminotransferase (AST)", label: "AST", value: "", unit: "U/L", range: { low: 10, high: 30 } },
                        { key: "Alkaline Phosphatase (ALP)", label: "ALP", value: "", unit: "IU/L", range: { low: 30, high: 120 } },
                        { key: "Total Bilirubin", label: "TBIL", value: "", unit: "mg/dL", range: { low: 0.3, high: 1.2 } },
                        { key: "Direct Bilirubin", label: "DBIL", value: "", unit: "mg/dL", range: { low: 0.1, high: 0.3 } }, // Added label DBIL
                        { key: "Albumin", label: "Albumin", value: "", unit: "g/dL", range: { low: 3.5, high: 5.0 } },
                    ]
                }
                // Add other tests from grouped_test_options as needed for the paraclinical simulation
            ];

            setTestResults(mockData);

        } catch (error) {
            console.error('Error fetching test types: ', error);
        }
    };

    // Effect to fetch test structure on mount
    useEffect(() => {
        fetchTestStructure();
    }, []);

    // Effect to initialize or pre-fill localTestResults based on patientState
    useEffect(() => {
        if (patientTestResults.length === 0) return;

        let initialLocalResults = JSON.parse(JSON.stringify(patientTestResults));

        if (isResultReady) {
            initialLocalResults = initialLocalResults.map(test => ({
                ...test,
                testFields: test.testFields.map(field => ({
                    ...field,
                    value: generateRandomValue(field.range)
                }))
            }));
        }

        setLocalTestResults(initialLocalResults);
        setSelectedTestIndex(0);

    }, [patientTestResults, isResultReady]);

    // Generate options for dropdown
    const testOptions = patientTestResults.map((test, index) => ({
        label: `${test.testName}`,
        value: index.toString()
    }));

    // Handle test selection change
    const handleTestChange = (e) => {
        setSelectedTestIndex(parseInt(e.target.value, 10));
    };

    // Handle input change for test field values
    const handleFieldValueChange = (fieldIndex, value) => {
        if (isResultReady || isMeasuring) return;

        const updatedResults = [...localTestResults];
        if (updatedResults[selectedTestIndex] && updatedResults[selectedTestIndex].testFields[fieldIndex]) {
            updatedResults[selectedTestIndex].testFields[fieldIndex].value = value;
            setLocalTestResults(updatedResults);
        }
    };

    // Generate random value within normal range
    const generateRandomValue = (range) => {
        if (range && typeof range.low === 'number' && typeof range.high === 'number') {
            const lowerBound = range.low;
            const upperBound = range.high;
            const value = lowerBound + Math.random() * (upperBound - lowerBound);
            const abnormalChance = Math.random();
            if (abnormalChance > 0.9) {
                return (upperBound + (Math.random() * upperBound * 0.2)).toFixed(1);
            } else if (abnormalChance > 0.8) {
                const deviation = Math.abs(lowerBound * 0.2) + 0.1;
                return (lowerBound - (Math.random() * deviation)).toFixed(1);
            }
            const precision = (upperBound - lowerBound) < 10 ? 1 : ((upperBound - lowerBound) < 100 ? 0 : 0); // Adjust precision
            return value.toFixed(precision);
        }
        // Handle non-numeric ranges (like 'presence' or 'string' types from grouped_options)
        if (range && range.low === 'negative' && range.high === 'negative') {
            return Math.random() > 0.1 ? 'negative' : 'positive'; // 10% chance positive
        }
        if (range && !range.low && !range.high) { // Likely a string field
             return "Normal"; // Or some other default string
        }

        return "N/A";
    };


    // Simulate medical device measurement
    const startMeasuring = async () => {
        if (isResultReady || isMeasuring) return;
        setIsMeasuring(true);

        const updatedResults = [...localTestResults];
        if (!updatedResults[selectedTestIndex] || !updatedResults[selectedTestIndex].testFields) {
            setIsMeasuring(false);
            return;
        }
        const testFields = updatedResults[selectedTestIndex].testFields;

        for (let i = 0; i < testFields.length; i++) {
            // Optional delay: await new Promise(resolve => setTimeout(resolve, 200));
            const field = testFields[i];
            const value = generateRandomValue(field.range);
            testFields[i].value = value;
            setLocalTestResults([...updatedResults]);
        }

        setIsMeasuring(false);
    };

    return (
        <BoxContainer className='paraclinicalPatientTestTestingCardBox'>
            <BoxContainerTitle className='paraclinicalPatientTestTestingCard'>
                Patient Testing {isResultReady ? "(Results Ready)" : ""}
            </BoxContainerTitle>

            <BoxContainerContent className='paraclinicalPatientTestTestingCardContent'>
                <DropDownBox
                    options={testOptions}
                    value={selectedTestIndex.toString()}
                    onChange={handleTestChange}
                    disabled={isMeasuring || isResultReady}
                />

                <button
                    className="startMeasuringButton"
                    onClick={startMeasuring}
                    disabled={isMeasuring || isResultReady}
                >
                    {isMeasuring ? 'Measuring...' : isResultReady ? 'Results Ready' : 'Start Measuring'}
                </button>

                {localTestResults.length > 0 && localTestResults[selectedTestIndex] &&
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
                                    disabled={isMeasuring || isResultReady}
                                    readOnly={isResultReady}
                                />
                                {unit && unit !== 'string' && unit !== 'presence' && <span className="fieldUnit">{unit}</span>}
                            </div>
                        </div>
                    );
                })}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ParaclinicalPatientTestTestingCard;