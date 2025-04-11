import React from 'react';
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import BloodSugarIcon from '../../../../assets/images/doctor/bloodSugarIcon.png';

import HuggedText from '../../../common/huggedText';

function BloodSugar() {
    return (
        <BoxContainer className='cardBox bloodSugar'>
            <BoxContainerTitle className='cardTitle'>
                <img src={BloodSugarIcon} alt="Blood Sugar Icon" className='cardIcon' />

                Blood Sugar
            </BoxContainerTitle>

            <BoxContainerContent className='cardContent'>
                <div className="measurementStats">
                    <div className="measurementValue">
                        <HuggedText text='80' font_size="32px" font_weight="400" color="#272927" />
                        <HuggedText text='mg/dL' font_size="16px" font_weight="400" color="#818181" />
                    </div>

                    <div className="measurementStatus" style={{ backgroundColor: '#4CAF50' }}>
                        {/* <HuggedText text='Normal' font_size="16px" font_weight="400" color="#4CAF50" /> */}
                        <HuggedText text='Normal' font_size="16px" font_weight="400" color="#FFF" />
                    </div>
                </div>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default BloodSugar;