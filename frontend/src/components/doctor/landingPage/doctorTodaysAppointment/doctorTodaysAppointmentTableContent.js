import React from 'react';
import './style/doctorTodaysAppointmentTableContent.css';

import TableContent from '../../../common/tableContent';

function DoctorTodaysAppointmentTableContent({ todaysAppointmentTableHeader, todaysAppointmentTableData, onClickTodaysAppointment }) {
    const headers = todaysAppointmentTableHeader;
    const data = todaysAppointmentTableData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div key={index} className="tableContent" onClick={() => onClickTodaysAppointment(row)}>
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            {row.name}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.time}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            {row.condition}
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

export default DoctorTodaysAppointmentTableContent;