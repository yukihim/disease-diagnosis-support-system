import React from 'react';
import PropTypes from 'prop-types';
import './style/dropDownBox.css';

function DropDownBox({ options, value, onChange, className }) {
    return (
        <select
            className={`dropDownBox ${className}`}
            value={value}
            onChange={onChange}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

DropDownBox.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

DropDownBox.defaultProps = {
    value: '',
    onChange: () => {},
    className: '',
};

export default DropDownBox;