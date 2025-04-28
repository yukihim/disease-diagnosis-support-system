import React from 'react';
import './style/findPatientBy.css';

import Method from './method';
import Find from './find';

function FindPatientBy({ method, onChangeSSN, onChangeHealthInsuranceNumber }) {
    return (
        <div>
            {method === 'SSN' ? (
                <div className="findPatientBy">
                    <Method>SSN</Method>
                    <Find method={method} onChangeSSN={onChangeSSN} />
                </div>
            ) : method === 'HealthInsuranceNumber' ? (
                <div className="findPatientBy">
                    <Method>Health Insurance Number</Method>
                    <Find method={method} onChangeHealthInsuranceNumber={onChangeHealthInsuranceNumber} />
                </div>
            ) : (
                /* Default case if method doesn't match */
                <div className="findPatientBy">
                    No data
                </div>
            )}
        </div>
    );
}

export default FindPatientBy