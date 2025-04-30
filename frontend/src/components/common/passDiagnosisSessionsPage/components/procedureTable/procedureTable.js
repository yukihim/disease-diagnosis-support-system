import React from 'react';
import TableContent from '../../../tableContent'; // Assuming common TableContent component

// Accept procedureTableData prop
function ProcedureTable({ patientProcedureTableHeader, procedureTableData }) {
    const headers = patientProcedureTableHeader;
    const data = procedureTableData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, index) => (
                    // Use a unique key, e.g., index or a unique ID from the data if available
                    <div key={index} className="tableContent tableContentIncomingPatient"> {/* Adjust className if needed */}
                        {/* Procedure Name */}
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            {row.procedureName} {/* Use 'procedureName' from backend */}
                        </div>
                        {/* Date/Time */}
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.dateTime} {/* Use 'dateTime' from backend */}
                        </div>
                        {/* Note */}
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            {row.note} {/* Use 'note' from backend */}
                        </div>
                        {/* Empty header cell for the remove button column */}
                        <div className="tableHeaderCell removeCell" style={{ width: '30px', minWidth: '30px' }}></div>
                    </div>
                ))
            ) : (
                <div className="tableContent">
                    <div className="tableContentCell" style={{ textAlign: 'center', width: '100%' }}>
                        No procedures recorded.
                    </div>
                </div>
            )}
        </TableContent>
    );
}

export default ProcedureTable;