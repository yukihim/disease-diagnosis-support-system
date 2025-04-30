import React from 'react';
import './style/specificInformationItemWrapper.css';

// Accept fieldType prop
function SpecificInformationItemWrapper({ className, item, itemValue, normalRange, isEditing, onChange, fieldType, customStyle }) {

    const getDateValue = (value) => {
        if (!value) return ''; // Return empty string if no value
        try {
            // Attempt to create a date object and format it
            // This handles various input formats but might need refinement
            // For simplicity, we assume the state holds 'yyyy-MM-dd' or is empty/null
            if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
                return value; // Already in correct format
            }
            // If it's a Date object or other parsable string, format it
            const date = new Date(value);
            if (isNaN(date.getTime())) return ''; // Invalid date
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        } catch (e) {
            return ''; // Return empty on error
        }
    };

    return (
        <div 
            className={`specificInformationItemWrapper ${className}`}
            style={customStyle}
        >
            <div className="itemAndDoubleDotWrapper">
                <div className='item'>{item}</div>
                <div className='doubleDot'>: </div>
            </div>
            <div className='itemValue'>
                {isEditing ? (
                    fieldType === 'date' ? (
                        <input
                            type="date"
                            value={getDateValue(itemValue)}
                            onChange={(e) => onChange(e.target.value)} // Value is already 'yyyy-MM-dd' string
                            className="editableInput dateInput" // Add specific class if needed
                            disabled={!isEditing}
                            style={{ color: "#14142B", fontSize: "14px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }} // Ensure full width
                        />
                    ) : (
                        <input
                            type="text"
                            value={itemValue}
                            onChange={(e) => onChange(e.target.value)}
                            className="editableInput"
                            disabled={!isEditing}
                        />
                    )
                ) : (
                    // Display value as is when not editing
                    itemValue
                )}
            </div>
            {
                normalRange ? (
                    <div className='doubleDot'>{normalRange}</div>
                ) : null
            }
        </div>
    );
}

export default SpecificInformationItemWrapper;