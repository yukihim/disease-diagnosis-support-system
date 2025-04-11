import React from 'react';
import './style/doctorPatientSentForParaclinicalTestTableContent.css';

import TableContent from '../../../common/tableContent';

function DoctorPatientSentForParaclinicalTestTableContent({ patientSentForParaclinicalTestTableHeader, patientSentForParaclinicalTestTableData, onClickPatientSentForParaclinicalTest }) {
    const headers = patientSentForParaclinicalTestTableHeader;
    const data = patientSentForParaclinicalTestTableData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div key={index} className="tableContent tableContentPatientSentForParaclinicalTest" onClick={() => onClickPatientSentForParaclinicalTest(row)}>
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            {row.name}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.test}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            {row.state}
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

export default DoctorPatientSentForParaclinicalTestTableContent;