import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageLayout from '../../components/common/pageLayout';

// Import paraclinical patient test components
import PatientInformationCard from '../../components/common/patientInformationCard';
import ParaclinicalPatientTestAdditionalInformation from '../../components/paraclinical/patientTest/paraclinicalPatientTestAdditionalInformation';
import ParaclinicalPatientTestTestingCard from '../../components/paraclinical/patientTest/paraclinicalPatientTestTestingCard';
import ParaclinicalPatientTestFinishTestingButton from '../../components/paraclinical/patientTest/paraclinicalPatientTestFinishTestingButton';

function ParaclinicalPatientTest() {
    const location = useLocation();
    const [patientState, setPatientState] = useState(location.state?.patientState); // Default state
    console.log("ParaclinicalPatientTest _ Patient State:", patientState);

    return (
        <PageLayout requiredRole="paraclinical" useGrid={false}>
            {/* Patient Information Card */}
            <PatientInformationCard className='bigBoxForParaclinic' />

            {/* Paraclinical Patient Test Additional Information */}
            <ParaclinicalPatientTestAdditionalInformation />

            {/* Paraclinical Patient Test Testing Card */}
            <ParaclinicalPatientTestTestingCard />

            {/* Finish Testing Button */}
            <ParaclinicalPatientTestFinishTestingButton patientState={patientState} />
        </PageLayout>
    );
}

export default ParaclinicalPatientTest;