// import React from 'react';
// import './style/doctorSendPatientForTestTestType.css';

// import HuggedText from '../../../common/huggedText';

// function DoctorSendPatientForTestTestType() {
//     const [selectedTestTypes, setSelectedTestTypes] = React.useState([]);
    
//     const testOptions = [
//         { label: 'Blood Test', value: 'test1' },
//         { label: 'Urine Test', value: 'test2' },
//         { label: 'X-Ray', value: 'test3' },
//         { label: 'MRI Scan', value: 'test4' },
//         { label: 'CT Scan', value: 'test5' },
//         { label: 'Ultrasound', value: 'test6' },
//         { label: 'ECG', value: 'test7' },
//         { label: 'Allergy Test', value: 'test8' },
//         { label: 'Genetic Test', value: 'test9' },
//         { label: 'Stool Test', value: 'test10' },
//     ];
    
//     const handleTestTypeToggle = (value) => {
//         setSelectedTestTypes(prevSelected => {
//             if (prevSelected.includes(value)) {
//                 // Remove if already selected
//                 return prevSelected.filter(item => item !== value);
//             } else {
//                 // Add if not selected
//                 return [...prevSelected, value];
//             }
//         });
//     };

//     return (
//         <div className="test-type-selection">
//             <HuggedText text="Test Types:" font_size="14px" font_weight="600" color="#000000" />
            
//             <div className="test-options-container">
//                 {testOptions.map((option) => (
//                     <div key={option.value} className="test-option">
//                         <input
//                             type="checkbox"
//                             id={`test-${option.value}`}
//                             checked={selectedTestTypes.includes(option.value)}
//                             onChange={() => handleTestTypeToggle(option.value)}
//                         />
//                         <label htmlFor={`test-${option.value}`}>{option.label}</label>
//                     </div>
//                 ))}
//             </div>
            
//             {selectedTestTypes.length > 0 && (
//                 <div className="selected-tests">
//                     <p>Selected: {selectedTestTypes.length} test(s)</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default DoctorSendPatientForTestTestType;















































import React from 'react';
import './style/doctorSendPatientForTestTestType.css'; // Assuming you'll update this CSS

import HuggedText from '../../../common/huggedText';

// Define test options grouped by category
const grouped_test_options = {
  'Blood Tests': [
    { label: 'Complete Blood Count (CBC)', value: 'cbc' },
    { label: 'Basic Metabolic Panel (BMP)', value: 'bmp' },
    { label: 'Lipid Panel', value: 'lipid_panel' },
    { label: 'HbA1c (Diabetes Screen)', value: 'hba1c' },
    { label: 'Thyroid Stimulating Hormone (TSH)', value: 'tsh' },
    // Add more specific blood tests as needed
  ],
  'Urine & Stool Tests': [
    { label: 'Urinalysis (UA)', value: 'ua' },
    { label: 'Urine Culture', value: 'urine_culture' },
    { label: 'Stool Occult Blood', value: 'stool_occult' },
    { label: 'Stool Culture', value: 'stool_culture' },
  ],
  'Imaging': [
    { label: 'X-Ray', value: 'xray' },
    { label: 'MRI Scan', value: 'mri' },
    { label: 'CT Scan', value: 'ct' },
    { label: 'Ultrasound', value: 'ultrasound' },
  ],
  'Cardiac Tests': [
    { label: 'Electrocardiogram (ECG/EKG)', value: 'ecg' },
    // Add Echocardiogram, Stress Test etc. if needed
  ],
  'Other Specialized Tests': [
    { label: 'Allergy Panel (IgE)', value: 'allergy_panel' },
    { label: 'Genetic Screening', value: 'genetic_screening' },
    // Add more specialized tests like Biopsy, PFTs etc. if needed
  ]
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
                     <HuggedText text="Selected Tests:" font_size="14px" font_weight="600" color="#000000" margin_bottom="5px"/>
                    <p>{selectedTestLabels.join(', ')}</p>
                </div>
            )}
        </div>
    );
}

export default DoctorSendPatientForTestTestType;