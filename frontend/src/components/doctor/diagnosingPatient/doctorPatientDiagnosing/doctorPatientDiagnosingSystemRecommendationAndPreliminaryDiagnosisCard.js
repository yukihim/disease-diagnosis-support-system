import React from 'react';
import './style/doctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosisCard.css';

import SystemRecommendation from './components/systemRecommendation';
import PreliminaryDiagnosis from './components/preliminaryDiagnosis';

function DoctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosisCard({ preliminaryDiagnosis, setPreliminaryDiagnosis }) {
    return (
        <div className="doctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosisCard">
            <SystemRecommendation />
            <PreliminaryDiagnosis preliminaryDiagnosis={preliminaryDiagnosis} setPreliminaryDiagnosis={setPreliminaryDiagnosis} />
        </div>
    );
}

export default DoctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosisCard;