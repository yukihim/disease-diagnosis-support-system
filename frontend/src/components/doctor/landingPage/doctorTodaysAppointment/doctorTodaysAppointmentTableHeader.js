import React from 'react';

import TableHeader from '../../../common/tableHeader';

function DoctorTodaysAppointmentTableHeader({ todaysAppointmentTableHeader }) {
    const headers = todaysAppointmentTableHeader;

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

export default DoctorTodaysAppointmentTableHeader;