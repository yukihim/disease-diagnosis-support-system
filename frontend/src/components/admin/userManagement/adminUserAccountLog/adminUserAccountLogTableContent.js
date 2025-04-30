import React from 'react';
import TableContent from '../../../common/tableContent'; // Assuming TableContent is in common folder
// Import CSS if needed: import './style/adminUserAccountLogTableContent.css';

function AdminUserAccountLogTableContent({ userAccountLogTableHeader, userAccountLogTableData, onClickSession }) {
    // No need for separate headers variable
    const data = userAccountLogTableData;

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, rowIndex) => (
                    <div key={rowIndex} className="tableContent tableContentPatientFound" onClick={() => onClickSession(row)}>
                        {userAccountLogTableHeader.map((header, headerIndex) => {
                            // Determine the key to access data: prioritize dataKey, fallback to lowercase name
                            const keyToAccess = header.dataKey || header.name.toLowerCase();
                            const cellData = row[keyToAccess];

                            return (
                                <div
                                    key={headerIndex}
                                    className="tableContentCell"
                                    style={{ width: header.width, minWidth: header.width }}
                                >
                                    {/* Display data or 'N/A' if undefined/null */}
                                    {cellData !== undefined && cellData !== null ? cellData : 'N/A'}
                                </div>
                            );
                        })}
                    </div>
                ))
            ) : (
                <div className="tableContent">
                    {/* Adjust the no data message if needed */}
                    <div className="tableContentCell" style={{ width: '100%', textAlign: 'center' }}>
                        No log data available for this user
                    </div>
                </div>
            )}
        </TableContent>
    );
}

export default AdminUserAccountLogTableContent;