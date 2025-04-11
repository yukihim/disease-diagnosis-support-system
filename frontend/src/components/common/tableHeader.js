import React from 'react';
import './style/tableHeader.css';

function TableHeader({ className='', children }) {
    return (
        <div className={`tableHeader ${className}`}>
            {children}
        </div>
    );
}

export default TableHeader;