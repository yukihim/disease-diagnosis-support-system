import React from 'react';

import TableContent from '../../../common/tableContent';

const emergencyTableHeader = [
    { name: 'Case', width: '130px' },
    { name: 'Time', width: '70px' },
    { name: 'Dept', width: '80px' }
];

const emergencyTableDummyData = [
    { case: 'Car Accident', time: '10:00 AM', dept: 'Lão - Nội' },
    { case: 'Car Accident', time: '10:00 AM', dept: 'Unassigned' },
    { case: 'Car Accident', time: '10:00 AM', dept: 'Unassigned' },
];

function ReceptionistEmergencyTableContent() {
    const headers = emergencyTableHeader;
    const data = emergencyTableDummyData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div key={index} className="tableContent">
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            {row.case}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.time}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            {row.dept}
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

export default ReceptionistEmergencyTableContent;