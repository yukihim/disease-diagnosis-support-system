import React from 'react';

import TableContent from '../../../tableContent'

function ProcedureTable({ patientProcedureTableHeader, procedureTableData }) {
    const headers = patientProcedureTableHeader;
    const data = procedureTableData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div key={index} className="tableContent tableContentIncomingPatient">
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            {row.procedure}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.datetime}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            {row.note}
                        </div>
                        <div style={{ width: "30px", height: "30px"}}></div>
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

export default ProcedureTable;