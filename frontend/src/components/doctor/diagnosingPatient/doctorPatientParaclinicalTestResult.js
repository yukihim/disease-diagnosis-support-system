import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Cookies from 'js-cookie'; // Import Cookies
import './style/doctorPatientParaclinicalTestResult.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';
import DropDownBox from '../../common/dropDownBox';
import LineChartComponent from '../../common/lineChart';
import HuggedText from '../../common/huggedText';

// --- Constants ---
const API_BASE_URL = 'http://localhost:5001'; // Define your API base URL

// --- Helper Functions ---

// Parses the numeric value from the API string (e.g., "14.5 g/dL" -> 14.5)
// Handles "Negative", "Positive" as strings for direct display but allows charting logic to convert later.
const parseNumericValue = (apiValueString) => {
    if (typeof apiValueString !== 'string') {
        return apiValueString; // Return as is if not a string (e.g., already a number)
    }
    const lowerCaseValue = apiValueString.toLowerCase();
    if (lowerCaseValue === 'negative' || lowerCaseValue === 'positive') {
        return apiValueString; // Keep as string for display, chart logic handles conversion
    }
    // Try to parse a float from the beginning of the string
    const numericMatch = apiValueString.match(/^-?[\d.]+/);
    if (numericMatch) {
        const num = parseFloat(numericMatch[0]);
        return isNaN(num) ? apiValueString : num; // Return number if valid, else original string
    }
    return apiValueString; // Return original string if no number found
};


// Generates a single data point for the chart based on a numeric value
const generateCurrentPointData = (numericValue) => {
    if (typeof numericValue !== 'number' || !isFinite(numericValue)) {
        return []; // Return empty array for non-numeric values
    }
    // Create a single data point object for the chart
    return [{ time: 'Now', value: parseFloat(numericValue.toFixed(2)) }];
};

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
    const location = useLocation(); // Use location to get sessionID
    const sessionID = location.state?.sessionID; // Get sessionID from location state

    // --- State ---
    const [rawTestResults, setRawTestResults] = useState([]); // Store raw API response
    const [selectedTestIndex, setSelectedTestIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Helper: Create a lookup map from grouped_test_options ---
    const parameterDetailsMap = useMemo(() => {
        const map = new Map();
        Object.values(grouped_test_options).forEach(category => {
            category.forEach(test => {
                if (test.parameters) {
                    test.parameters.forEach(param => {
                        // Key: param.name (MUST match API 'name' field)
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
    }, []); // Calculate only once

    // --- Data Fetching ---
    const fetchTestResults = useCallback(async () => {
        if (!sessionID) {
            setError("Session ID not provided. Cannot fetch test results.");
            setRawTestResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        const token = Cookies.get('token');
        if (!token) {
            setError("User not authenticated.");
            setIsLoading(false);
            return;
        }

        try {
            const apiUrl = `${API_BASE_URL}/doctor/diagnosis/test_results/${sessionID}`;
            // console.log("PATIENT TEST RESULTS _ Fetching from:", apiUrl);
            const response = await fetch(apiUrl, {
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
            // console.log("PATIENT TEST RESULTS _ Received data:", data);
            setRawTestResults(data.testResults || []); // Store the raw results
            setSelectedTestIndex(0); // Reset selection to the first test

        } catch (err) {
            console.error('Error fetching test results:', err);
            setError(err.message || 'Failed to fetch test results.');
            setRawTestResults([]);
        } finally {
            setIsLoading(false);
        }
    }, [sessionID]); // Dependency: fetch when sessionID changes

    // Fetch data when the component mounts or sessionID changes
    useEffect(() => {
        fetchTestResults();
    }, [fetchTestResults]); // Use the useCallback dependency

    // --- Data Processing ---
    const processedTestResults = useMemo(() => {
        // console.log("Processing raw results:", rawTestResults);
        return rawTestResults.map(test => {
            // Map API structure to the structure expected by the rendering logic
            const testFields = test.parameters.map(param => {
                // param = { name: "Hemoglobin", value: "14.5 g/dL" }

                // 1. Lookup details using the exact API name
                const details = parameterDetailsMap.get(param.name) || { label: param.name, unit: '', range: { low: null, high: null } };
                const { label, unit, range: safeRange } = details;

                // 2. Store the original API value for display
                const originalValue = param.value;

                // 3. Parse the numeric value (if possible) from the original string
                const parsedValue = parseNumericValue(originalValue);

                // 4. Determine if the value can be charted
                // Chartable if it's a number OR if the unit indicates presence/absence
                const isChartable = typeof parsedValue === 'number' || unit === 'presence';

                // 5. Prepare chart data
                let chartData = [];
                let chartValueForPoint = NaN;

                if (unit === 'presence') {
                    // Convert "Positive"/"Negative" to 1/0 for charting
                    chartValueForPoint = String(originalValue).toLowerCase() === 'positive' ? 1 : 0;
                    chartData = generateCurrentPointData(chartValueForPoint);
                } else if (typeof parsedValue === 'number') {
                    chartValueForPoint = parsedValue;
                    chartData = generateCurrentPointData(chartValueForPoint);
                }

                // 6. Determine safe range for the chart's ReferenceArea
                let chartSafeRange = { low: safeRange.low, high: safeRange.high };
                if (unit === 'presence') {
                    // For presence charts (0 or 1), define the "safe" area as 0 (Negative)
                    chartSafeRange = { low: 0, high: 0 };
                }


                return {
                    name: param.name,       // Original API name (used as key)
                    value: originalValue,   // Original API value string (for display)
                    parsedValue: parsedValue, // Parsed numeric value or original string
                    label: label,           // Looked-up label for display
                    unit: unit,             // Looked-up unit
                    safeRange: safeRange,   // Looked-up original safe range (for text display)
                    chartSafeRange: chartSafeRange, // Safe range specifically for chart area
                    isChartable: isChartable, // Can this be put on the chart?
                    chartData: chartData,   // Data points for the chart
                };
            });

            return {
                // Keep structure similar to original mock data for compatibility
                testName: test.testType, // Use testType from API
                dateTime: test.timeMeasured, // Use timeMeasured from API
                testFields: testFields, // The processed parameters
            };
        });
    }, [rawTestResults, parameterDetailsMap]); // Dependencies: raw data and the lookup map

    // --- Event Handlers ---
    const handleTestChange = (e) => {
        setSelectedTestIndex(parseInt(e.target.value, 10));
    };

    // --- Derived State ---
    // Generate options for the dropdown based on the processed results
    const testOptions = processedTestResults.map((test, index) => ({
        label: `${test.testName} - ${test.dateTime}`,
        value: index.toString()
    }));

    // Get the currently selected processed test data
    const selectedTestData = processedTestResults.length > selectedTestIndex ? processedTestResults[selectedTestIndex] : null;

    // --- Rendering ---
    return (
        <BoxContainer className='doctorPatientParaclinicalTestResultBox'>
            <BoxContainerTitle className='doctorPatientParaclinicalTestResult'>
                Patient's Paraclinical Test Results
                {isLoading && <span className="loading-indicator"> Loading...</span>}
                {error && <span className="error-message"> Error: {error}</span>}
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPatientParaclinicalTestResultContent'>
                {!isLoading && !error && processedTestResults.length === 0 && (
                    <div className="no-data">No data</div> // Show only if no error
                )}
                {processedTestResults.length > 0 && selectedTestData ? (
                    <>
                        <DropDownBox
                            options={testOptions}
                            value={selectedTestIndex.toString()}
                            onChange={handleTestChange}
                        />

                        <div className="paraclinicalChartsGrid">
                            {selectedTestData.testFields.map((field, fieldIndex) => {
                                // Construct display range string
                                let displayRange = 'N/A';
                                if (typeof field.safeRange.low === 'number' && typeof field.safeRange.high === 'number') {
                                    displayRange = `${field.safeRange.low} - ${field.safeRange.high}${field.unit ? ` ${field.unit}` : ''}`;
                                } else if (field.safeRange?.low === 'negative' && field.safeRange?.high === 'negative') {
                                    displayRange = 'Negative';
                                } else if (field.unit === 'string') {
                                    displayRange = 'Textual Description';
                                } else if (field.unit) {
                                    displayRange = `(${field.unit})`; // Fallback if range is weird but unit exists
                                }

                                // Determine Y-axis limits for presence charts (0 to 1)
                                const isPresenceTest = field.unit === 'presence';
                                const yAxisMin = isPresenceTest ? -0.1 : undefined; // Add slight buffer below 0
                                const yAxisMax = isPresenceTest ? 1.1 : undefined; // Add slight buffer above 1

                                const displayLabel = `${field.label} (${field.name})`;

                                return (
                                    <div key={fieldIndex} className="paraclinicalChartContainer">
                                        <HuggedText text={displayLabel} font_size="14px" font_weight="600" color="#4E4B66" />

                                        {/* Render chart if chartable */}
                                        {field.isChartable && field.chartData.length > 0 ? (
                                            <div style={{ height: '200px', width: '100%' }}>
                                                <LineChartComponent
                                                    data={field.chartData}
                                                    dataKeys={['value']}
                                                    unit={isPresenceTest ? '' : field.unit} // Hide unit for presence chart (0/1)
                                                    safeRange={field.chartSafeRange} // Use the specific range for chart area
                                                    chartName={field.label}
                                                    height={200}
                                                    medianOrNot={false} // Only one data point
                                                    yMin={yAxisMin}
                                                    yMax={yAxisMax}
                                                    // Only show zones if it's NOT a presence test (avoids red/green for 0/1)
                                                    noZone={isPresenceTest}
                                                />
                                            </div>
                                        ) : (
                                            // Display non-chartable values directly
                                            <div className="nonNumericValue">
                                                Result: <span className={`value-${String(field.value).toLowerCase()}`}>{field.value}</span>
                                            </div>
                                        )}
                                        <div className="paraclinicalChartInfo">
                                            {/* Display original value string */}
                                            <span>Current: {field.value}</span>
                                            {/* Display range textually */}
                                            <span>Normal Range: {displayRange}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    // Only show this if not loading, no error, and length > 0 but selectedTestData is null (shouldn't happen)
                    !isLoading && !error && processedTestResults.length > 0 && <div className="no-results">Select a test to view results.</div>
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPatientParaclinicalTestResult;