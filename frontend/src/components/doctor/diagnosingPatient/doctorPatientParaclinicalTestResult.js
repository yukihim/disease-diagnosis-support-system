// // import React, { useState, useEffect } from 'react';
// // import './style/doctorPatientParaclinicalTestResult.css';

// // import BoxContainer from '../../common/boxContainer';
// // import BoxContainerTitle from '../../common/boxContainerTitle';
// // import BoxContainerContent from '../../common/boxContainerContent';

// // import DropDownBox from '../../common/dropDownBox';

// // import DoctorPatientParaclinicalTestResultCard from './doctorPatientParaclinicalTestResult/doctorPatientParaclinicalTestResultCard';

// // function DoctorPatientParaclinicalTestResult() {
// //     const [patientTestResults, setTestResults] = useState([]);
// //     const [selectedTestIndex, setSelectedTestIndex] = useState(0);
// //     const [isLoading, setIsLoading] = useState(false);
    
// //     // Fetch data from API
// //     const fetchTestResults = async () => {
// //         try {
// //             setIsLoading(true);
// //             // Replace with your actual API endpoint
// //             // const response = await fetch('your-api-endpoint');
// //             // const data = await response.json();
// //             // setTestResults(data);
            
// //             // Mock data for demonstration
// //             const mockData = [
// //                 {
// //                     testName: "Complete Blood Count",
// //                     dateTime: "2023-03-29 09:15 AM",
// //                     testFields: [
// //                         { key: "White Blood Cell Count", label: "WBC", value: "12.0 x10^9/L", normalRange: "4.5-11.0 x10^9/L" },
// //                         { key: "Red Blood Cell Count", label: "RBC", value: "4.9 x10^12/L", normalRange: "4.5-5.5 x10^12/L" },
// //                         { key: "Hemoglobin", label: "Hgb", value: "14.2 g/dL", normalRange: "13.5-17.5 g/dL" },
// //                         { key: "Hematocrit", label: "Hct", value: "32%", normalRange: "41-50%" }
// //                     ]
// //                 },
// //                 {
// //                     testName: "Liver Function Test",
// //                     dateTime: "2023-03-28 02:30 PM",
// //                     testFields: [
// //                         { key: "Total Bilirubin", label: "TBIL", value: "0.8 mg/dL", normalRange: "0.3-1.0 mg/dL" },
// //                         { key: "Alanine Aminotransferase", label: "ALT", value: "30 U/L", normalRange: "7-56 U/L" },
// //                         { key: "Aspartate Aminotransferase", label: "AST", value: "28 U/L", normalRange: "5-40 U/L" },
// //                         { key: "Alkaline Phosphatase", label: "ALP", value: "43 U/L", normalRange: "44-147 U/L" }
// //                     ]
// //                 }
// //             ];

// //             // Simulate network delay
// //             setTimeout(() => {
// //                 setTestResults(mockData);
// //                 // Reset selected test to first one when data refreshes
// //                 setSelectedTestIndex(0);
// //                 setIsLoading(false);
// //             }, 500);
// //         } catch (error) {
// //             console.error('Error fetching test results:', error);
// //             setIsLoading(false);
// //         }
// //     };
    
// //     useEffect(() => {
// //         fetchTestResults();
        
// //         // Set up interval to fetch data every 5 seconds - only for doctor view
// //         let intervalId;
// //         intervalId = setInterval(() => {
// //             fetchTestResults();
// //             console.log('fetchTestResults');
// //         }, 5000);
        
// //         // Clean up interval on component unmount
// //         return () => {
// //             if (intervalId) clearInterval(intervalId);
// //         };
// //     }, []);

// //     // Generate options for dropdown
// //     const testOptions = patientTestResults.map((test, index) => ({
// //         label: `${test.testName} - ${test.dateTime}`,
// //         value: index.toString()
// //     }));

// //     // Handle test selection change
// //     const handleTestChange = (e) => {
// //         setSelectedTestIndex(parseInt(e.target.value, 10));
// //     };
    
