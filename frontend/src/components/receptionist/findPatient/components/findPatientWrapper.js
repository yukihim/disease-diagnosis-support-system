import React from 'react';
import './style/findPatientWrapper.css';

import FindPatientBy from './findPatientBy';

function FindPatientWrapper({ onChangeSSN, onChangeHealthInsuranceNumber }) {
    return (
        <div className="findPatientWrapper">
            <FindPatientBy method="SSN" onChangeSSN={onChangeSSN} onChangeHealthInsuranceNumber={onChangeHealthInsuranceNumber} />
            <FindPatientBy method="HealthInsuranceNumber" onChangeSSN={onChangeSSN} onChangeHealthInsuranceNumber={onChangeHealthInsuranceNumber} />
        </div>
    );
}

export default FindPatientWrapper
