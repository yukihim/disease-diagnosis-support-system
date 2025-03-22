import React from 'react';
import './style/overviewNumber.css';

function OverviewNumber({ children, className = '' }) {
    return (
        <div className={`overviewNumber ${className}`}>
            {children}
        </div>
    );
}

export default OverviewNumber;