import React from 'react';
import './style/componentPagination.css';

function ComponentPagination({ children }) {
    return (
        <div className="componentPagination">
            {children}
        </div>
    )
}

export default ComponentPagination;