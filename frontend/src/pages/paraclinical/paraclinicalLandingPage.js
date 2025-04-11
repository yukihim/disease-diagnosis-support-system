import React from 'react';
import PageLayout from '../../components/common/pageLayout';

import Calendar from '../../components/common/calendar';

// Import paraclinical technician landingpage components
import ParaclinicalIncomingPatient from '../../components/paraclinical/landingPage/paraclinicalIncomingPatient';

function ParaclinicalLandingPage() {
    return (
        <PageLayout requiredRole="paraclinical">
            <ParaclinicalIncomingPatient role="paraclinical" />
            
            <Calendar />
        </PageLayout>
    );
}

export default ParaclinicalLandingPage;