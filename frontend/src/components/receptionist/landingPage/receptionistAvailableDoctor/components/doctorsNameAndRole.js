import React from 'react';
import './style/doctorsNameAndRole.css';

import HuggedText from '../../../../common/huggedText';

function DoctorsNameAndRole({ name, role }) {
    return (
        <div className="doctorsNameAndRole">
            <HuggedText text={name} font_size={"13.43px"} font_weight={"400px"} />
            <HuggedText text={role} font_size={"13.43px"} font_weight={"400px"} />
        </div>
    );
}

export default DoctorsNameAndRole;