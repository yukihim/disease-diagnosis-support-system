import React from 'react';
import './style/paraclinicalPatientTestAdditionalInformationDisplay.css';

// import HuggedText from '../../../common/huggedText';
import SpecificInformationItemWrapper from '../../../common/specificInformationItemWrapper';

function ParaclinicalPatientTestAdditionalInformationDisplay({ className = '', item, itemValue }) {
    return (
        <div className={`paraclinicalPatientTestAdditionalInformationDisplay ${className}`}>
            {/* <HuggedText text={item} font_size="14px" font_weight="600" color="#4E4B66" />
            <HuggedText text={itemValue} font_size="14px" font_weight="500" color="#14142B" /> */}
            <SpecificInformationItemWrapper
                key={item}
                item={item}
                itemValue={itemValue}
            />
        </div>
    );
}

export default ParaclinicalPatientTestAdditionalInformationDisplay;