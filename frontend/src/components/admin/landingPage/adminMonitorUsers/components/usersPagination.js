import React from 'react';

import ComponentPagination from '../../../../common/componentPagination';
import PrevButton from '../../../../common/prevButton';
import NextButton from '../../../../common/nextButton';
import PaginationText from '../../../../common/paginationText';

// Add new props: rowsPerPageOptions, currentRowsPerPage, onRowsPerPageChange
function UsersPagination({ currentPage, totalPages, onPageChange, rowsPerPageOptions, currentRowsPerPage, onRowsPerPageChange }) {
    const handleSelectChange = (event) => {
        onRowsPerPageChange(Number(event.target.value));
    };

    return (
        <ComponentPagination>
            <div style={{
                marginRight: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
            }}>
                <label
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
                    id="rowsPerPageSelect"
                    value={currentRowsPerPage}
                    onChange={handleSelectChange}
                    style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '13px',
                        color: '#4E4B66',
                        // fontWeight: 400,
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

export default UsersPagination;