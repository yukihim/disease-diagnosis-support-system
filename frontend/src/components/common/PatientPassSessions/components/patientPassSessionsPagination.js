import React from 'react';

import ComponentPagination from '../../componentPagination';
import PrevButton from '../../prevButton';
import NextButton from '../../nextButton';
import PaginationText from '../../paginationText';

function PatientPassSessionsPagination({ currentPage, totalPages, onPageChange }) {
    return (
        <ComponentPagination>
            <PrevButton 
                onClick={() => onPageChange(currentPage - 1)}
            />
            <PaginationText>
                {String(currentPage).padStart(2, '0')}/{String(totalPages || 1).padStart(2, '0')}
            </PaginationText>
            <NextButton 
                onClick={() => onPageChange(currentPage + 1)}
            />
        </ComponentPagination>
    );
}

export default PatientPassSessionsPagination;