import React from 'react';

import TableHeader from '../../../common/tableHeader';

const patientPassSessionsTableHeader = [
    { name: 'Session Date', width: '200px' },
    { name: 'Session Type', width: '200px' },
    { name: 'Person In Charged', width: '200px' },
    { name: 'Department', width: '200px' },
    { name: 'Result', width: '200px' }
];

function ReceptionistPatientPassSessionsHeader() {
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

export default ReceptionistPatientPassSessionsHeader;