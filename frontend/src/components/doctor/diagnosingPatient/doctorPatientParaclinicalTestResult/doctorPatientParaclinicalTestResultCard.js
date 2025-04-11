import React from 'react';
import './style/doctorPatientParaclinicalTestResultCard.css';

import SpecificInformationItemWrapper from '../../../common/specificInformationItemWrapper';

function DoctorPatientParaclinicalTestResultCard({ patientTestResult }) {
    const getValueStatus = (value, normalRange) => {
        // Parse values and ranges
        // This is a simple implementation that assumes values and ranges are in the same unit
        // For complex parsing, you would need to handle different units and formats
        const numericValue = parseFloat(value);
        const range = normalRange.match(/(\d+(\.\d+)?)-(\d+(\.\d+)?)/);
        
        if (!range) return 'normal'; // If can't parse range, assume normal
        
        const lowerBound = parseFloat(range[1]);
        const upperBound = parseFloat(range[3]);
        
        if (numericValue < lowerBound) return 'below';
        if (numericValue > upperBound) return 'above';
        return 'normal';
    };

    return (
        <div className="doctorPatientParaclinicalTestResultCard">
            {patientTestResult.testFields.map((field, index) => {
                const status = getValueStatus(field.value, field.normalRange);
                return (
                    <SpecificInformationItemWrapper
                        key={index}
                        className={`patientParaclinicalTestResult ${status}`}
                        item={`${field.label} (${field.key})`}
                        itemValue={`${field.value}`}
                        normalRange={`${field.normalRange}`}
                    />
                );
            })}
            
            <div className="resultLegend">
                <div className="legendItem">
                    <span className="colorIndicator normal"></span>
                    <span>Normal Range</span>
                </div>
                <div className="legendItem">
                    <span className="colorIndicator below"></span>
                    <span>Below Normal Range</span>
                </div>
                <div className="legendItem">
                    <span className="colorIndicator above"></span>
                    <span>Above Normal Range</span>
                </div>
            </div>
        </div>
    );
}

export default DoctorPatientParaclinicalTestResultCard;