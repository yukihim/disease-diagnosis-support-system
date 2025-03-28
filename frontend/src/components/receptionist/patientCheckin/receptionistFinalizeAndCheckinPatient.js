import React from 'react';
import './style/receptionistFinalizeAndCheckinPatient.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistFinalizeAndCheckinPatientReasonToVisit from './receptionistFinalizeAndCheckinPatient/receptionistFinalizeAndCheckinPatientReasonToVisit';
import ReceptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment from './receptionistFinalizeAndCheckinPatient/receptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment';
import ReceptionistFinalizeAndCheckinPatientCheckinButton from './receptionistFinalizeAndCheckinPatient/receptionistFinalizeAndCheckinPatientCheckinButton';

function ReceptionistFinalizeAndCheckinPatient() {
    return (
        <BoxContainer className='receptionistPatientCheckInBox'>
            {/* Design finalize and check in for patient component here */}
            <BoxContainerTitle className='receptionistPatientCheckIn'>
                Finalize and Check-in Patient
            </BoxContainerTitle>

            <BoxContainerContent className='receptionistPatientCheckInContent'>
                {/* Reason to visit */}
                <ReceptionistFinalizeAndCheckinPatientReasonToVisit />

                {/* Choose Department & Doctor */}
                <ReceptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment />

                {/* Check in for patient button */}
                <ReceptionistFinalizeAndCheckinPatientCheckinButton />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistFinalizeAndCheckinPatient;