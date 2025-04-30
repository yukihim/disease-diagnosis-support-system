import React from 'react';
import TableHeader from '../../tableHeader'; // Assuming TableHeader is in common
import SortIcon from '../../sortIcon'; // Assuming SortIcon is in common

// Add onSort and sortConfig props
function PatientPassSessionsHeader({ patientPassSessionsTableHeader, onSort, sortConfig }) {
    const headers = patientPassSessionsTableHeader;

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
                        className="tableHeaderCell sortableHeaderCell" // Add a class for styling/cursor
                        style={{ width: header.width, minWidth: header.width }}
                        onClick={() => onSort(header.name)} // Call onSort when header is clicked
                    >
                        {/* Wrap content for flex layout */}
                        <div className="headerContent">
                            <span>{header.name}</span>
                            {/* Add SortIcon */}
                            <SortIcon
                                direction={getSortDirection(header.name)}
                                // onClick is handled by the parent div now, but could be placed here too
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

export default PatientPassSessionsHeader;