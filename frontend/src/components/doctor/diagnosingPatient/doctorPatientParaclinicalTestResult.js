import React, { useState, useEffect, useMemo } from 'react';
import './style/doctorPatientParaclinicalTestResult.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';
import DropDownBox from '../../common/dropDownBox';
import LineChartComponent from '../../common/lineChart';

// --- Helper Functions ---

// Generates a single data point for the chart based on the current value
const generateCurrentPointData = (currentValue) => {
    const history = [];
    let numericValue = NaN;
    if (typeof currentValue === 'number' && isFinite(currentValue)) {
        numericValue = currentValue;
    } else if (typeof currentValue === 'string') {
        // Try to extract the first numeric part if it's a string
        const numericMatch = currentValue.match(/^-?[\d.]+/); // Match potential leading number
        if (numericMatch) {
            numericValue = parseFloat(numericMatch[0]);
        }
    }
    // Handle cases where parsing fails or value is not numeric
    if (isNaN(numericValue)) {
        return []; // Return empty array for non-numeric values
    }
    // Create a single data point object for the chart
    history.push({ time: 'Now', value: parseFloat(numericValue.toFixed(2)) });
    return history;
};
// --- End Helper Functions ---

// --- Full grouped_test_options ---
// In a real app, import this from its source file.
const grouped_test_options = {
    'Blood Tests': [
        {
            label: 'Complete Blood Count (CBC)', value: 'cbc', parameters: [
                { name: 'Hemoglobin (Hgb)', label: 'Hgb', unit: 'g/dL', range: { low: 12, high: 18 } },
                { name: 'Hematocrit (Hct)', label: 'Hct', unit: '%', range: { low: 36, high: 50 } },
                { name: 'White Blood Cell Count (WBC)', label: 'WBC', unit: 'cells/mm³', range: { low: 4500, high: 11000 } },
                { name: 'Platelet Count', label: 'PLT', unit: 'cells/mm³', range: { low: 150000, high: 350000 } },
            ]
        },
        {
            label: 'Basic Metabolic Panel (BMP)', value: 'bmp', parameters: [
                { name: 'Blood Urea Nitrogen (BUN)', label: 'BUN', unit: 'mg/dL', range: { low: 8, high: 23 } },
                { name: 'Serum Creatinine', label: 'Creatinine', unit: 'mg/dL', range: { low: 0.6, high: 1.2 } },
                { name: 'Glucose', label: 'Glucose', unit: 'mg/dL', range: { low: 70, high: 110 } },
                { name: 'Calcium', label: 'Calcium', unit: 'mg/dL', range: { low: 8.2, high: 10.2 } },
                { name: 'Sodium', label: 'Sodium', unit: 'mEq/L', range: { low: 135, high: 145 } },
                { name: 'Potassium', label: 'Potassium', unit: 'mEq/L', range: { low: 3.5, high: 5.0 } },
                { name: 'Chloride', label: 'Chloride', unit: 'mEq/L', range: { low: 98, high: 107 } },
                { name: 'Bicarbonate (CO2)', label: 'CO2', unit: 'mEq/L', range: { low: 22, high: 29 } },
            ]
        },
        {
            label: 'Lipid Panel', value: 'lipid_panel', parameters: [
                { name: 'Total Cholesterol', label: 'Total Chol', unit: 'mg/dL', range: { low: 125, high: 200 } },
                { name: 'LDL Cholesterol', label: 'LDL', unit: 'mg/dL', range: { low: 0, high: 130 } },
                { name: 'HDL Cholesterol', label: 'HDL', unit: 'mg/dL', range: { low: 40, high: 60 } },
                { name: 'Triglycerides', label: 'Trig', unit: 'mg/dL', range: { low: 0, high: 150 } },
            ]
        },
        {
            label: 'HbA1c (Diabetes Screen)', value: 'hba1c', parameters: [
                { name: 'Hemoglobin A1c', label: 'HbA1c', unit: '%', range: { low: 4, high: 6 } },
            ]
        },
        {
            label: 'Liver Function Tests (LFTs)', value: 'lft', parameters: [
                { name: 'Alanine Aminotransferase (ALT)', label: 'ALT', unit: 'U/L', range: { low: 10, high: 40 } },
                { name: 'Aspartate Aminotransferase (AST)', label: 'AST', unit: 'U/L', range: { low: 10, high: 30 } },
                { name: 'Alkaline Phosphatase (ALP)', label: 'ALP', unit: 'IU/L', range: { low: 30, high: 120 } },
                { name: 'Total Bilirubin', label: 'TBIL', unit: 'mg/dL', range: { low: 0.3, high: 1.2 } },
                { name: 'Direct Bilirubin', label: 'DBIL', unit: 'mg/dL', range: { low: 0.1, high: 0.3 } },
                { name: 'Albumin', label: 'Albumin', unit: 'g/dL', range: { low: 3.5, high: 5.0 } },
            ]
        },
        {
            label: 'C-Reactive Protein (CRP)', value: 'crp', parameters: [
                { name: 'CRP', label: 'CRP', unit: 'mg/L', range: { low: 0.08, high: 3.1 } },
            ]
        },
        {
            label: 'Ferritin', value: 'ferritin', parameters: [
                { name: 'Ferritin', label: 'Ferritin', unit: 'ng/mL', range: { low: 15, high: 200 } },
            ]
        },
    ],
    'Urine & Stool Tests': [
        {
            label: 'Urinalysis (UA)', value: 'urinalysis', parameters: [
                { name: 'Protein', label: 'Protein', unit: 'mg/dL', range: { low: 0, high: 15 } },
                { name: 'Glucose', label: 'Glucose', unit: 'mg/dL', range: { low: 0, high: 15 } },
                { name: 'Ketones', label: 'Ketones', unit: 'mg/dL', range: { low: 0, high: 5 } },
                // Ensure unit is 'presence' for positive/negative types
                { name: 'Blood', label: 'Blood', unit: 'presence', range: { low: 'negative', high: 'negative' } },
            ]
        },
        {
            label: 'Urine Culture', value: 'urine_culture', parameters: [
                { name: 'Bacterial Growth', label: 'Growth', unit: 'CFU/mL', range: { low: 0, high: 10000 } },
                { name: 'Pathogen Identified', label: 'Pathogen', unit: 'string', range: {} },
            ]
        },
        {
            label: 'Stool Occult Blood Test', value: 'stool_occult', parameters: [
                // Ensure unit is 'presence'
                { name: 'Occult Blood', label: 'Occult Blood', unit: 'presence', range: { low: 'negative', high: 'negative' } },
            ]
        },
        {
            label: 'Stool Culture', value: 'stool_culture', parameters: [
                { name: 'Pathogen Identified', label: 'Pathogen', unit: 'string', range: {} },
            ]
        },
    ],
    'Imaging': [
        {
            label: 'X-Ray', value: 'xray', parameters: [
                { name: 'Findings', label: 'Findings', unit: 'string' },
            ]
        },
        {
            label: 'Magnetic Resonance Imaging (MRI)', value: 'mri', parameters: [
                { name: 'Findings', label: 'Findings', unit: 'string' },
            ]
        },
        {
            label: 'Computed Tomography (CT) Scan', value: 'ct', parameters: [
                { name: 'Findings', label: 'Findings', unit: 'string' },
            ]
        },
        {
            label: 'Ultrasound', value: 'ultrasound', parameters: [
                { name: 'Findings', label: 'Findings', unit: 'string' },
            ]
        },
        {
            label: 'Positron Emission Tomography (PET)', value: 'pet', parameters: [
                { name: 'Findings', label: 'Findings', unit: 'string' },
            ]
        },
        {
            label: 'Optical Coherence Tomography (OCT)', value: 'oct', parameters: [
                { name: 'Retinal Nerve Fiber Layer Thickness', label: 'RNFL', unit: 'µm', range: { low: 80, high: 110 } },
            ]
        },
    ],
    'Cardiac Tests': [
        {
            label: 'Electrocardiogram (ECG/EKG)', value: 'ecg', parameters: [
                { name: 'Heart Rate', label: 'HR', unit: 'bpm', range: { low: 60, high: 100 } },
                { name: 'PR Interval', label: 'PR', unit: 'ms', range: { low: 120, high: 200 } },
                { name: 'QRS Duration', label: 'QRS', unit: 'ms', range: { low: 80, high: 120 } },
            ]
        },
        {
            label: 'Echocardiogram', value: 'echocardiogram', parameters: [
                { name: 'Ejection Fraction', label: 'EF', unit: '%', range: { low: 55, high: 70 } },
                { name: 'Left Ventricular Size', label: 'LV Size', unit: 'cm', range: { low: 3.5, high: 5.7 } },
            ]
        },
        {
            label: 'Stress Test', value: 'stress_test', parameters: [
                { name: 'Exercise Duration', label: 'Duration', unit: 'minutes' },
                { name: 'Max Heart Rate Achieved', label: 'Max HR', unit: 'bpm' },
            ]
        },
    ],
    'Neurological & Specialized Tests': [
        {
            label: 'Evoked Potentials', value: 'evoked_potentials', parameters: [
                { name: 'Visual Evoked Potential Latency', label: 'VEP Latency', unit: 'ms', range: { low: 90, high: 110 } },
                { name: 'Somatosensory Evoked Potential Latency', label: 'SSEP Latency', unit: 'ms' },
            ]
        },
        {
            label: 'Cerebrospinal Fluid (CSF) Analysis', value: 'csf_analysis', parameters: [
                { name: 'White Blood Cell Count', label: 'WBC (CSF)', unit: 'cells/mm³', range: { low: 0, high: 5 } },
                { name: 'Protein', label: 'Protein (CSF)', unit: 'mg/dL', range: { low: 15, high: 45 } },
                { name: 'Glucose', label: 'Glucose (CSF)', unit: 'mg/dL', range: { low: 50, high: 80 } },
                { name: 'Oligoclonal Bands', label: 'Oligo Bands', unit: 'presence', range: { low: 'negative', high: 'negative' } },
            ]
        },
        {
            label: 'Biopsy', value: 'biopsy', parameters: [
                { name: 'Histopathological Findings', label: 'Findings', unit: 'string' },
            ]
        },
        {
            label: 'Enzyme-linked Immunosorbent Assay (ELISA)', value: 'elisa', parameters: [
                { name: 'Antibody Level', label: 'Antibody Lvl', unit: 'IU/mL' },
            ]
        },
    ],
    'Other Specialized Tests': [
        {
            label: 'Allergy Panel (IgE)', value: 'allergy_panel', parameters: [
                { name: 'Total IgE', label: 'Total IgE', unit: 'IU/mL', range: { low: 0, high: 100 } },
                { name: 'Specific IgE', label: 'Specific IgE', unit: 'IU/mL' },
            ]
        },
        {
            label: 'Genetic Screening', value: 'genetic_screening', parameters: [
                { name: 'Mutation Detected', label: 'Mutation', unit: 'string' },
            ]
        },
        {
            label: 'Pulmonary Function Tests (PFTs)', value: 'pfts', parameters: [
                { name: 'Forced Vital Capacity (FVC)', label: 'FVC', unit: 'L', range: { low: 3.0, high: 5.0 } },
                { name: 'Forced Expiratory Volume in 1 second (FEV1)', label: 'FEV1', unit: 'L', range: { low: 2.5, high: 4.0 } },
                { name: 'FEV1/FVC Ratio', label: 'FEV1/FVC', unit: '%', range: { low: 70, high: 85 } },
            ]
        },
    ],
};
// --- End grouped_test_options ---


