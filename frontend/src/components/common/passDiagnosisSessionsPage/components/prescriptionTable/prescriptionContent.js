import React from 'react';
import TableContent from '../../../tableContent';

function PrescriptionContent({ patientPrescriptionTableHeader, prescriptionTableData }) {
    const headers = patientPrescriptionTableHeader;
    const data = prescriptionTableData;

    return (
        <TableContent>
            {data && data.length > 0 ? ( // Added check for data existence
                data.map((row, index) => (
                    <div key={index} className="tableContent tableContentIncomingPatient"> {/* Adjust className if needed */}
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            {row.medicine}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.morning}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            {row.noon}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[3].width, minWidth: headers[3].width }}>
                            {row.afternoon}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[4].width, minWidth: headers[4].width }}>
                            {row.evening}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[5].width, minWidth: headers[5].width }}>
                            {row.duration} {/* Corrected from durations */}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[6].width, minWidth: headers[6].width }}>
                            {row.note}
                        </div>
                        {/* Empty header cell for the remove button column */}
                        <div className="tableHeaderCell removeCell" style={{ width: '30px', minWidth: '30px' }}></div>
                    </div>
                ))
            ) : (
                <div className="tableContent">
                    <div className="tableContentCell" style={{ textAlign: 'center', width: '100%' }}>
                        No prescriptions recorded.
                    </div>
                </div>
            )}
        </TableContent>
    );
}

export default PrescriptionContent;