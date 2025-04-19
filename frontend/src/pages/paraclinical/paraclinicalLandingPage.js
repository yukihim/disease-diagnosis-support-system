import React from 'react';
import PageLayout from '../../components/common/pageLayout';

import Calendar from '../../components/common/calendar';

// Import paraclinical technician landingpage components
import ParaclinicalIncomingPatient from '../../components/paraclinical/landingPage/paraclinicalIncomingPatient';

function ParaclinicalLandingPage() {
    return (
        <PageLayout requiredRole="paraclinical">
            <ParaclinicalIncomingPatient role="paraclinical" />
            
            {/* Component to track done test patients component */}

            <Calendar />
        </PageLayout>
    );
}

export default ParaclinicalLandingPage;