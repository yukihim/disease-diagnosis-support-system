import React from 'react';

import TableContent from '../../../../../common/tableContent';

function SystemRecommendationTableContent({ systemRecommendationDiseaseTableHeader, systemRecommendationDiseaseTableData, onClickPatient }) {
    const headers = systemRecommendationDiseaseTableHeader;
    const data = systemRecommendationDiseaseTableData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div key={index} className="tableContent tableContentPatientFound" onClick={() => onClickPatient(row)}>
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            {row.disease}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.probabilities}
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

export default SystemRecommendationTableContent;