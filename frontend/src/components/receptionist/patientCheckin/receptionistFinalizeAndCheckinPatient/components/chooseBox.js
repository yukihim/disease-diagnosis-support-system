import React from 'react';
import './style/chooseBox.css';

import HuggedText from '../../../../common/huggedText';
import DropDownBox from '../../../../common/dropDownBox';

function ChooseBox({ text, options, setSelectedValue, selectedValue }) {
    return (
        <div className="chooseBox">
            <HuggedText text={text} font_size="14px" font_weight="600" color="#000000" />
            <DropDownBox
                className="dropDownCheckin"
                options={options}
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
            />
        </div>
    );
}

export default ChooseBox;