// //     return (
// //         <BoxContainer className='doctorPatientParaclinicalTestResultBox'>
// //             <BoxContainerTitle className='doctorPatientParaclinicalTestResult'>
// //                 Patient's Paraclinical Test Results
// //                 {isLoading && <span className="loading-indicator"> Loading...</span>}
// //             </BoxContainerTitle>

// //             <BoxContainerContent className='doctorPatientParaclinicalTestResultContent'>
// //                 {patientTestResults.length > 0 ? (
// //                     <>
// //                         <DropDownBox
// //                             options={testOptions}
// //                             value={selectedTestIndex.toString()}
// //                             onChange={handleTestChange}
// //                         />
                        
// //                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'auto' }}>
// //                             <h3>{patientTestResults[selectedTestIndex].testName}</h3>
// //                             <span className="testDateTime">{patientTestResults[selectedTestIndex].dateTime}</span>
// //                         </div>
                        
// //                         <DoctorPatientParaclinicalTestResultCard 
// //                             patientTestResult={patientTestResults[selectedTestIndex]}
// //                         />
// //                     </>
// //                 ) : (
// //                     <div className="no-results">No paraclinical test results available</div>
// //                 )}
// //             </BoxContainerContent>
// //         </BoxContainer>
// //     );
// // }

// // export default DoctorPatientParaclinicalTestResult;
















































// import React, { useState, useEffect, useMemo } from 'react'; // Added useMemo
// import './style/doctorPatientParaclinicalTestResult.css';

// import BoxContainer from '../../common/boxContainer';
// import BoxContainerTitle from '../../common/boxContainerTitle';
// import BoxContainerContent from '../../common/boxContainerContent';
// import DropDownBox from '../../common/dropDownBox';
// import LineChartComponent from '../../common/lineChart'; // Import LineChartComponent

// // --- Helper Functions (Paste parseNormalRange and generateMockFieldHistory here) ---
// function parseNormalRange(rangeString) {
//     if (!rangeString) return { low: 0, high: 0, unit: '' };
//     const parts = rangeString.match(/([\d.]+)\s*-\s*([\d.]+)\s*(.*)/);
//     if (parts && parts.length === 4) {
//         return { low: parseFloat(parts[1]), high: parseFloat(parts[2]), unit: parts[3].trim() };
//     }
//     const lessThan = rangeString.match(/<\s*([\d.]+)\s*(.*)/);
//     if (lessThan && lessThan.length === 3) {
//         return { low: 0, high: parseFloat(lessThan[1]), unit: lessThan[2].trim() };
//     }
//     const greaterThan = rangeString.match(/>\s*([\d.]+)\s*(.*)/);
//      if (greaterThan && greaterThan.length === 3) {
//         return { low: parseFloat(greaterThan[1]), high: Infinity, unit: greaterThan[2].trim() };
//     }
//     console.warn("Could not parse normal range:", rangeString);
//     return { low: 0, high: 0, unit: rangeString };
// }

// // const generateMockFieldHistory = (currentValueStr, numPoints = 1) => {
// //     const history = [];
// //     const numericMatch = currentValueStr ? currentValueStr.match(/[\d.]+/) : null;
// //     let currentValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
// //     if (isNaN(currentValue)) currentValue = 0;

// //     let tempValue = currentValue;
// //     for (let i = numPoints - 1; i > 0; i--) {
// //         const time = `T-${numPoints - 1 - i}`;
// //         const variation = (Math.random() - 0.5) * (tempValue * 0.1);
// //         tempValue = Math.max(0, tempValue - variation);
// //         history.push({ time, value: parseFloat(tempValue.toFixed(2)) });
// //     }
// //     history.push({ time: 'Now', value: parseFloat(currentValue.toFixed(2)) });
// //     return history;
// // };
// const generateCurrentPointData = (currentValueStr) => {
//     const history = [];
//     const numericMatch = currentValueStr ? currentValueStr.match(/[\d.]+/) : null;
//     let currentValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
//     if (isNaN(currentValue)) currentValue = 0;

//     // Only add the current point
//     history.push({ time: 'Now', value: parseFloat(currentValue.toFixed(2)) });
//     return history;
// };
// // --- End Helper Functions ---


