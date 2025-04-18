import React from 'react';

import ComponentPagination from '../../componentPagination';
import PrevButton from '../../prevButton';
import NextButton from '../../nextButton';
import PaginationText from '../../paginationText';

// Add new props: rowsPerPageOptions, currentRowsPerPage, onRowsPerPageChange
function PatientPassSessionsPagination({ currentPage, totalPages, onPageChange, rowsPerPageOptions, currentRowsPerPage, onRowsPerPageChange }) {
    const handleSelectChange = (event) => {
        onRowsPerPageChange(Number(event.target.value)); // Convert value to number
    };

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
                    htmlFor="rowsPerPageSelectPassSess" // Use a unique ID
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
                    id="rowsPerPageSelectPassSess" // Use a unique ID
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
                >
                    {rowsPerPageOptions.map(option => (
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
                disabled={currentPage === totalPages} // Disable if on the last page
            />
        </ComponentPagination>
    );
}

export default PatientPassSessionsPagination;