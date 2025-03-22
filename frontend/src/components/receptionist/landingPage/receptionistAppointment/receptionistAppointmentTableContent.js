import React from 'react';

import TableContent from '../../../common/tableContent';

const appointmentTableHeader = [
    { name: 'Name', width: '150px' },
    { name: 'Time', width: '70px' },
    { name: 'Dept', width: '80px' }
];

const appointmentTableDummyData = [
    { name: 'Lê Văn A', time: '10:00 AM', dept: 'Lão - Nội' },
    { name: 'Nguyễn Thị Văn A', time: '10:00 AM', dept: 'Lão - Nội' },
    { name: 'Lê Văn B', time: '10:00 AM', dept: 'Lão - Nội' },
    { name: 'Nguyễn Thị Văn B', time: '10:00 AM', dept: 'Lão - Nội' },
    { name: 'Lê Văn C', time: '10:00 AM', dept: 'Lão - Nội' },
];

function ReceptionistAppointmentTableContent() {
    const headers = appointmentTableHeader;
    const data = appointmentTableDummyData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div key={index} className="tableContent">
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            {row.name}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.time}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            {row.dept}
                        </div>
                    </div>
                ))
            ) : (
                <div className="tableContent">
                    <div className="tableContentCell">
                        No data
                    </div>
                </div>
            )}
        </TableContent>
    );
}

export default ReceptionistAppointmentTableContent;