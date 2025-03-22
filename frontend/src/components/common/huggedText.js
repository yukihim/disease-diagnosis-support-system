import React from 'react';
import './style/huggedText.css';

function HuggedText({ text, font_size, font_weight, color }) {
    return (
        <div className="huggedText" style={{ fontSize: font_size, fontWeight: font_weight, color: color }}>
            {text}
        </div>
    )
}

export default HuggedText;