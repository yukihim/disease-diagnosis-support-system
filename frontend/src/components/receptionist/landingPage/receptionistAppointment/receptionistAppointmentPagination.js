import React from 'react';

import ComponentPagination from '../../../common/componentPagination';
import PrevButton from '../../../common/prevButton';
import NextButton from '../../../common/nextButton';
import PaginationText from '../../../common/paginationText';

function ReceptionistAppointmentPagination() {
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

export default ReceptionistAppointmentPagination;