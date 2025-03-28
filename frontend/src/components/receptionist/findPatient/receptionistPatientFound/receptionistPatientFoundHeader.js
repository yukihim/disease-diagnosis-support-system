import React from 'react';

import TableHeader from '../../../common/tableHeader';

const patientFoundTableHeader = [
    { name: 'Patient Name', width: '230px' },
    { name: 'Social Security Number', width: '200px' },
    { name: 'Health Insurance Code', width: '300px' }
];

function ReceptionistPatientFoundHeader() {
    const headers = patientFoundTableHeader;
    
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

export default ReceptionistPatientFoundHeader;