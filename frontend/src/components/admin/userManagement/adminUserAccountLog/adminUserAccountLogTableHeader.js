// import React from 'react';

// import TableHeader from '../../../common/tableHeader';

// function AdminUserAccountLogTableHeader({ userAccountLogTableHeader }) {
//     const headers = userAccountLogTableHeader;
    
//     return (
//         <TableHeader>
//             {headers.length > 0 ? (
//                 headers.map((header, index) => (
//                     <div
//                         key={index}
//                         className="tableHeaderCell"
//                         style={{ width: header.width, minWidth: header.width }}
//                     >
//                         {header.name}
//                     </div>
//                 ))
//             ) : (
//                 <div className="tableHeaderCell">
//                     No data
//                 </div>
//             )}
//         </TableHeader>
//     );
// }

// export default AdminUserAccountLogTableHeader;




























import React from 'react';
import TableHeader from '../../../common/tableHeader';
import SortIcon from '../../../common/sortIcon'; // Import SortIcon

function AdminUserAccountLogTableHeader({ userAccountLogTableHeader, onSort, sortConfig }) { // Add onSort and sortConfig props
    const headers = userAccountLogTableHeader;

    // Helper function to get the current sort direction for a column
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
                        className="tableHeaderCell" // Consider adding specific styles if needed
                        style={{ width: header.width, minWidth: header.width }}
                    >
                        {/* Wrap content for flex layout */}
                        <div className="headerContent">
                            <span>{header.name}</span>
                            {/* Add SortIcon */}
                            <SortIcon
                                direction={getSortDirection(header.name)}
                                onClick={() => onSort(header.name)} // Call onSort when clicked
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

export default AdminUserAccountLogTableHeader;