import React from 'react';
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import BloodPressureIcon from '../../../../assets/images/doctor/bloodPressureIcon.png';

import HuggedText from '../../../common/huggedText';

function BloodPressure() {
    return (
        <BoxContainer className='cardBox bloodPressure'>
            <BoxContainerTitle className='cardTitle'>
                <img src={BloodPressureIcon} alt="Blood Pressure Icon" className='icon' />

                Blood Pressure
            </BoxContainerTitle>

            <BoxContainerContent className='cardContent'>
                <div className="measurementStats">
                    <div className="measurementValue">
                        <HuggedText text='102/72' font_size="32px" font_weight="400" color="#272927" />
                        <HuggedText text='mmhg' font_size="16px" font_weight="400" color="#818181" />
                    </div>

                    <div className="measurementStatus" style={{ backgroundColor: '#4CAF50' }}>
                        <HuggedText text='Normal' font_size="16px" font_weight="400" color="#FFF" />
                    </div>
                </div>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default BloodPressure;