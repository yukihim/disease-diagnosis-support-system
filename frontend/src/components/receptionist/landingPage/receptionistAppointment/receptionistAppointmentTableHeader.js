import React from 'react';

import TableHeader from '../../../common/tableHeader';

const appointmentTableHeader = [
    { name: 'Name', width: '150px' },
    { name: 'Time', width: '70px' },
    { name: 'Dept', width: '80px' }
];

function ReceptionistAppointmentTableHeader() {
    const headers = appointmentTableHeader;

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

export default ReceptionistAppointmentTableHeader;