// function DoctorPatientParaclinicalTestResult() {
//     const [patientTestResults, setTestResults] = useState([]);
//     const [selectedTestIndex, setSelectedTestIndex] = useState(0);
//     const [isLoading, setIsLoading] = useState(false);

//     // Processed data with history, safe ranges, and units
//     // const processedTestResults = useMemo(() => {
//     //     return patientTestResults.map(test => ({
//     //         ...test,
//     //         testFields: test.testFields.map(field => {
//     //             const { low, high, unit } = parseNormalRange(field.normalRange);
//     //             return {
//     //                 ...field,
//     //                 // history: generateMockFieldHistory(field.value),
//     //                 safeRange: { low, high },
//     //                 // unit: unit
//     //                 unit: generateMockFieldHistory(field.value),
//     //             };
//     //         })
//     //     }));
//     // }, [patientTestResults]); // Recalculate when raw results change
//     const processedTestResults = useMemo(() => {
//         return patientTestResults.map(test => ({
//             ...test,
//             testFields: test.testFields.map(field => {
//                 const { low, high, unit } = parseNormalRange(field.normalRange);
//                 return {
//                     ...field,
//                     chartData: generateCurrentPointData(field.value), // Generate only the current point
//                     safeRange: { low, high },
//                     unit: unit // Correctly assign the unit
//                 };
//             })
//         }));
//     }, [patientTestResults]); // Recalculate when raw results change

//     // Fetch data from API (using original mock structure initially)
//     const fetchTestResults = async () => {
//         try {
//             setIsLoading(true);
//             // Mock data (original structure)
//             const mockData = [
//                 {
//                     testName: "Complete Blood Count",
//                     dateTime: "2023-03-29 09:15 AM",
//                     testFields: [
//                         { key: "White Blood Cell Count", label: "WBC", value: "12.0 x10^9/L", normalRange: "4.5-11.0 x10^9/L" },
//                         { key: "Red Blood Cell Count", label: "RBC", value: "4.9 x10^12/L", normalRange: "4.5-5.5 x10^12/L" },
//                         { key: "Hemoglobin", label: "Hgb", value: "14.2 g/dL", normalRange: "13.5-17.5 g/dL" },
//                         { key: "Hematocrit", label: "Hct", value: "32%", normalRange: "41-50%" } // Note: % unit might need special handling in chart/parser
//                     ]
//                 },
//                 {
//                     testName: "Liver Function Test",
//                     dateTime: "2023-03-28 02:30 PM",
//                     testFields: [
//                         { key: "Total Bilirubin", label: "TBIL", value: "0.8 mg/dL", normalRange: "0.3-1.0 mg/dL" },
//                         { key: "Alanine Aminotransferase", label: "ALT", value: "30 U/L", normalRange: "7-56 U/L" },
//                         { key: "Aspartate Aminotransferase", label: "AST", value: "28 U/L", normalRange: "5-40 U/L" },
//                         { key: "Alkaline Phosphatase", label: "ALP", value: "43 U/L", normalRange: "44-147 U/L" }
//                     ]
//                 }
//                 // Add more mock tests if needed
//             ];

//             // Simulate network delay
//             setTimeout(() => {
//                 setTestResults(mockData); // Set the raw data
//                 setSelectedTestIndex(0);
//                 setIsLoading(false);
//             }, 500);
//         } catch (error) {
//             console.error('Error fetching test results:', error);
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchTestResults();
//     }, []);

//     // Generate options for dropdown using the raw patientTestResults
//     const testOptions = patientTestResults.map((test, index) => ({
//         label: `${test.testName} - ${test.dateTime}`,
//         value: index.toString()
//     }));

//     const handleTestChange = (e) => {
//         setSelectedTestIndex(parseInt(e.target.value, 10));
//     };

//     // Get the currently selected processed test data
//     const selectedTestData = processedTestResults.length > selectedTestIndex ? processedTestResults[selectedTestIndex] : null;

//     // return (
//     //     <BoxContainer className='doctorPatientParaclinicalTestResultBox'>
//     //         <BoxContainerTitle className='doctorPatientParaclinicalTestResult'>
//     //             Patient's Paraclinical Test Results
//     //             {isLoading && <span className="loading-indicator"> Loading...</span>}
//     //         </BoxContainerTitle>

//     //         <BoxContainerContent className='doctorPatientParaclinicalTestResultContent'>
//     //             {processedTestResults.length > 0 && selectedTestData ? (
//     //                 <>
//     //                     <DropDownBox
//     //                         options={testOptions}
//     //                         value={selectedTestIndex.toString()}
//     //                         onChange={handleTestChange}
//     //                     />

//     //                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'auto', marginTop: '10px', marginBottom: '10px' }}>
//     //                         <h3>{selectedTestData.testName}</h3>
//     //                         <span className="testDateTime">{selectedTestData.dateTime}</span>
//     //                     </div>

//     //                     {/* Render a chart for each test field */}
//     //                     <div className="paraclinical-charts-grid">
//     //                         {selectedTestData.testFields.map((field, fieldIndex) => (
//     //                             <div key={fieldIndex} className="paraclinical-chart-container">
//     //                                 <h4 className="paraclinical-chart-title">{field.label} ({field.key})</h4>
//     //                                 <div style={{ height: '200px', width: '100%' }}> {/* Adjust height as needed */}
//     //                                     <LineChartComponent
//     //                                         // data={field.history}
//     //                                         dataKeys={['value']} // The key in our generated history
//     //                                         unit={field.unit}
//     //                                         safeRange={field.safeRange}
//     //                                         chartName={field.label} // Use label for chart name
//     //                                         height={200} // Set chart height
//     //                                     />
//     //                                 </div>
//     //                                  {/* Optionally display current value and range textually */}
//     //                                  <div className="paraclinical-chart-info">
//     //                                     <span>Current: {field.value}</span>
//     //                                     <span>Normal Range: {field.normalRange}</span>
//     //                                 </div>
//     //                             </div>
//     //                         ))}
//     //                     </div>
//     //                 </>
//     //             ) : (
//     //                 <div className="no-results">{isLoading ? 'Loading...' : 'No paraclinical test results available'}</div>
//     //             )}
//     //         </BoxContainerContent>
//     //     </BoxContainer>
//     // );

//     return (
//         <BoxContainer className='doctorPatientParaclinicalTestResultBox'>
//             <BoxContainerTitle className='doctorPatientParaclinicalTestResult'>
//                 Patient's Paraclinical Test Results
//                 {isLoading && <span className="loading-indicator"> Loading...</span>}
//             </BoxContainerTitle>

//             <BoxContainerContent className='doctorPatientParaclinicalTestResultContent'>
//                 {processedTestResults.length > 0 && selectedTestData ? (
//                     <>
//                         <DropDownBox
//                             options={testOptions}
//                             value={selectedTestIndex.toString()}
//                             onChange={handleTestChange}
//                         />

//                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'auto', marginTop: '10px', marginBottom: '10px' }}>
//                             <h3>{selectedTestData.testName}</h3>
//                             <span className="testDateTime">{selectedTestData.dateTime}</span>
//                         </div>

//                         {/* Render a chart for each test field */}
//                         <div className="paraclinical-charts-grid">
//                             {selectedTestData.testFields.map((field, fieldIndex) => (
//                                 <div key={fieldIndex} className="paraclinical-chart-container">
//                                     <h4 className="paraclinical-chart-title">{field.label} ({field.key})</h4>
//                                     <div style={{ height: '200px', width: '100%' }}> {/* Adjust height as needed */}
//                                         <LineChartComponent
//                                             data={field.chartData} // Pass the single data point
//                                             dataKeys={['value']} // The key in our generated data
//                                             unit={field.unit} // Pass the correct unit
//                                             safeRange={field.safeRange}
//                                             chartName={field.label} // Use label for chart name
//                                             height={200} // Set chart height
//                                             medianOrNot={false} // Set medianOrNot to false for current point
//                                         />
//                                     </div>
//                                      {/* Optionally display current value and range textually */}
//                                      <div className="paraclinical-chart-info">
//                                         <span>Current: {field.value}</span>
//                                         <span>Normal Range: {field.normalRange}</span>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </>
//                 ) : (
//                     <div className="no-results">{isLoading ? 'Loading...' : 'No paraclinical test results available'}</div>
//                 )}
//             </BoxContainerContent>
//         </BoxContainer>
//     );
// }

