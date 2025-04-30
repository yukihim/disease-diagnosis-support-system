import React from 'react';
import './style/usersTableContent.css';

import TableContent from '../../../../common/tableContent';

function UsersTableContent({ userTableHeader, userTableData, onClickUser }) {
    // No need to alias headers, use userTableHeader directly for clarity
    const data = userTableData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, rowIndex) => (
                    <div key={rowIndex} className="tableContent tableContentIncomingPatient" onClick={() => onClickUser(row)}>
                        {userTableHeader.map((header, headerIndex) => (
                            <div
                                key={headerIndex}
                                className="tableContentCell"
                                style={{ width: header.width, minWidth: header.width }}
                            >
                                {/* Access row data using the dataKey defined in the header */}
                                {row[header.dataKey] !== undefined && row[header.dataKey] !== null ? row[header.dataKey] : 'N/A'}
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <div className="tableContent">
                    {/* Adjust the no data message if needed */}
                    <div className="tableContentCell" style={{ width: '100%', textAlign: 'center' }}>
                        No user data available
                    </div>
                </div>
            )}
        </TableContent>
    );
}

export default UsersTableContent;