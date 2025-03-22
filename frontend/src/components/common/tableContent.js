import React from 'react';
import './style/tableContent.css';

function TableContent({ children }) {
    return (
        <div className="tableContentWrapper">
            {children}
        </div>
    );
}

export default TableContent;