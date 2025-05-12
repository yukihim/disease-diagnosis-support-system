import React, { useState, useEffect } from 'react';
import './style/doctorPatientDiagnosingSymptoms.css';

import HuggedText from '../../../common/huggedText';

import Button from '../../../common/button';
import ButtonText from '../../../common/buttonText';

function DoctorPatientDiagnosingSymptoms({ patientSymptoms, setPatientSymptoms }) {
    const [inputValue, setInputValue] = useState(patientSymptoms);

    // Update local state if the prop changes from outside
    useEffect(() => {
        setInputValue(patientSymptoms);
    }, [patientSymptoms]);

    const handleSetSymptoms = () => {
        setPatientSymptoms(inputValue);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="doctorPatientDiagnosingSymptoms">
            <HuggedText text="Symptoms:" font_size="14px" font_weight="600" color="#4E4B66" />
            <input
                className="symptomsInput"
                placeholder="Input the patient symptoms separated by commas ( , ). For example: High fever over 39°C, Coughing, Pain 7 from 1 to 10 scale."
                onChange={handleInputChange}
                value={inputValue}
                rows={4}
            />
            <Button onClick={handleSetSymptoms}>
                <ButtonText>Set Symptoms</ButtonText>
            </Button>
        </div>
    );
}

export default DoctorPatientDiagnosingSymptoms;