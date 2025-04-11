// import React from 'react';

// import ChooseBox from '../../../common/chooseBox';

// function DoctorSendPatientForTestTestType() {
//     const [selectedTestType, setSelectedTestType] = React.useState("");

//     return (
//         <ChooseBox
//             text="Test Type:"
//             options={[
//                 { label: 'Select Test', value: 'default' },
//                 { label: 'Test 1', value: 'test1' },
//                 { label: 'Test 2', value: 'test2' },
//                 { label: 'Test 3', value: 'test3' },
//             ]}
//             selectedValue={selectedTestType}
//             setSelectedValue={setSelectedTestType}
//         />
//     );
// }

// export default DoctorSendPatientForTestTestType;






















import React from 'react';
import './style/doctorSendPatientForTestTestType.css';

import HuggedText from '../../../common/huggedText';

function DoctorSendPatientForTestTestType() {
    const [selectedTestTypes, setSelectedTestTypes] = React.useState([]);
    
    const testOptions = [
        { label: 'Blood Test', value: 'test1' },
        { label: 'Urine Test', value: 'test2' },
        { label: 'X-Ray', value: 'test3' },
        { label: 'MRI Scan', value: 'test4' },
        { label: 'CT Scan', value: 'test5' },
        { label: 'Ultrasound', value: 'test6' },
        { label: 'ECG', value: 'test7' },
        { label: 'Allergy Test', value: 'test8' },
        { label: 'Genetic Test', value: 'test9' },
        { label: 'Stool Test', value: 'test10' },
    ];
    
    const handleTestTypeToggle = (value) => {
        setSelectedTestTypes(prevSelected => {
            if (prevSelected.includes(value)) {
                // Remove if already selected
                return prevSelected.filter(item => item !== value);
            } else {
                // Add if not selected
                return [...prevSelected, value];
            }
        });
    };

    return (
        <div className="test-type-selection">
            <HuggedText text="Test Types:" font_size="14px" font_weight="600" color="#000000" />
            
            <div className="test-options-container">
                {testOptions.map((option) => (
                    <div key={option.value} className="test-option">
                        <input
                            type="checkbox"
                            id={`test-${option.value}`}
                            checked={selectedTestTypes.includes(option.value)}
                            onChange={() => handleTestTypeToggle(option.value)}
                        />
                        <label htmlFor={`test-${option.value}`}>{option.label}</label>
                    </div>
                ))}
            </div>
            
            {selectedTestTypes.length > 0 && (
                <div className="selected-tests">
                    <p>Selected: {selectedTestTypes.length} test(s)</p>
                </div>
            )}
        </div>
    );
}

export default DoctorSendPatientForTestTestType;