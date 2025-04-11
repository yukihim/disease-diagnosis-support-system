// import React from 'react';

// import TableContent from '../../../common/tableContent';

// function DoctorPrescriptionAndProcedurePrescriptionsCardTable({ patientPrescriptionTableHeader, patientPrescriptionTableData }) {
//     const headers = patientPrescriptionTableHeader;
//     const data = patientPrescriptionTableData;

//     return (
//         <TableContent>
//             {data.length > 0 ? (
//                 data.map((row, index) => (
//                     <div key={index} className="tableContent tableContentPatientFound">
//                         <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
//                             {row.medicine}
//                         </div>
//                         <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
//                             {row.am}
//                         </div>
//                         <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
//                             {row.noon}
//                         </div>
//                         <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
//                             {row.pm}
//                         </div>
//                         <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
//                             {row.duration}
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <div className="tableContent">
//                     <div className="tableContentCell">
//                         No data
//                     </div>
//                 </div>
//             )}
//         </TableContent>
//     );
// }

// export default DoctorPrescriptionAndProcedurePrescriptionsCardTable;



















import React from 'react';
import './style/doctorPrescriptionAndProcedurePrescriptionsCardTable.css';

import TableContent from '../../../common/tableContent';

function DoctorPrescriptionAndProcedurePrescriptionsCardTable({ 
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
                                value={row.medicine}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'medicine', e.target.value)}
                                placeholder="(e.g. Paracetamol 500 mg)"
                                className="prescriptionInput"
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            <input
                                type="text"
                                value={row.morning}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'morning', e.target.value)}
                                placeholder="(e.g. 1)"
                                className="prescriptionInput"
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            <input
                                type="text"
                                value={row.noon}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'noon', e.target.value)}
                                placeholder="(e.g. 1)"
                                className="prescriptionInput"
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[3].width, minWidth: headers[3].width }}>
                            <input
                                type="text"
                                value={row.afternoon}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'afternoon', e.target.value)}
                                placeholder="(e.g. 1)"
                                className="prescriptionInput"
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[4].width, minWidth: headers[4].width }}>
                            <input
                                type="text"
                                value={row.evening}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'evening', e.target.value)}
                                placeholder="(e.g. 1)"
                                className="prescriptionInput"
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[5].width, minWidth: headers[5].width }}>
                            <input
                                type="text"
                                value={row.duration}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'duration', e.target.value)}
                                placeholder="(e.g. 5 days)"
                                className="prescriptionInput"
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[6].width, minWidth: headers[6].width }}>
                            <input
                                type="text"
                                value={row.note}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'note', e.target.value)}
                                placeholder="(e.g. Take with food)"
                                className="prescriptionInput"
                            />
                        </div>
                        {/* <div className="tableContentCell removeCell">
                            {data.length > 1 && (
                                <button 
                                    className="removeButton" 
                                    onClick={() => onRemovePrescription(rowIndex)}
                                    title="Remove this prescription"
                                >
                                    ×
                                </button>
                            )}
                        </div> */}
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

export default DoctorPrescriptionAndProcedurePrescriptionsCardTable;