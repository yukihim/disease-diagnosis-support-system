import React from 'react';
import './style/doctorSendPatientForTestTestType.css'; // Assuming you'll update this CSS

import HuggedText from '../../../common/huggedText';

// Define test options grouped by category with detailed parameters
const grouped_test_options = {
    'Blood Tests': [
        {
            label: 'Complete Blood Count (CBC)',
            value: 'cbc',
            parameters: [
                { name: 'Hemoglobin (Hgb)', unit: 'g/dL', range: { low: 12, high: 18 }, example: 14.5 },
                { name: 'Hematocrit (Hct)', unit: '%', range: { low: 36, high: 50 }, example: 42 },
                { name: 'White Blood Cell Count (WBC)', unit: 'cells/mm³', range: { low: 4500, high: 11000 }, example: 7000 },
                { name: 'Platelet Count', unit: 'cells/mm³', range: { low: 150000, high: 350000 }, example: 250000 },
            ],
        },
        {
            label: 'Basic Metabolic Panel (BMP)',
            value: 'bmp',
            parameters: [
                { name: 'Blood Urea Nitrogen (BUN)', unit: 'mg/dL', range: { low: 8, high: 23 }, example: 15 },
                { name: 'Serum Creatinine', unit: 'mg/dL', range: { low: 0.6, high: 1.2 }, example: 1.0 },
                { name: 'Glucose', unit: 'mg/dL', range: { low: 70, high: 110 }, example: 90 },
                { name: 'Calcium', unit: 'mg/dL', range: { low: 8.2, high: 10.2 }, example: 9.5 },
                { name: 'Sodium', unit: 'mEq/L', range: { low: 135, high: 145 }, example: 140 },
                { name: 'Potassium', unit: 'mEq/L', range: { low: 3.5, high: 5.0 }, example: 4.2 },
                { name: 'Chloride', unit: 'mEq/L', range: { low: 98, high: 107 }, example: 102 },
                { name: 'Bicarbonate (CO2)', unit: 'mEq/L', range: { low: 22, high: 29 }, example: 25 },
            ],
        },
        {
            label: 'Lipid Panel',
            value: 'lipid_panel',
            parameters: [
                { name: 'Total Cholesterol', unit: 'mg/dL', range: { low: 125, high: 200 }, example: 180 },
                { name: 'LDL Cholesterol', unit: 'mg/dL', range: { low: 0, high: 130 }, example: 100 },
                { name: 'HDL Cholesterol', unit: 'mg/dL', range: { low: 40, high: 60 }, example: 50 },
                { name: 'Triglycerides', unit: 'mg/dL', range: { low: 0, high: 150 }, example: 120 },
            ],
        },
        {
            label: 'HbA1c (Diabetes Screen)',
            value: 'hba1c',
            parameters: [
                { name: 'Hemoglobin A1c', unit: '%', range: { low: 4, high: 6 }, example: 5.5 },
            ],
        },
        {
            label: 'Liver Function Tests (LFTs)',
            value: 'lft',
            parameters: [
                { name: 'Alanine Aminotransferase (ALT)', unit: 'U/L', range: { low: 10, high: 40 }, example: 25 },
                { name: 'Aspartate Aminotransferase (AST)', unit: 'U/L', range: { low: 10, high: 30 }, example: 20 },
                { name: 'Alkaline Phosphatase (ALP)', unit: 'IU/L', range: { low: 30, high: 120 }, example: 80 },
                { name: 'Total Bilirubin', unit: 'mg/dL', range: { low: 0.3, high: 1.2 }, example: 0.8 },
                { name: 'Direct Bilirubin', unit: 'mg/dL', range: { low: 0.1, high: 0.3 }, example: 0.2 },
                { name: 'Albumin', unit: 'g/dL', range: { low: 3.5, high: 5.0 }, example: 4.2 },
            ],
        },
        {
            label: 'C-Reactive Protein (CRP)',
            value: 'crp',
            parameters: [
                { name: 'CRP', unit: 'mg/L', range: { low: 0.08, high: 3.1 }, example: 1.5 },
            ],
        },
        {
            label: 'Ferritin',
            value: 'ferritin',
            parameters: [
                { name: 'Ferritin', unit: 'ng/mL', range: { low: 15, high: 200 }, example: 100 },
            ],
        },
    ],

    'Urine & Stool Tests': [
        {
            label: 'Urinalysis (UA)',
            value: 'urinalysis',
            parameters: [
                { name: 'Protein', unit: 'mg/dL', range: { low: 0, high: 15 }, example: 5 },
                { name: 'Glucose', unit: 'mg/dL', range: { low: 0, high: 15 }, example: 0 },
                { name: 'Ketones', unit: 'mg/dL', range: { low: 0, high: 5 }, example: 0 },
                { name: 'Blood', unit: 'presence', range: { low: 'negative', high: 'negative' }, example: 'negative' },
            ],
        },
        {
            label: 'Urine Culture',
            value: 'urine_culture',
            parameters: [
                { name: 'Bacterial Growth', unit: 'CFU/mL', range: { low: 0, high: 10000 }, example: 0 },
                { name: 'Pathogen Identified', unit: 'string', range: {}, example: 'None' },
            ],
        },
        {
            label: 'Stool Occult Blood Test',
            value: 'stool_occult',
            parameters: [
                { name: 'Occult Blood', unit: 'presence', range: { low: 'negative', high: 'negative' }, example: 'negative' },
            ],
        },
        {
            label: 'Stool Culture',
            value: 'stool_culture',
            parameters: [
                { name: 'Pathogen Identified', unit: 'string', range: {}, example: 'None' },
            ],
        },
    ],

    'Imaging': [
        {
            label: 'X-Ray',
            value: 'xray',
            parameters: [
                { name: 'Findings', unit: 'string', example: 'No fractures or abnormalities detected' },
            ],
        },
        {
            label: 'Magnetic Resonance Imaging (MRI)',
            value: 'mri',
            parameters: [
                { name: 'Findings', unit: 'string', example: 'Multiple demyelinating plaques in periventricular white matter' },
            ],
        },
        {
            label: 'Computed Tomography (CT) Scan',
            value: 'ct',
            parameters: [
                { name: 'Findings', unit: 'string', example: 'No acute intracranial hemorrhage' },
            ],
        },
        {
            label: 'Ultrasound',
            value: 'ultrasound',
            parameters: [
                { name: 'Findings', unit: 'string', example: 'Normal liver size and echotexture' },
            ],
        },
        {
            label: 'Positron Emission Tomography (PET)',
            value: 'pet',
            parameters: [
                { name: 'Findings', unit: 'string', example: 'Increased uptake in mediastinal lymph nodes' },
            ],
        },
        {
            label: 'Optical Coherence Tomography (OCT)',
            value: 'oct',
            parameters: [
                { name: 'Retinal Nerve Fiber Layer Thickness', unit: 'µm', range: { low: 80, high: 110 }, example: 95 },
            ],
        },
    ],

    'Cardiac Tests': [
        {
            label: 'Electrocardiogram (ECG/EKG)',
            value: 'ecg',
            parameters: [
                { name: 'Heart Rate', unit: 'bpm', range: { low: 60, high: 100 }, example: 72 },
                { name: 'PR Interval', unit: 'ms', range: { low: 120, high: 200 }, example: 160 },
                { name: 'QRS Duration', unit: 'ms', range: { low: 80, high: 120 }, example: 90 },
            ],
        },
        {
            label: 'Echocardiogram',
            value: 'echocardiogram',
            parameters: [
                { name: 'Ejection Fraction', unit: '%', range: { low: 55, high: 70 }, example: 60 },
                { name: 'Left Ventricular Size', unit: 'cm', range: { low: 3.5, high: 5.7 }, example: 4.8 },
            ],
        },
        {
            label: 'Stress Test',
            value: 'stress_test',
            parameters: [
                { name: 'Exercise Duration', unit: 'minutes', example: 10 },
                { name: 'Max Heart Rate Achieved', unit: 'bpm', example: 160 },
            ],
        },
    ],

    'Neurological & Specialized Tests': [
        {
            label: 'Evoked Potentials',
            value: 'evoked_potentials',
            parameters: [
                { name: 'Visual Evoked Potential Latency', unit: 'ms', range: { low: 90, high: 110 }, example: 105 },
                { name: 'Somatosensory Evoked Potential Latency', unit: 'ms', example: 35 },
            ],
        },
        {
            label: 'Cerebrospinal Fluid (CSF) Analysis',
            value: 'csf_analysis',
            parameters: [
                { name: 'White Blood Cell Count', unit: 'cells/mm³', range: { low: 0, high: 5 }, example: 2 },
                { name: 'Protein', unit: 'mg/dL', range: { low: 15, high: 45 }, example: 30 },
                { name: 'Glucose', unit: 'mg/dL', range: { low: 50, high: 80 }, example: 65 },
                { name: 'Oligoclonal Bands', unit: 'presence', range: { low: 'negative', high: 'negative' }, example: 'positive' },
            ],
        },
        {
            label: 'Biopsy',
            value: 'biopsy',
            parameters: [
                { name: 'Histopathological Findings', unit: 'string', example: 'Granulomatous inflammation' },
            ],
        },
        {
            label: 'Enzyme-linked Immunosorbent Assay (ELISA)',
            value: 'elisa',
            parameters: [
                { name: 'Antibody Level', unit: 'IU/mL', example: 120 },
            ],
        },
    ],

    'Other Specialized Tests': [
        {
            label: 'Allergy Panel (IgE)',
            value: 'allergy_panel',
            parameters: [
                { name: 'Total IgE', unit: 'IU/mL', range: { low: 0, high: 100 }, example: 50 },
                { name: 'Specific IgE', unit: 'IU/mL', example: 10 },
            ],
        },
        {
            label: 'Genetic Screening',
            value: 'genetic_screening',
            parameters: [
                { name: 'Mutation Detected', unit: 'string', example: 'BRCA1 positive' },
            ],
        },
        {
            label: 'Pulmonary Function Tests (PFTs)',
            value: 'pfts',
            parameters: [
                { name: 'Forced Vital Capacity (FVC)', unit: 'L', range: { low: 3.0, high: 5.0 }, example: 4.2 },
                { name: 'Forced Expiratory Volume in 1 second (FEV1)', unit: 'L', range: { low: 2.5, high: 4.0 }, example: 3.5 },
                { name: 'FEV1/FVC Ratio', unit: '%', range: { low: 70, high: 85 }, example: 82 },
            ],
        },
    ],
};


// Helper function to get all test options in a flat structure for easier lookup
const getAllTestOptionsFlat = () => {
    const options = [];
    Object.values(grouped_test_options).forEach(categoryTests => {
        options.push(...categoryTests);
    });
    return options;
};
const allTestOptionsFlat = getAllTestOptionsFlat();

function DoctorSendPatientForTestTestType() {
    const [selectedTestValues, setSelectedTestValues] = React.useState([]);

    const handleTestTypeToggle = (value) => {
        setSelectedTestValues(prevSelected => {
            if (prevSelected.includes(value)) {
                // Remove if already selected
                return prevSelected.filter(item => item !== value);
            } else {
                // Add if not selected
                return [...prevSelected, value];
            }
        });
    };

    // Get the labels of the selected tests
    const selectedTestLabels = selectedTestValues
        .map(value => {
            const foundOption = allTestOptionsFlat.find(option => option.value === value);
            return foundOption ? foundOption.label : null; // Find the label corresponding to the value
        })
        .filter(label => label !== null); // Filter out any potential nulls if a value wasn't found (shouldn't happen with this setup)

    return (
        <div className="test-type-selection-grouped">
            <HuggedText text="Select Test Types:" font_size="16px" font_weight="700" color="#000000" margin_bottom="15px" />

            <div className="test-groups-container">
                {Object.entries(grouped_test_options).map(([categoryName, tests]) => (
                    <div key={categoryName} className="test-group-column">
                        <HuggedText text={categoryName} font_size="14px" font_weight="600" color="#333333" margin_bottom="10px" />
                        <div className="test-options-list">
                            {tests.map((option) => (
                                <div key={option.value} className="test-option-item">
                                    <input
                                        type="checkbox"
                                        id={`test-${option.value}`}
                                        value={option.value} // value attribute is good practice
                                        checked={selectedTestValues.includes(option.value)}
                                        onChange={() => handleTestTypeToggle(option.value)}
                                    />
                                    <label htmlFor={`test-${option.value}`}>{option.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedTestLabels.length > 0 && (
                <div className="selected-tests-display">
                    <HuggedText text="Selected Tests:" font_size="14px" font_weight="600" color="#000000" margin_bottom="5px" />
                    <p>{selectedTestLabels.join(', ')}</p>
                </div>
            )}
        </div>
    );
}

export default DoctorSendPatientForTestTestType;