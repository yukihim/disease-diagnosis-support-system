import React from 'react';
import './style/usersTableContent.css';

import TableContent from '../../../../common/tableContent';

function UsersTableContent({ userTableHeader, userTableData, onClickUser }) {
    const headers = userTableHeader;
    const data = userTableData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div key={index} className="tableContent tableContentIncomingPatient" onClick={() => onClickUser(row)}>
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            {row.user}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.role}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            {row.room}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[3].width, minWidth: headers[3].width }}>
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

export default UsersTableContent;