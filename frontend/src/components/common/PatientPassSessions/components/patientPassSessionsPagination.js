import React from 'react';

import ComponentPagination from '../../componentPagination';
import PrevButton from '../../prevButton';
import NextButton from '../../nextButton';
import PaginationText from '../../paginationText';

function PatientPassSessionsPagination() {
    return (
        <ComponentPagination>
            <PrevButton />
            <PaginationText>
                01/01
            </PaginationText>
            <NextButton />
        </ComponentPagination>
    );
}

export default PatientPassSessionsPagination;