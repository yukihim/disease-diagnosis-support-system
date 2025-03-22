import React from 'react';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistEmergencyOverview from './receptionistEmergency/receptionistEmergencyOverview';
import ReceptionistEmergencyPagination from './receptionistEmergency/receptionistEmergencyPagination';
import ReceptionistEmergencyTableHeader from './receptionistEmergency/receptionistEmergencyTableHeader';
import ReceptionistEmergencyTableContent from './receptionistEmergency/receptionistEmergencyTableContent';


function ReceptionistEmergency() {
    return (
        <BoxContainer>
            {/* Design emergency component here */}
            <BoxContainerTitle>
                Emergency
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <ReceptionistEmergencyOverview />

                {/* Pagination */}
                <ReceptionistEmergencyPagination />

                {/* Table header */}
                <ReceptionistEmergencyTableHeader />

                {/* Table content */}
                <ReceptionistEmergencyTableContent />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistEmergency;