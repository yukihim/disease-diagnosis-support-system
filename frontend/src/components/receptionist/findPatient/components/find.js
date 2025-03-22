import React from 'react';
import './style/find.css';

import Button from '../../../common/button'

function Find({ method, onChangeSSN, onChangeHealthInsuranceNumber }) {
    return (
        <div>
            {method === 'SSN' ? (
                <div className="find">
                    <input className="findInputBar" type="text" placeholder="Social Security Number. For example: 079283868386" onChange={onChangeSSN} />
                    <Button className="findButton">
                        Find Patient
                    </Button>
                </div>
            ) : method === 'HealthInsuranceNumber' ? (
                <div className="find">
                    <input className="findInputBar" type="text" placeholder="Health Insurance Number. For example: HS-4-79-793 778 6132" onChange={onChangeHealthInsuranceNumber} />
                    <Button className="findButton">
                        Find Patient
                    </Button>
                </div>
            ) : (
                /* Default case if method doesn't match */
                <div className="find">
                    No data
                </div>
            )}
        </div>
    );
}

export default Find