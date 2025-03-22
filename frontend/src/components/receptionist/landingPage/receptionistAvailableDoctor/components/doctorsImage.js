import React from 'react';
import './style/doctorsImage.css';

import ReceptionistImage from '../../../../../assets/images/receptionist/receptionistImage.png';

function DoctorsImage() {
    return (
        <img
            src={ReceptionistImage}
            alt="Doctor"
            className="doctorsImage"
        />
    );
}

export default DoctorsImage;