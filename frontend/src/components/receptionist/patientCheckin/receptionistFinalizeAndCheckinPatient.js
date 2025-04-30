import React, { useState } from 'react'; // Added useState
import { useLocation } from 'react-router-dom'; // Added useLocation
import './style/receptionistFinalizeAndCheckinPatient.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistFinalizeAndCheckinPatientReasonToVisit from './receptionistFinalizeAndCheckinPatient/receptionistFinalizeAndCheckinPatientReasonToVisit';
import ReceptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment from './receptionistFinalizeAndCheckinPatient/receptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment';
import ReceptionistFinalizeAndCheckinPatientCheckinButton from './receptionistFinalizeAndCheckinPatient/receptionistFinalizeAndCheckinPatientCheckinButton';

// Removed hardcoded followUpDoctor and followUpDepartment

function ReceptionistFinalizeAndCheckinPatient() {
    // State for the form fields managed by this parent component
    const [reasonToVisit, setReasonToVisit] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');

    // Get sessionID from location state
    const location = useLocation();
    // Adjust key based on how it was pushed in ReceptionistPatientFound
    const sessionID = location.state?.sessionID || location.state?.patientName;

    return (
        <BoxContainer className='receptionistPatientCheckInBox'>
            <BoxContainerTitle className='receptionistPatientCheckIn'>
                Finalize and Check-in Patient
            </BoxContainerTitle>

            <BoxContainerContent className='receptionistPatientCheckInContent'>
                {/* Reason to visit - Pass state and setter */}
                <ReceptionistFinalizeAndCheckinPatientReasonToVisit
                    reasonToVisit={reasonToVisit}
                    setReasonToVisit={setReasonToVisit}
                />

                {/* Choose Department & Doctor - Pass state, setters, and sessionID */}
                <ReceptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment
                    sessionID={sessionID} // Pass sessionID down
                    selectedDepartment={selectedDepartment}
                    setSelectedDepartment={setSelectedDepartment}
                    selectedDoctor={selectedDoctor}
                    setSelectedDoctor={setSelectedDoctor}
                    setReasonToVisit={setReasonToVisit} // Pass setter for reason
                />

                {/* Check in for patient button - Pass necessary data for API call */}
                <ReceptionistFinalizeAndCheckinPatientCheckinButton
                    sessionID={sessionID}
                    reasonToVisit={reasonToVisit}
                    department={selectedDepartment}
                    doctor={selectedDoctor}
                />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistFinalizeAndCheckinPatient;