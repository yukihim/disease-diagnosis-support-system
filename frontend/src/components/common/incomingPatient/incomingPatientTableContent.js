import React from 'react';
import './style/incomingPatientTableContent.css';

import TableContent from '../tableContent';

function IncomingPatientTableContent({ incomingPatientTableHeader, incomingPatientTableData, onClickIncomingPatient }) {
    const headers = incomingPatientTableHeader;
    const data = incomingPatientTableData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div key={index} className="tableContent tableContentIncomingPatient" onClick={() => onClickIncomingPatient(row)}>
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
                            {row.from}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[4].width, minWidth: headers[4].width }}>
                            {row.state}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[5].width, minWidth: headers[5].width }}>
                            {row.note}
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

export default IncomingPatientTableContent;