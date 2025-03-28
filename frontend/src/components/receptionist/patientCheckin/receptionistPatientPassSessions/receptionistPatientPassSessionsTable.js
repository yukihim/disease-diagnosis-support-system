import React from 'react';

import TableContent from '../../../common/tableContent';

const patientPassSessionsTableHeader = [
    { name: 'Session Date', width: '200px' },
    { name: 'Session Type', width: '200px' },
    { name: 'Person In Charged', width: '200px' },
    { name: 'Department', width: '200px' },
    { name: 'Result', width: '200px' }
];

const patientPassSessionsTableDummyData = [
    { sessionDate: '2024-12-01', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-01', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-01', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-01', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-01', sessionType: 'Consultation', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
];

function ReceptionistPatientPassSessionsTable({ onClickSession }) {
    const headers = patientPassSessionsTableHeader;
    const data = patientPassSessionsTableDummyData;

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
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.department}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
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