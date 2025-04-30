import React from 'react';
import './style/receptionistPatientFoundContent.css';

import TableContent from '../../../common/tableContent';

function ReceptionistPatientFoundContent({ patientFoundTableHeader, patientFoundTableData, onClickPatient }) {
    const headers = patientFoundTableHeader;
    const data = patientFoundTableData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div key={index} className="tableContent tableContentPatientFound" onClick={() => onClickPatient(row)}>
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            {row.patientName}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.ssn}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            {row.hic}
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

export default ReceptionistPatientFoundContent;