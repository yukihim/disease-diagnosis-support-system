// import React, { useState, useEffect } from 'react';
// import './style/paraclinicalPatientTestTestingCard.css';

// import BoxContainer from '../../common/boxContainer';
// import BoxContainerTitle from '../../common/boxContainerTitle';
// import BoxContainerContent from '../../common/boxContainerContent';

// import DropDownBox from '../../common/dropDownBox';

// // import ParaclinicalPatientTestAdditionalInformationDisplay from './paraclinicalPatientTestTestingCard/paraclinicalPatientTestTestingCardDisplay';

// function ParaclinicalPatientTestTestingCard() {
//     const [patientTestResults, setTestResults] = useState([]);
//     const [selectedTestIndex, setSelectedTestIndex] = useState(0);
    
//     // Fetch data from API
//     const fetchTestResults = async () => {
//         try {
//             // Replace with your actual API endpoint
//             // const response = await fetch('your-api-endpoint');
//             // const data = await response.json();
//             // setTestResults(data);
            
//             // Mock data for demonstration
//             const mockData = [
//                 {
//                     testName: "Complete Blood Count",
//                     testFields: [
//                         { key: "White Blood Cell Count", label: "WBC", value: "", normalRange: "4.5-11.0 x10^9/L" },
//                         { key: "Red Blood Cell Count", label: "RBC", value: "", normalRange: "4.5-5.5 x10^12/L" },
//                         { key: "Hemoglobin", label: "Hgb", value: "", normalRange: "13.5-17.5 g/dL" },
//                         { key: "Hematocrit", label: "Hct", value: "", normalRange: "41-50%" }
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
            
//             // Reset selected test to first one when data refreshes
//             setSelectedTestIndex(0);
//         } catch (error) {
//             console.error('Error fetching test types: ', error);
//         }
//     };
    
//     useEffect(() => {
//         fetchTestResults();
        
//         // Set up interval to fetch data every 5 seconds - only for doctor view
//         let intervalId;
//         intervalId = setInterval(() => {
//             fetchTestResults();
//             console.log('fetchTestResults');
//         }, 5000);
        
//         return () => clearInterval(intervalId);
//     }, []);

//     // Generate options for dropdown
//     const testOptions = patientTestResults.map((test, index) => ({
//         label: `${test.testName}`,
//         value: index.toString()
//     }));

//     // Handle test selection change
//     const handleTestChange = (e) => {
//         setSelectedTestIndex(parseInt(e.target.value, 10));
//     };

//     return (
//         <BoxContainer className='paraclinicalPatientTestTestingCardBox'>
//             {/* Design finalize and check in for patient component here */}
//             <BoxContainerTitle className='paraclinicalPatientTestTestingCard'>
//                 Patient Testing
//             </BoxContainerTitle>

//             <BoxContainerContent className='paraclinicalPatientTestTestingCardContent'>
//                 {/* Choosing Test Type */}
//                 <DropDownBox
//                     options={testOptions}
//                     value={selectedTestIndex.toString()}
//                     onChange={handleTestChange}
//                 />
//             </BoxContainerContent>
//         </BoxContainer>
//     );
// }

// export default ParaclinicalPatientTestTestingCard;





















import React, { useState, useEffect } from 'react';
import './style/paraclinicalPatientTestTestingCard.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DropDownBox from '../../common/dropDownBox';

function ParaclinicalPatientTestTestingCard() {
    const [patientTestResults, setTestResults] = useState([]);
    const [selectedTestIndex, setSelectedTestIndex] = useState(0);
    const [localTestResults, setLocalTestResults] = useState([]);
    const [isMeasuring, setIsMeasuring] = useState(false);
    
    // Fetch data from API
    const fetchTestResults = async () => {
        try {
            // Replace with your actual API endpoint
            // const response = await fetch('your-api-endpoint');
            // const data = await response.json();
            // setTestResults(data);
            
            // Mock data for demonstration
            const mockData = [
                {
                    testName: "Complete Blood Count",
                    testFields: [
                        { key: "White Blood Cell Count", label: "WBC", value: "", normalRange: "4.5-11.0 x10^9/L" },
                        { key: "Red Blood Cell Count", label: "RBC", value: "", normalRange: "4.5-5.5 x10^12/L" },
                        { key: "Hemoglobin", label: "Hgb", value: "", normalRange: "13.5-17.5 g/dL" },
                        { key: "Hematocrit", label: "Hct", value: "", normalRange: "41-50%" },
                        { key: "Mean Corpuscular Volume", label: "MCV", value: "", normalRange: "80-100 fL" },
                        { key: "Mean Corpuscular Hemoglobin", label: "MCH", value: "", normalRange: "27-31 pg" },
                        { key: "Mean Corpuscular Hemoglobin Concentration", label: "MCHC", value: "", normalRange: "32-36 g/dL" },
                        { key: "Platelet Count", label: "PLT", value: "", normalRange: "150-450 x10^9/L" }
                    ]
                },
                {
                    testName: "Liver Function Test",
                    testFields: [
                        { key: "Total Bilirubin", label: "TBIL", value: "", normalRange: "0.3-1.0 mg/dL" },
                        { key: "Alanine Aminotransferase", label: "ALT", value: "", normalRange: "7-56 U/L" },
                        { key: "Aspartate Aminotransferase", label: "AST", value: "", normalRange: "5-40 U/L" },
                        { key: "Alkaline Phosphatase", label: "ALP", value: "", normalRange: "44-147 U/L" }
                    ]
                }
            ];

            setTestResults(mockData);
            setLocalTestResults(JSON.parse(JSON.stringify(mockData))); // Create a deep copy for local state
            
            // Reset selected test to first one when data refreshes
            setSelectedTestIndex(0);
        } catch (error) {
            console.error('Error fetching test types: ', error);
        }
    };
    
    useEffect(() => {
        fetchTestResults();
    }, []);

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
        const updatedResults = [...localTestResults];
        updatedResults[selectedTestIndex].testFields[fieldIndex].value = value;
        setLocalTestResults(updatedResults);
    };

    // Extract units from normal range
    const extractUnit = (normalRange) => {
        const matches = normalRange.match(/[^\d.-]+.*$/);
        return matches ? matches[0].trim() : '';
    };

    // Generate random value within normal range
    const generateRandomValue = (normalRange) => {
        const range = normalRange.match(/(\d+(\.\d+)?)-(\d+(\.\d+)?)/);
        if (!range) return "Error";
        
        const lowerBound = parseFloat(range[1]);
        const upperBound = parseFloat(range[3]);
        
        // Generate random value between bounds
        const value = lowerBound + Math.random() * (upperBound - lowerBound);
        
        // Sometimes generate abnormal values (20% chance)
        const abnormalChance = Math.random();
        if (abnormalChance > 0.9) {
            // Value above normal range
            return (upperBound + (Math.random() * upperBound * 0.2)).toFixed(1);
        } else if (abnormalChance > 0.8) {
            // Value below normal range
            return (lowerBound - (Math.random() * lowerBound * 0.2)).toFixed(1);
        }
        
        // Return normal value
        return value.toFixed(1);
    };

    // Simulate medical device measurement
    const startMeasuring = async () => {
        setIsMeasuring(true);
        
        const updatedResults = [...localTestResults];
        const testFields = updatedResults[selectedTestIndex].testFields;
        
        // Simulate measuring each field one by one
        for (let i = 0; i < testFields.length; i++) {
            // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate 1 second per measurement
            
            const field = testFields[i];
            const unit = extractUnit(field.normalRange);
            const value = generateRandomValue(field.normalRange);
            
            testFields[i].value = value;
            
            // Update state to show progress
            setLocalTestResults([...updatedResults]);
        }
        
        setIsMeasuring(false);
    };

    return (
        <BoxContainer className='paraclinicalPatientTestTestingCardBox'>
            <BoxContainerTitle className='paraclinicalPatientTestTestingCard'>
                Patient Testing
            </BoxContainerTitle>

            <BoxContainerContent className='paraclinicalPatientTestTestingCardContent'>
                {/* Choosing Test Type */}
                <DropDownBox
                    options={testOptions}
                    value={selectedTestIndex.toString()}
                    onChange={handleTestChange}
                    disabled={isMeasuring}
                />

                <button 
                    className="startMeasuringButton"
                    onClick={startMeasuring}
                    disabled={isMeasuring}
                >
                    {isMeasuring ? 'Measuring...' : 'Start Measuring'}
                </button>

                {/* Display test fields for input */}
                {localTestResults.length > 0 && localTestResults[selectedTestIndex] && 
                    localTestResults[selectedTestIndex].testFields && 
                    localTestResults[selectedTestIndex].testFields.map((field, index) => {
                    const unit = extractUnit(field.normalRange);
                    return (
                        <div key={index} className="testField">
                            <div className="fieldInfo">
                                <div className="fieldName">
                                    <strong>{field.label}</strong> ({field.key})
                                </div>
                                <div className="fieldRange">
                                    Normal Range: {field.normalRange}
                                </div>
                            </div>
                            <div className="fieldInput">
                                <input
                                    type="text"
                                    value={field.value}
                                    onChange={(e) => handleFieldValueChange(index, e.target.value)}
                                    placeholder={`Enter value ${unit}`}
                                    disabled={isMeasuring}
                                />
                                {unit && <span className="fieldUnit">{unit}</span>}
                            </div>
                        </div>
                    );
                })}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ParaclinicalPatientTestTestingCard;