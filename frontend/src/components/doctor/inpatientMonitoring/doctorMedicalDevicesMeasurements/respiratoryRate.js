import React from 'react';
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import RespiratoryRateIcon from '../../../../assets/images/doctor/respiratoryRateIcon.png';

import HuggedText from '../../../common/huggedText';

function RespiratoryRate() {
    return (
        <BoxContainer className='cardBox respiratoryRate'>
            <BoxContainerTitle className='cardTitle'>
                <img src={RespiratoryRateIcon} alt="Respiratory Rate Icon" className='icon' />

                Respiratory Rate
            </BoxContainerTitle>

            <BoxContainerContent className='cardContent'>
                <div className="measurementStats">
                    <div className="measurementValue">
                        <HuggedText text='15' font_size="32px" font_weight="400" color="#272927" />
                        <HuggedText text='rpm' font_size="16px" font_weight="400" color="#818181" />
                    </div>

                    <div className="measurementStatus" style={{ backgroundColor: '#4CAF50' }}>
                        <HuggedText text='Normal' font_size="16px" font_weight="400" color="#FFF" />
                    </div>
                </div>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default RespiratoryRate;