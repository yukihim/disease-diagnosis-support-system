import React from 'react';

import ComponentPagination from '../../../common/componentPagination';
import PrevButton from '../../../common/prevButton';
import NextButton from '../../../common/nextButton';
import PaginationText from '../../../common/paginationText';

function DoctorTodaysAppointmentPagination({ currentPage, totalPages, onPageChange }) {
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

export default DoctorTodaysAppointmentPagination;