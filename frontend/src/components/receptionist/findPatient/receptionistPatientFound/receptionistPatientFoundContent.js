import React from 'react';
import './style/receptionistPatientFoundContent.css';

import TableContent from '../../../common/tableContent';

const patientFoundTableHeader = [
    { name: 'Patient Name', width: '230px' },
    { name: 'Social Security Number', width: '200px' },
    { name: 'Health Insurance Code', width: '300px' }
];

const patientFoundTableDummyData = [
    { patientName: 'Phuong Xuong Thinh', ssn: '079283868386', healthInsuranceCode: 'HS-4-79-793 778 6132' },
];

function ReceptionistPatientFoundContent({ onClickPatient }) {
    const headers = patientFoundTableHeader;
    const data = patientFoundTableDummyData;

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
                            {row.healthInsuranceCode}
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