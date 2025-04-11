import React from 'react';

import TableContent from '../../../common/tableContent';

function DoctorInpatientMonitoringTableContent({ inpatientMonitoringTableHeader, inpatientMonitoringTableData, onClickInpatientMonitoring }) {
    const headers = inpatientMonitoringTableHeader;
    const data = inpatientMonitoringTableData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div key={index} className="tableContent" onClick={() => onClickInpatientMonitoring(row)}>
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            {row.name}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.sex}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            {row.age}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[3].width, minWidth: headers[3].width }}>
                            {row.room}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[4].width, minWidth: headers[4].width }}>
                            {row.admissionDate}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[5].width, minWidth: headers[5].width }}>
                            {row.condition}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[6].width, minWidth: headers[6].width }}>
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

export default DoctorInpatientMonitoringTableContent;