// export default DoctorPatientParaclinicalTestResult;

























































import React, { useState, useEffect, useMemo } from 'react'; // Added useMemo
import './style/doctorPatientParaclinicalTestResult.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';
import DropDownBox from '../../common/dropDownBox';
import LineChartComponent from '../../common/lineChart'; // Import LineChartComponent

// --- Helper Functions ---
function parseNormalRange(rangeString) {
    if (!rangeString) return { low: 0, high: 0, unit: '' };
    // Match "number - number unit" format
    const parts = rangeString.match(/([\d.]+)\s*-\s*([\d.]+)\s*(.*)/);
    if (parts && parts.length === 4) {
        return { low: parseFloat(parts[1]), high: parseFloat(parts[2]), unit: parts[3].trim() };
    }
    // Match "< number unit" format
    const lessThan = rangeString.match(/<\s*([\d.]+)\s*(.*)/);
    if (lessThan && lessThan.length === 3) {
        return { low: 0, high: parseFloat(lessThan[1]), unit: lessThan[2].trim() };
    }
    // Match "> number unit" format
    const greaterThan = rangeString.match(/>\s*([\d.]+)\s*(.*)/);
     if (greaterThan && greaterThan.length === 3) {
        return { low: parseFloat(greaterThan[1]), high: Infinity, unit: greaterThan[2].trim() };
    }
    // Fallback if no format matches
    console.warn("Could not parse normal range:", rangeString);
    return { low: 0, high: 0, unit: rangeString }; // Return the original string as unit if unparseable
}

// Generates a single data point for the chart based on the current value
const generateCurrentPointData = (currentValueStr) => {
    const history = [];
    // Extract the first numeric part of the value string
    const numericMatch = currentValueStr ? currentValueStr.match(/[\d.]+/) : null;
    let currentValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
    // Handle cases where parsing fails
    if (isNaN(currentValue)) currentValue = 0;

    // Create a single data point object for the chart
    history.push({ time: 'Now', value: parseFloat(currentValue.toFixed(2)) });
    return history;
};
// --- End Helper Functions ---


