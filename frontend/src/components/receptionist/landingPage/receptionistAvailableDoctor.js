import React from 'react';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistAvailableDoctorPagination from './receptionistAvailableDoctor/receptionistAvailableDoctorPagination';
import ReceptionistAvailableDoctorContent from './receptionistAvailableDoctor/receptionistAvailableDoctorContent';

function ReceptionistAvailableDoctor() {
    return (
        <BoxContainer>
            <BoxContainerTitle className="greenTitle">
                Available Doctors
            </BoxContainerTitle>
            <BoxContainerContent>
                {/* Pagination */}
                <ReceptionistAvailableDoctorPagination />

                {/* Content */}
                <ReceptionistAvailableDoctorContent />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistAvailableDoctor;
