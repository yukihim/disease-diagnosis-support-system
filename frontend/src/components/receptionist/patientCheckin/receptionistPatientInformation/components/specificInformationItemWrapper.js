import React from 'react';
import './style/specificInformationItemWrapper.css';

function SpecificInformationItemWrapper({ item, itemValue, isEditing, onChange }) {
    const handleChange = (event) => {
        onChange(event.target.value);
    }
    
    return (
        <div className="specificInformationItemWrapper">
            <div className='item'>{item}</div>
            <div className='doubleDot'>: </div>
            <div className='itemValue'>
                {isEditing ? (
                    <input
                        type="text"
                        value={itemValue}
                        onChange={handleChange}
                        className="editableInput"
                    />
                ) : (
                    itemValue
                )}
            </div>
        </div>
    );
}

export default SpecificInformationItemWrapper;