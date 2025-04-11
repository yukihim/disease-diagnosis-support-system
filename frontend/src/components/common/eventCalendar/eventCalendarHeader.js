import React from 'react';

import TableHeader from '../tableHeader';

function EventCalendarHeader({ eventCalendarTableHeader }) {
    const headers = eventCalendarTableHeader;
    
    return (
        <TableHeader className="tableHeaderGrid">
            {headers.length > 0 ? (
                headers.map((header, index) => (
                    <div
                        key={index}
                        className="tableHeaderCell"
                        style={{ gridColumn: header.gridColumn, minWidth: header.minWidth }}
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

export default EventCalendarHeader;