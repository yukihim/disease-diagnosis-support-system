import React from 'react';
import './style/specificInformationItemWrapper.css';

function SpecificInformationItemWrapper({ className, item, itemValue, isEditing, onChange }) {
    return (
        <div className={`specificInformationItemWrapper ${className}`}>
            <div className="itemAndDoubleDotWrapper">
                <div className='item'>{item}</div>
                <div className='doubleDot'>: </div>
            </div>
            <div className='itemValue'>
                {isEditing ? (
                    <input 
                        type="text" 
                        value={itemValue} 
                        onChange={(e) => onChange(e.target.value)}
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