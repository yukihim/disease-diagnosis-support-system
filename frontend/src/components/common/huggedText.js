import React from 'react';
import './style/huggedText.css';

function HuggedText({ className, text, font_size, font_weight, color }) {
    return (
        <div className={`huggedText ${className}`} style={{ fontSize: font_size, fontWeight: font_weight, color: color }}>
            {text}
        </div>
    )
}

export default HuggedText;