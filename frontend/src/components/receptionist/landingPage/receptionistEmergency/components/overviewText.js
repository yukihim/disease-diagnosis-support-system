import React from 'react';
import './style/overviewText.css';

function OverviewText({ children, className = '' }) {
    return (
        <div className={`overviewText ${className}`}>
            {children}
        </div>
    );
}

export default OverviewText;