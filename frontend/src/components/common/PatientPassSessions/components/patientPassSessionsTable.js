import React from 'react';

import TableContent from '../../tableContent';

function ReceptionistPatientPassSessionsTable({ patientPassSessionsTableHeader, patientPassSessionsTableData, onClickSession }) {
    const headers = patientPassSessionsTableHeader;
    const data = patientPassSessionsTableData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div key={index} className="tableContent tableContentPatientFound" onClick={() => onClickSession(row)}>
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            {row.sessionDate}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.sessionType}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            {row.pIC}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[3].width }}>
                            {row.department}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[4].width }}>
                            {row.result}
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

export default ReceptionistPatientPassSessionsTable;