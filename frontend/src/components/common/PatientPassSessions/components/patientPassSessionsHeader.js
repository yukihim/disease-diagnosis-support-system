import React from 'react';

import TableHeader from '../../tableHeader';

function PatientPassSessionsHeader({ patientPassSessionsTableHeader }) {
    const headers = patientPassSessionsTableHeader;
    
    return (
        <TableHeader>
            {headers.length > 0 ? (
                headers.map((header, index) => (
                    <div
                        key={index}
                        className="tableHeaderCell"
                        style={{ width: header.width, minWidth: header.width }}
                    >
                        {header.name}
                    </div>
                ))
            ) : (
                <div className="tableHeaderCell">
                    No data
                </div>
            )}
        </TableHeader>
    );
}

export default PatientPassSessionsHeader;