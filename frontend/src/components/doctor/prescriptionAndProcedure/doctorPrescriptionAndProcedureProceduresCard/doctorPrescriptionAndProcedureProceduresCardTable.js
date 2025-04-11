import React from 'react';
import './style/doctorPrescriptionAndProcedureProceduresCardTable.css';

import TableContent from '../../../common/tableContent';

function DoctorPrescriptionAndProcedureProceduresCardTable({ 
    patientPrescriptionTableHeader, 
    patientPrescriptionTableData,
    onPrescriptionChange,
    onRemovePrescription
}) {
    const headers = patientPrescriptionTableHeader;
    const data = patientPrescriptionTableData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, rowIndex) => (
                    <div key={rowIndex} className="tableContent prescriptionRow">
                        <div className="tableContentCellNoPadding" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            <input
                                type="text"
                                value={row.procedure}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'procedure', e.target.value)}
                                placeholder="(e.g. Nasal Irrigation)"
                                className="prescriptionInput"
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            <input
                                type="text"
                                value={row.datetime}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'datetime', e.target.value)}
                                placeholder="(e.g. 12/13/2024, 08:30 AM)"
                                className="prescriptionInput"
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            <input
                                type="text"
                                value={row.note}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'note', e.target.value)}
                                placeholder="(e.g. Patient is allergic to penicillin)"
                                className="prescriptionInput"
                            />
                        </div>
                        {/* Modify just the remove cell part */}
                        <div className="tableContentCellNoPadding removeCell" style={{ width: '30px', minWidth: '30px' }}>
                            {data.length > 1 && (
                                <button 
                                    className="removeButton" 
                                    onClick={() => onRemovePrescription(rowIndex)}
                                    title="Remove this prescription"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="tableContent">
                    <div className="tableContentCell">
                        No prescriptions added yet
                    </div>
                </div>
            )}
        </TableContent>
    );
}

export default DoctorPrescriptionAndProcedureProceduresCardTable;