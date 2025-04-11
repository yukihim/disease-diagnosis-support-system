import React from 'react';
import './style/paraclinicalPatientTestAdditionalInformationDisplay.css';

import HuggedText from '../../../common/huggedText';

function ParaclinicalPatientTestAdditionalInformationDisplay({ className = '', item, itemValue }) {
    return (
        <div className={`paraclinicalPatientTestAdditionalInformationDisplay ${className}`}>
            <HuggedText text={item} font_size="14px" font_weight="600" color="#000000" />
            <HuggedText text={itemValue} font_size="14px" font_weight="500" color="#000000" />
        </div>
    );
}

export default ParaclinicalPatientTestAdditionalInformationDisplay;