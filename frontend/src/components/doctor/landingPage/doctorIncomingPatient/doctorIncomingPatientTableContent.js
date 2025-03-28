import React from 'react';
import './style/doctorIncomingPatientTableContent.css';

import TableContent from '../../../common/tableContent';

function DoctorIncomingPatientTableContent({ incomingPatientTableHeader, incomingPatientTableData, onClickIncomingPatient }) {
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

export default DoctorIncomingPatientTableContent;