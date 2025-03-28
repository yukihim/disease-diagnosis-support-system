import React from 'react';
import './style/overviewTextBig.css';

function OverviewTextBig({ children }) {
    return (
        <div className="overviewTextBig">
            {children}
        </div>
    );
}

export default OverviewTextBig;