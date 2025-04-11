import React from 'react';
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import HeartRateIcon from '../../../../assets/images/doctor/heartRateIcon.png';

import HuggedText from '../../../common/huggedText';

function HeartRate() {
    return (
        <BoxContainer className='cardBox heartRate'>
            <BoxContainerTitle className='cardTitle'>
                <img src={HeartRateIcon} alt="Heart Rate Icon" className='cardIcon' />

                Heart Rate
            </BoxContainerTitle>

            <BoxContainerContent className='cardContent'>
                <div className="measurementStats">
                    <div className="measurementValue">
                        <HuggedText text='98' font_size="32px" font_weight="400" color="#272927" />
                        <HuggedText text='bpm' font_size="16px" font_weight="400" color="#818181" />
                    </div>

                    <div className="measurementStatus" style={{ backgroundColor: '#4CAF50' }}>
                        <HuggedText text='Normal' font_size="16px" font_weight="400" color="#FFF" />
                    </div>
                </div>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default HeartRate;