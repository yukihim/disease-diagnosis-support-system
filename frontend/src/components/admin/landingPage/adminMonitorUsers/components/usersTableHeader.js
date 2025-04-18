import React from 'react';
import SortIcon from '../../../../common/sortIcon';
import TableHeader from '../../../../common/tableHeader';

function UsersTableHeader({ userTableHeader, onSort, sortConfig }) {
    const headers = userTableHeader;

    const getSortDirection = (name) => {
        if (!sortConfig) return null;
        return sortConfig.key === name ? sortConfig.direction : null;
    };

    return (
        <TableHeader>
            {headers.length > 0 ? (
                headers.map((header, index) => (
                    <div
                        key={index}
                        className="tableHeaderCell"
                        style={{ width: header.width, minWidth: header.width }}
                    >
                        <div className="headerContent">
                            <span>{header.name}</span>
                            <SortIcon 
                                direction={getSortDirection(header.name)} 
                                onClick={() => onSort(header.name)}
                            />
                        </div>
                    </div>
                ))
            ) : (
                <div className="tableHeaderCell">
                    No data
                </div>
            )}
        </TableHeader>
    );
}

export default UsersTableHeader;