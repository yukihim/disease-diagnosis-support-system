import React from 'react';
import './style/doctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosisCard.css';

import SystemRecommendation from './components/systemRecommendation';
import PreliminaryDiagnosis from './components/preliminaryDiagnosis';

// Accept systemRecommendations as a prop
function DoctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosisCard({ systemRecommendations, preliminaryDiagnosis, setPreliminaryDiagnosis }) {
    return (
        <div className="doctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosisCard">
            {/* Pass the received recommendations data to the SystemRecommendation component */}
            <SystemRecommendation recommendationsData={systemRecommendations} />
            <PreliminaryDiagnosis preliminaryDiagnosis={preliminaryDiagnosis} setPreliminaryDiagnosis={setPreliminaryDiagnosis} />
        </div>
    );
}

export default DoctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosisCard;