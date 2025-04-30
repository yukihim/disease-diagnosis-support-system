import React from 'react'; // Removed useState
import './style/doctorSendPatientForTestTestType.css';

import HuggedText from '../../../common/huggedText';

// --- Constants ---
// (Keep grouped_test_options and helper functions as they are)
// --- Full grouped_test_options ---
const grouped_test_options = {
    'Blood Tests': [
        {
            label: 'Complete Blood Count (CBC)',
            value: 'Complete Blood Count', // Value should match the expected string for the API
            parameters: [
                { name: 'Hemoglobin (Hgb)', unit: 'g/dL', range: { low: 13.5, high: 17.5 }, example: 15.0 },
                { name: 'Hematocrit (Hct)', unit: '%', range: { low: 40, high: 52 }, example: 45 },
                { name: 'White Blood Cell Count (WBC)', unit: 'x10³/µL', range: { low: 4.5, high: 11.0 }, example: 7.5 },
                { name: 'Platelet Count', unit: 'x10³/µL', range: { low: 150, high: 450 }, example: 250 },
            ],
        },
        {
            label: 'Basic Metabolic Panel (BMP)',
            value: 'Basic Metabolic Panel (BMP)',
            parameters: [
                { name: 'Blood Urea Nitrogen (BUN)', unit: 'mg/dL', range: { low: 7, high: 20 }, example: 15 },
                { name: 'Serum Creatinine', unit: 'mg/dL', range: { low: 0.6, high: 1.2 }, example: 0.9 },
                { name: 'Glucose', unit: 'mg/dL', range: { low: 70, high: 100 }, example: 90 },
                { name: 'Calcium', unit: 'mg/dL', range: { low: 8.5, high: 10.2 }, example: 9.5 },
                { name: 'Sodium', unit: 'mEq/L', range: { low: 135, high: 145 }, example: 140 },
                { name: 'Potassium', unit: 'mEq/L', range: { low: 3.5, high: 5.0 }, example: 4.0 },
                { name: 'Chloride', unit: 'mEq/L', range: { low: 98, high: 106 }, example: 102 },
                { name: 'Bicarbonate (CO2)', unit: 'mEq/L', range: { low: 22, high: 29 }, example: 25 },
            ],
        },
        {
            label: 'Lipid Panel',
            value: 'Lipid Panel',
            parameters: [
                { name: 'Total Cholesterol', unit: 'mg/dL', range: { low: 0, high: 200 }, example: 180 },
                { name: 'LDL Cholesterol', unit: 'mg/dL', range: { low: 0, high: 100 }, example: 90 },
                { name: 'HDL Cholesterol', unit: 'mg/dL', range: { low: 40, high: 60 }, example: 50 },
                { name: 'Triglycerides', unit: 'mg/dL', range: { low: 0, high: 150 }, example: 120 },
            ],
        },
        {
            label: 'Thyroid Function Tests (TFTs)',
            value: 'Thyroid Function Tests (TFTs)',
            parameters: [
                { name: 'Thyroid-Stimulating Hormone (TSH)', unit: 'µIU/mL', range: { low: 0.4, high: 4.0 }, example: 2.5 },
                { name: 'Free Thyroxine (Free T4)', unit: 'ng/dL', range: { low: 0.8, high: 1.8 }, example: 1.2 },
            ],
        },
        {
            label: 'Coagulation Panel (PT/INR, PTT)',
            value: 'Coagulation Panel (PT/INR, PTT)',
            parameters: [
                { name: 'Prothrombin Time (PT)', unit: 'seconds', range: { low: 11, high: 13.5 }, example: 12.0 },
                { name: 'International Normalized Ratio (INR)', unit: '', range: { low: 0.8, high: 1.1 }, example: 1.0 },
                { name: 'Partial Thromboplastin Time (PTT)', unit: 'seconds', range: { low: 25, high: 35 }, example: 30.0 },
            ],
        },
        {
            label: 'Liver Function Tests (LFTs)',
            value: 'Liver Function Tests (LFTs)',
            parameters: [
                { name: 'Alanine Aminotransferase (ALT)', unit: 'U/L', range: { low: 10, high: 40 }, example: 25 },
                { name: 'Aspartate Aminotransferase (AST)', unit: 'U/L', range: { low: 10, high: 30 }, example: 20 },
                { name: 'Alkaline Phosphatase (ALP)', unit: 'IU/L', range: { low: 30, high: 120 }, example: 80 },
                { name: 'Total Bilirubin', unit: 'mg/dL', range: { low: 0.3, high: 1.2 }, example: 0.8 },
                { name: 'Direct Bilirubin', unit: 'mg/dL', range: { low: 0.0, high: 0.3 }, example: 0.1 },
                { name: 'Albumin', unit: 'g/dL', range: { low: 3.5, high: 5.0 }, example: 4.0 },
            ],
        },
        {
            label: 'Hemoglobin A1c (HbA1c)',
            value: 'Hemoglobin A1c (HbA1c)',
            parameters: [
                { name: 'HbA1c', unit: '%', range: { low: 4.0, high: 5.6 }, example: 5.2 },
            ],
        },
    ],

    'Urine & Stool Tests': [
        {
            label: 'Urinalysis (UA)',
            value: 'Urinalysis (UA)',
            parameters: [
                { name: 'Protein', unit: 'mg/dL', range: { low: 0, high: 15 }, example: 5 },
                { name: 'Glucose', unit: 'mg/dL', range: { low: 0, high: 15 }, example: 0 },
                { name: 'Ketones', unit: 'mg/dL', range: { low: 0, high: 5 }, example: 0 },
                { name: 'Blood', unit: 'presence', range: { low: 'negative', high: 'negative' }, example: 'negative' },
            ],
        },
        {
            label: 'Urine Culture',
            value: 'Urine Culture',
            parameters: [
                { name: 'Bacterial Growth', unit: 'CFU/mL', range: { low: 0, high: 10000 }, example: 0 },
                { name: 'Pathogen Identified', unit: 'string', range: {}, example: 'None' },
            ],
        },
        {
            label: 'Stool Occult Blood Test',
            value: 'Stool Occult Blood Test',
            parameters: [
                { name: 'Occult Blood', unit: 'presence', range: { low: 'negative', high: 'negative' }, example: 'negative' },
            ],
        },
        {
            label: 'Stool Culture',
            value: 'Stool Culture',
            parameters: [
                { name: 'Pathogen Identified', unit: 'string', range: {}, example: 'None' },
            ],
        },
    ],

    'Imaging': [
        {
            label: 'X-Ray',
            value: 'X-Ray',
            parameters: [
                { name: 'Findings', unit: 'string', example: 'No fractures or abnormalities detected' },
            ],
        },
        {
            label: 'Magnetic Resonance Imaging (MRI)',
            value: 'Magnetic Resonance Imaging (MRI)',
            parameters: [
                { name: 'Findings', unit: 'string', example: 'Multiple demyelinating plaques in periventricular white matter' },
            ],
        },
        {
            label: 'Computed Tomography (CT) Scan',
            value: 'Computed Tomography (CT) Scan',
            parameters: [
                { name: 'Findings', unit: 'string', example: 'No acute intracranial hemorrhage' },
            ],
        },
        {
            label: 'Ultrasound',
            value: 'Ultrasound',
            parameters: [
                { name: 'Findings', unit: 'string', example: 'Normal liver size and echotexture' },
            ],
        },
        {
            label: 'Positron Emission Tomography (PET)',
            value: 'Positron Emission Tomography (PET)',
            parameters: [
                { name: 'Findings', unit: 'string', example: 'Increased uptake in mediastinal lymph nodes' },
            ],
        },
        {
            label: 'Optical Coherence Tomography (OCT)',
            value: 'Optical Coherence Tomography (OCT)',
            parameters: [
                { name: 'Retinal Nerve Fiber Layer Thickness', unit: 'µm', range: { low: 80, high: 110 }, example: 95 },
            ],
        },
    ],

    'Cardiac Tests': [
        {
            label: 'Electrocardiogram (ECG/EKG)',
            value: 'Electrocardiogram (ECG/EKG)',
            parameters: [
                { name: 'Heart Rate', unit: 'bpm', range: { low: 60, high: 100 }, example: 72 },
                { name: 'PR Interval', unit: 'ms', range: { low: 120, high: 200 }, example: 160 },
                { name: 'QRS Duration', unit: 'ms', range: { low: 80, high: 120 }, example: 90 },
            ],
        },
        {
            label: 'Echocardiogram',
            value: 'Echocardiogram',
            parameters: [
                { name: 'Ejection Fraction', unit: '%', range: { low: 55, high: 70 }, example: 60 },
                { name: 'Left Ventricular Size', unit: 'cm', range: { low: 3.5, high: 5.7 }, example: 4.8 },
            ],
        },
        {
            label: 'Stress Test',
            value: 'Stress Test',
            parameters: [
                { name: 'Exercise Duration', unit: 'minutes', example: 10 },
                { name: 'Max Heart Rate Achieved', unit: 'bpm', example: 160 },
            ],
        },
    ],

    'Neurological & Specialized Tests': [
        {
            label: 'Electroencephalogram (EEG)',
            value: 'Electroencephalogram (EEG)',
            parameters: [
                { name: 'Background Rhythm', unit: 'Hz', range: { low: 8, high: 12 }, example: 10 },
                { name: 'Abnormal Activity', unit: 'presence', range: { low: 'absent', high: 'absent' }, example: 'absent' },
            ],
        },
        {
            label: 'Evoked Potentials',
            value: 'Evoked Potentials',
            parameters: [
                { name: 'Visual Evoked Potential Latency', unit: 'ms', range: { low: 90, high: 110 }, example: 105 },
                { name: 'Somatosensory Evoked Potential Latency', unit: 'ms', example: 35 },
            ],
        },
        {
            label: 'Cerebrospinal Fluid (CSF) Analysis',
            value: 'Cerebrospinal Fluid (CSF) Analysis',
            parameters: [
                { name: 'White Blood Cell Count', unit: 'cells/mm³', range: { low: 0, high: 5 }, example: 2 },
                { name: 'Protein', unit: 'mg/dL', range: { low: 15, high: 45 }, example: 30 },
                { name: 'Glucose', unit: 'mg/dL', range: { low: 50, high: 80 }, example: 65 },
                { name: 'Oligoclonal Bands', unit: 'presence', range: { low: 'negative', high: 'negative' }, example: 'positive' },
            ],
        },
        {
            label: 'Biopsy',
            value: 'Biopsy',
            parameters: [
                { name: 'Histopathological Findings', unit: 'string', example: 'Granulomatous inflammation' },
            ],
        },
        {
            label: 'Enzyme-linked Immunosorbent Assay (ELISA)',
            value: 'Enzyme-linked Immunosorbent Assay (ELISA)',
            parameters: [
                { name: 'Antibody Level', unit: 'IU/mL', example: 120 },
            ],
        },
    ],

    'Other Specialized Tests': [
        {
            label: 'Allergy Panel (IgE)',
            value: 'Allergy Panel (IgE)',
            parameters: [
                { name: 'Total IgE', unit: 'IU/mL', range: { low: 0, high: 100 }, example: 50 },
                { name: 'Specific IgE', unit: 'IU/mL', example: 10 },
            ],
        },
        {
            label: 'Genetic Screening',
            value: 'Genetic Screening',
            parameters: [
                { name: 'Mutation Detected', unit: 'string', example: 'BRCA1 positive' },
            ],
        },
        {
            label: 'Pulmonary Function Tests (PFTs)',
            value: 'Pulmonary Function Tests (PFTs)',
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

// Accept props: selectedTestValues, onTestTypeToggle
function DoctorSendPatientForTestTestType({ selectedTestValues, onTestTypeToggle }) {
    // Removed internal state

    // Derive selected labels from selected values
    const selectedTestLabels = selectedTestValues.map(value => {
        const option = allTestOptionsFlat.find(opt => opt.value === value);
        return option ? option.label : value; // Fallback to value if label not found
    });

    return (
        // Use the structure provided by the user
        <div className="test-type-selection-grouped">
            <HuggedText text="Select Test Types:" font_size="16px" font_weight="700" color="#4E4B66" margin_bottom="15px" />

            <div className="test-groups-container">
                {Object.entries(grouped_test_options).map(([categoryName, tests]) => (
                    <div key={categoryName} className="test-group-column">
                        <HuggedText text={categoryName} font_size="14px" font_weight="600" color="#4E4B66" margin_bottom="10px" />
                        <div className="test-options-list">
                            {tests.map((option) => (
                                <div key={option.value} className="test-option-item">
                                    <input
                                        type="checkbox"
                                        id={`test-${option.value}`} // Use value for unique ID
                                        value={option.value} // value attribute is good practice
                                        // Use props for checked state and onChange handler
                                        checked={selectedTestValues.includes(option.value)}
                                        onChange={() => onTestTypeToggle(option.value)}
                                    />
                                    <label htmlFor={`test-${option.value}`}>{option.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Display selected tests */}
            {selectedTestLabels.length > 0 && (
                <div className="selected-tests-display">
                    <HuggedText text="Selected Tests:" font_size="14px" font_weight="600" color="#4E4B66" margin_bottom="5px" />
                    <p>{selectedTestLabels.join(', ')}</p>
                </div>
            )}
        </div>
    );
}

export default DoctorSendPatientForTestTestType;