function DoctorPatientParaclinicalTestResult() {
    // --- Helper: Create a lookup map for test parameters (label, unit, range) ---
    const parameterDetailsMap = useMemo(() => {
        const map = new Map();
        Object.values(grouped_test_options).forEach(category => {
            category.forEach(test => {
                if (test.parameters) {
                    test.parameters.forEach(param => {
                        // Key: param.name (matches API 'name' field)
                        // Value: { label, unit, range }
                        map.set(param.name, {
                            label: param.label || param.name, // Use specific label or fallback to name
                            unit: param.unit || '',
                            range: param.range || { low: null, high: null }
                        });
                    });
                }
            });
        });
        return map;
    }, []); // Calculate only once as grouped_test_options is constant

    const [patientTestResults, setTestResults] = useState([]);
    const [selectedTestIndex, setSelectedTestIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Process the raw test results using useMemo for optimization
    const processedTestResults = useMemo(() => {
        return patientTestResults.map(test => ({
            ...test, // Keep original test data (testName, dateTime)
            testFields: test.testFields.map(field => {
                // Look up label, unit, and range from the map using field.name
                // console.log("API Field Name:", field.name);
                const details = parameterDetailsMap.get(field.name) || { label: field.name, unit: '', range: { low: null, high: null } }; // Fallback if name not found
                // console.log("Mapped Details:", details);
                const label = details.label;
                const unit = details.unit;
                let safeRange = details.range; // Use let as it might be modified for presence chart
                let isNumeric = typeof safeRange.low === 'number' && typeof safeRange.high === 'number';
                let chartData = [];
                let chartValue = field.value; // Default to original value

                // --- Modification for presence tests ---
                if (unit === 'presence') {
                    isNumeric = true; // Treat as numeric for charting
                    // Convert positive/negative to 1/0 for chart data
                    chartValue = String(field.value).toLowerCase() === 'positive' ? 1 : 0;
                    // Generate chart data using the numeric value (0 or 1)
                    chartData = generateCurrentPointData(chartValue);
                    // Adjust safeRange for chart display (optional, but helps ReferenceArea)
                    // safeRange = { low: 0, high: 0 }; // Treat 'negative' (0) as the safe range
                } else if (isNumeric) {
                    // Generate chart data for standard numeric fields
                    chartData = generateCurrentPointData(field.value);
                }
                // --- End Modification ---

                return {
                    name: field.name, // Keep original name from API
                    value: field.value, // Keep original value (e.g., "positive") for text display
                    label: label, // Use looked-up label
                    chartData: chartData, // Use potentially modified chart data
                    safeRange: safeRange, // Use original or modified safe range
                    unit: unit, // Use the looked-up unit
                    isNumeric: isNumeric // Use potentially modified isNumeric flag
                };
            })
        }));
    }, [patientTestResults]); // Dependency: only raw results (map is stable)

    // Function to fetch test results data (currently uses mock data)
    const fetchTestResults = async () => {
        try {
            setIsLoading(true);
            // Mock data simulating API response - NOW ONLY CONTAINS name and value
            const mockData = [
                {
                    testName: "Complete Blood Count", // Test panel name (from API or derived)
                    dateTime: "2023-03-29 09:15 AM",
                    testFields: [
                        // API only sends name and value
                        { name: "Hemoglobin (Hgb)", value: 11.5 }, // Example: Low
                        { name: "Hematocrit (Hct)", value: 45 },
                        { name: "White Blood Cell Count (WBC)", value: 13500 }, // Example: High
                        { name: "Platelet Count", value: 140000 }, // Example: Low
                    ]
                },
                {
                    testName: "Liver Function Test",
                    dateTime: "2023-03-28 02:30 PM",
                    testFields: [
                        { name: "Alanine Aminotransferase (ALT)", value: 35 },
                        { name: "Aspartate Aminotransferase (AST)", value: 25 },
                        { name: "Alkaline Phosphatase (ALP)", value: 130 }, // Example: High
                        { name: "Total Bilirubin", value: 0.9 },
                        { name: "Direct Bilirubin", value: 0.2 },
                        { name: "Albumin", value: 4.0 },
                    ]
                },
                {
                    testName: "Urinalysis (UA)",
                    dateTime: "2023-03-29 10:00 AM",
                    testFields: [
                        { name: 'Protein', value: 5 },
                        { name: 'Glucose', value: 0 },
                        { name: 'Ketones', value: 0 },
                        { name: 'Blood', value: 'positive' }, // Non-numeric value
                    ]
                }
            ];

            // Simulate network delay
            setTimeout(() => {
                setTestResults(mockData);
                setSelectedTestIndex(0);
                setIsLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error fetching test results:', error);
            setIsLoading(false);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchTestResults();
    }, []);

    // Generate options for the dropdown based on the raw patientTestResults
    const testOptions = patientTestResults.map((test, index) => ({
        label: `${test.testName} - ${test.dateTime}`,
        value: index.toString()
    }));

    // Handler for when the dropdown selection changes
    const handleTestChange = (e) => {
        setSelectedTestIndex(parseInt(e.target.value, 10));
    };

    // Get the currently selected processed test data based on selectedTestIndex
    const selectedTestData = processedTestResults.length > selectedTestIndex ? processedTestResults[selectedTestIndex] : null;

    return (
        <BoxContainer className='doctorPatientParaclinicalTestResultBox'>
            <BoxContainerTitle className='doctorPatientParaclinicalTestResult'>
                Patient's Paraclinical Test Results
                {isLoading && <span className="loading-indicator"> Loading...</span>}
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPatientParaclinicalTestResultContent'>
                {processedTestResults.length > 0 && selectedTestData ? (
                    <>
                        <DropDownBox
                            options={testOptions}
                            value={selectedTestIndex.toString()}
                            onChange={handleTestChange}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'auto', marginTop: '10px', marginBottom: '10px' }}>
                            <h3>{selectedTestData.testName}</h3>
                            <span className="testDateTime">{selectedTestData.dateTime}</span>
                        </div>

                        <div className="paraclinical-charts-grid">
                            {selectedTestData.testFields.map((field, fieldIndex) => {
                                console.log("Field Name:", field.name);
                                // Construct display range string based on looked-up type
                                let displayRange = 'N/A';
                                // Use original logic for display range text
                                if (typeof field.safeRange.low === 'number' && typeof field.safeRange.high === 'number') {
                                    displayRange = `${field.safeRange.low} - ${field.safeRange.high} ${field.unit}`;
                                } else if (field.safeRange?.low === 'negative' && field.safeRange?.high === 'negative') {
                                    displayRange = 'Negative'; // Display 'Negative' for presence tests
                                } else if (field.unit === 'string') {
                                    displayRange = 'Textual Description';
                                } else if (field.unit) {
                                    displayRange = `(${field.unit})`;
                                }

                                // --- Determine Y-axis limits for presence charts ---
                                const isPresenceTest = field.unit === 'presence';
                                const yAxisMin = isPresenceTest ? 0 : undefined; // Use default if not presence
                                const yAxisMax = isPresenceTest ? 1 : undefined; // Use default if not presence, add buffer
                                // --- End Y-axis limits ---

                                return (
                                    <div key={fieldIndex} className="paraclinical-chart-container">
                                        {/* Use looked-up label for display */}
                                        <h4 className="paraclinical-chart-title">{field.label} ({field.name})</h4>
                                        {/* Render chart if isNumeric is true (now includes presence tests) */}
                                        {field.isNumeric && field.chartData.length > 0 ? (
                                            <div style={{ height: '200px', width: '100%' }}>
                                                <LineChartComponent
                                                    data={field.chartData}
                                                    dataKeys={['value']}
                                                    // Unit display might be confusing for 0/1, maybe hide it?
                                                    unit={isPresenceTest ? '' : field.unit} // Hide unit for presence
                                                    safeRange={isPresenceTest ? { low: 0, high: 0 } : { low: field.safeRange.low, high: field.safeRange.high } } // Set safe range to 0 for presence chart areas
                                                    chartName={field.label} // Use looked-up label
                                                    height={200}
                                                    medianOrNot={false} // Only one data point, median not applicable
                                                    // --- Pass specific Y-axis limits ---
                                                    yMin={yAxisMin}
                                                    yMax={yAxisMax}
                                                    // Use the specific condition based on field.value
                                                    noZone={isPresenceTest} // Only one data point, median not applicable
                                                    // --- End Pass Y-axis limits ---
                                                />
                                            </div>
                                        ) : (
                                            // This part should now only render for truly non-numeric/non-presence fields (like 'Findings')
                                            <div className="non-numeric-value">
                                                Result: <span className={`value-${String(field.value).toLowerCase()}`}>{field.value}</span>
                                                {/* Example styling: Add CSS for .value-positive, .value-negative */}
                                            </div>
                                        )}
                                        <div className="paraclinical-chart-info">
                                            {/* Display original value ("positive"/"negative") */}
                                            <span>Current: {field.value}{field.isNumeric && !isPresenceTest ? ` ${field.unit}` : ''}</span>
                                            {/* Display range textually */}
                                            <span>Normal Range: {displayRange}</span>
                                        </div>
                                    </div>
                                );
                            })}
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