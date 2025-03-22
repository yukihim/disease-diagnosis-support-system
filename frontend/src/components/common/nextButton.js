import React from 'react';
import './style/nextButton.css';

import NextIcon from '../../assets/images/common/next_button.png';

function NextButton({ onClick }) {
    return (
        <div className="nextButtonWrapper" onClick={onClick}>
            <img 
                src={NextIcon} 
                alt="Next Icon Button"
                className="nextButtonIcon"
            />
        </div>
    )
}

export default NextButton;