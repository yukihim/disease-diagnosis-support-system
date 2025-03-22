import React from 'react';
import './style/tableHeader.css';

// const tableHeaderData = {
//     'receptionist': {
//         'patientFound': {
//             'Patient Name': "230px",
//             'Social Security Number': "200px", 
//             'Health Insurance Code': "300px",
//         },
//     },
// }

function TableHeader({ children }) {
    return (
        <div className="tableHeader">
            {children}
        </div>
    );
}

export default TableHeader;