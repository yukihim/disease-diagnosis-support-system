import React from 'react';

import ComponentPagination from '../../../common/componentPagination';
import PrevButton from '../../../common/prevButton';
import NextButton from '../../../common/nextButton';
import PaginationText from '../../../common/paginationText';

// Add new props: rowsPerPageOptions, currentRowsPerPage, onRowsPerPageChange
function DoctorInpatientMonitoringPagination({ currentPage, totalPages, onPageChange, rowsPerPageOptions, currentRowsPerPage, onRowsPerPageChange }) {
    const handleSelectChange = (event) => {
        onRowsPerPageChange(Number(event.target.value)); // Convert value to number
    };

    // Ensure rowsPerPageOptions is an array before mapping
    const options = Array.isArray(rowsPerPageOptions) ? rowsPerPageOptions : [];

    return (
        <ComponentPagination>
            {/* Dropdown for Rows Per Page */}
            <div style={{
                marginRight: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
            }}>
                <label
                    htmlFor="rowsPerPageSelectInpatient" // Use a unique ID
                    style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#4E4B66',
                        whiteSpace: 'nowrap'
                    }}
                >
                    Rows Per Page:
                </label>
                <select
                    id="rowsPerPageSelectInpatient" // Use a unique ID
                    value={currentRowsPerPage}
                    onChange={handleSelectChange}
                    style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '13px',
                        color: '#4E4B66',
                        padding: '6px 10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        lineHeight: '1.5'
                    }}
                    disabled={!options.length} // Disable if no options provided
                >
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* Existing Pagination Controls */}
            <PrevButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1} // Disable if on the first page
            />
            <PaginationText>
                {String(currentPage).padStart(2, '0')}/{String(totalPages || 1).padStart(2, '0')}
            </PaginationText>
            <NextButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0} // Disable if on the last page or no pages
            />
        </ComponentPagination>
    );
}

export default DoctorInpatientMonitoringPagination;