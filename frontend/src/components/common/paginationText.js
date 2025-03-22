import React from 'react';
import './style/paginationText.css';

function PaginationText({ children }) {
    return (
        <div className="paginationText">
            {children}
        </div>
    )
}

export default PaginationText;