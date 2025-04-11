import React from 'react';

import TableHeader from '../../../common/tableHeader';

function DoctorPrescriptionAndProcedureProceduresCardHeader({ patientProcedureTableHeader }) {
    const headers = patientProcedureTableHeader;
    
    return (
        <TableHeader>
            {headers.length > 0 ? (
                <>
                    {headers.map((header, index) => (
                        <div
                            key={index}
                            className="tableHeaderCell"
                            style={{ width: header.width, minWidth: header.width }}
                        >
                            {header.name}
                        </div>
                    ))}
                    {/* Empty header cell for the remove button column */}
                    <div className="tableHeaderCell removeCell" style={{ width: '30px', minWidth: '30px' }}></div>
                </>
            ) : (
                <div className="tableHeaderCell">
                    No data
                </div>
            )}
        </TableHeader>
    );
}

export default DoctorPrescriptionAndProcedureProceduresCardHeader;