function DoctorPatientParaclinicalTestResult() {
    const [patientTestResults, setTestResults] = useState([]); // Raw data from API
    const [selectedTestIndex, setSelectedTestIndex] = useState(0); // Index of the selected test in the dropdown
    const [isLoading, setIsLoading] = useState(false); // Loading state indicator

    // Process the raw test results using useMemo for optimization
    const processedTestResults = useMemo(() => {
        return patientTestResults.map(test => ({
            ...test, // Keep original test data
            testFields: test.testFields.map(field => {
                // Parse the normal range string to get low, high, and unit
                const { low, high, unit } = parseNormalRange(field.normalRange);
                return {
                    ...field, // Keep original field data
                    chartData: generateCurrentPointData(field.value), // Generate data for the chart (single point)
                    safeRange: { low, high }, // Parsed safe range for the chart
                    unit: unit // Extracted unit for the chart
                };
            })
        }));
    }, [patientTestResults]); // Recalculate only when patientTestResults changes

    // Function to fetch test results data (currently uses mock data)
    const fetchTestResults = async () => {
        try {
            setIsLoading(true);
            // Mock data simulating API response
            const mockData = [
                {
                    testName: "Complete Blood Count",
                    dateTime: "2023-03-29 09:15 AM",
                    testFields: [
                        { key: "White Blood Cell Count", label: "WBC", value: "12.0 x10^9/L", normalRange: "4.5-11.0 x10^9/L" },
                        { key: "Red Blood Cell Count", label: "RBC", value: "4.9 x10^12/L", normalRange: "4.5-5.5 x10^12/L" },
                        { key: "Hemoglobin", label: "Hgb", value: "14.2 g/dL", normalRange: "13.5-17.5 g/dL" },
                        { key: "Hematocrit", label: "Hct", value: "32%", normalRange: "41-50%" } // Note: % unit might need special handling
                    ]
                },
                {
                    testName: "Liver Function Test",
                    dateTime: "2023-03-28 02:30 PM",
                    testFields: [
                        { key: "Total Bilirubin", label: "TBIL", value: "0.8 mg/dL", normalRange: "0.3-1.0 mg/dL" },
                        { key: "Alanine Aminotransferase", label: "ALT", value: "30 U/L", normalRange: "7-56 U/L" },
                        { key: "Aspartate Aminotransferase", label: "AST", value: "28 U/L", normalRange: "5-40 U/L" },
                        { key: "Alkaline Phosphatase", label: "ALP", value: "43 U/L", normalRange: "44-147 U/L" }
                    ]
                }
                // Add more mock tests if needed
            ];

            // Simulate network delay
            setTimeout(() => {
                setTestResults(mockData); // Set the raw data fetched
                setSelectedTestIndex(0); // Reset selection to the first test
                setIsLoading(false); // Turn off loading indicator
            }, 500);
        } catch (error) {
            console.error('Error fetching test results:', error);
            setIsLoading(false); // Ensure loading is off even if there's an error
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchTestResults();
        // No cleanup needed for this effect as it only runs once
    }, []); // Empty dependency array means this runs only once on mount

    // Generate options for the dropdown based on the raw patientTestResults
    const testOptions = patientTestResults.map((test, index) => ({
        label: `${test.testName} - ${test.dateTime}`, // Display test name and date
        value: index.toString() // Use the index as the value
    }));

    // Handler for when the dropdown selection changes
    const handleTestChange = (e) => {
        setSelectedTestIndex(parseInt(e.target.value, 10)); // Update the selected index state
    };

    // Get the currently selected processed test data based on selectedTestIndex
    // Check if processedTestResults has data and the index is valid
    const selectedTestData = processedTestResults.length > selectedTestIndex ? processedTestResults[selectedTestIndex] : null;

    return (
        <BoxContainer className='doctorPatientParaclinicalTestResultBox'>
            <BoxContainerTitle className='doctorPatientParaclinicalTestResult'>
                Patient's Paraclinical Test Results
                {/* Show loading indicator if data is being fetched */}
                {isLoading && <span className="loading-indicator"> Loading...</span>}
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPatientParaclinicalTestResultContent'>
                {/* Conditional rendering: Show content only if data is loaded and a test is selected */}
                {processedTestResults.length > 0 && selectedTestData ? (
                    <>
                        {/* Dropdown to select different tests */}
                        <DropDownBox
                            options={testOptions}
                            value={selectedTestIndex.toString()}
                            onChange={handleTestChange}
                        />

                        {/* Display the name and date/time of the selected test */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'auto', marginTop: '10px', marginBottom: '10px' }}>
                            <h3>{selectedTestData.testName}</h3>
                            <span className="testDateTime">{selectedTestData.dateTime}</span>
                        </div>

                        {/* Grid layout for displaying charts for each test field */}
                        <div className="paraclinical-charts-grid">
                            {/* Map through each field of the selected test */}
                            {selectedTestData.testFields.map((field, fieldIndex) => (
                                <div key={fieldIndex} className="paraclinical-chart-container">
                                    {/* Title for the chart */}
                                    <h4 className="paraclinical-chart-title">{field.label} ({field.key})</h4>
                                    {/* Container for the line chart component */}
                                    <div style={{ height: '200px', width: '100%' }}> {/* Adjust height as needed */}
                                        <LineChartComponent
                                            data={field.chartData} // Pass the single data point array
                                            dataKeys={['value']} // Key to access the value in the data object
                                            unit={field.unit} // Pass the extracted unit
                                            safeRange={field.safeRange} // Pass the parsed safe range
                                            chartName={field.label} // Use field label as chart name
                                            height={200} // Set chart height
                                            medianOrNot={false} // Explicitly disable median for this component
                                        />
                                    </div>
                                     {/* Display the current value and normal range textually below the chart */}
                                     <div className="paraclinical-chart-info">
                                        <span>Current: {field.value}</span>
                                        <span>Normal Range: {field.normalRange}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    // Display message if loading or no results are available
                    <div className="no-results">{isLoading ? 'Loading...' : 'No paraclinical test results available'}</div>
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPatientParaclinicalTestResult;