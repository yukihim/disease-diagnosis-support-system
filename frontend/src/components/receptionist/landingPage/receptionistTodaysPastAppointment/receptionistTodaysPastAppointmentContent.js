import React from 'react';

import TableContent from '../../../common/tableContent';

const pastAppointmentTableHeader = [
    { name: 'Name', width: '130px' },
    { name: 'Time', width: '70px' },
    { name: 'Status', width: '80px' },
];

const pastAppointmentTableDummyData = [
    { name: 'Lê Văn A', time: '07:00 AM', status: 'Checked' },
    { name: 'Lê Văn A', time: '07:00 AM', status: 'Unchecked' },
    { name: 'Lê Văn A', time: '07:00 AM', status: 'Checked' },
    { name: 'Lê Văn A', time: '07:00 AM', status: 'Checked' },
    { name: 'Lê Văn A', time: '07:00 AM', status: 'Checked' },
    { name: 'Lê Văn A', time: '07:00 AM', status: 'Unchecked' },
    { name: 'Lê Văn A', time: '07:00 AM', status: 'Checked' },
    { name: 'Lê Văn A', time: '07:00 AM', status: 'Checked' },
    { name: 'Lê Văn A', time: '07:00 AM', status: 'Checked' },
];

function ReceptionistTodaysPastAppointmentContent() {
    const headers = pastAppointmentTableHeader;
    const data = pastAppointmentTableDummyData;

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
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width, color: row.status === 'Checked' ? '#00BA88' : '#F4B740' }}>
                            {row.status}
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

export default ReceptionistTodaysPastAppointmentContent;