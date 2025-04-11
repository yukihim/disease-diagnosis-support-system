import React from 'react';
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import BodyTemperatureIcon from '../../../../assets/images/doctor/bodyTemperatureIcon.png';

import HuggedText from '../../../common/huggedText';

function BodyTemperature() {
    return (
        <BoxContainer className='cardBox bodyTemperature'>
            <BoxContainerTitle className='cardTitle'>
                <img src={BodyTemperatureIcon} alt="Body Temperature Icon" className='icon' />

                Body Temperature
            </BoxContainerTitle>

            <BoxContainerContent className='cardContent'>
                <div className="measurementStats">
                    <div className="measurementValue">
                        <HuggedText text='99' font_size="32px" font_weight="400" color="#272927" />
                        <HuggedText text='°C' font_size="16px" font_weight="400" color="#818181" />
                    </div>

                    <div className="measurementStatus" style={{ backgroundColor: '#4CAF50' }}>
                        <HuggedText text='Normal' font_size="16px" font_weight="400" color="#FFF" />
                    </div>
                </div>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default BodyTemperature;