import React from 'react';
import './style/overviewTextBig.css';

function OverviewTextBig({ children, className }) {
    return (
        <div className={`overviewTextBig ${className}`}>
            {children}
        </div>
    );
}

export default OverviewTextBig;