import React from 'react';
import './style/tableContent.css';

function TableContent({ className='', children }) {
    return (
        <div className={`tableContentWrapper ${className}`}>
            {children}
        </div>
    );
}

export default TableContent;