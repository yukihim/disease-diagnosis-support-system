import React from 'react';
import './style/prevButton.css';

import PrevIcon from '../../assets/images/common/prev_button.png';

function PrevButton({ onClick }) {
    return (
        <div className="prevButtonWrapper" onClick={onClick}>
            <img 
                src={PrevIcon} 
                alt="Previous Icon Button"
                className="prevButtonIcon"
            />
        </div>
    )
}

export default PrevButton;