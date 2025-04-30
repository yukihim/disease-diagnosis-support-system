import React from 'react';

import TableContent from '../../tableContent'; // Assuming this path is correct

// Renamed function parameter for clarity, assuming it's used generically now
function PatientPassSessionsTable({ patientPassSessionsTableHeader, patientPassSessionsTableData, onClickSession }) {
    const headers = patientPassSessionsTableHeader;
    const data = patientPassSessionsTableData;

    return (
        <TableContent>
            {data && data.length > 0 ? ( // Added check for data existence
                data.map((row, index) => (
                    // Use a unique key, sessionID if available, otherwise index
                    <div key={row.sessionID || index} className="tableContent tableContentPatientFound" onClick={() => onClickSession(row)}>
                        {/* Session Date */}
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            {row.sessionDate}
                        </div>
                        {/* Session Type */}
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.sessionType}
                        </div>
                        {/* Person In Charged - Corrected key */}
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            {row.personInCharged} {/* Changed from row.pIC */}
                        </div>
                        {/* Department - Corrected indices */}
                        <div className="tableContentCell" style={{ width: headers[3].width, minWidth: headers[3].width }}> {/* Corrected width and minWidth index */}
                            {row.department}
                        </div>
                        {/* Result - Corrected indices */}
                        <div className="tableContentCell" style={{ width: headers[4].width, minWidth: headers[4].width }}> {/* Corrected width and minWidth index */}
                            {row.result}
                        </div>
                    </div>
                ))
            ) : (
                <div className="tableContent">
                    <div className="tableContentCell" style={{ textAlign: 'center', width: '100%' }}>
                        No past session data available.
                    </div>
                </div>
            )}
        </TableContent>
    );
}

export default PatientPassSessionsTable;