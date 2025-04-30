import React from 'react';
import '../../diagnosingPatient/doctorPatientDiagnosing/components/style/systemRecommendation.css';

import HuggedText from '../../../common/huggedText';

import SystemRecommendationTableHeader from '../../diagnosingPatient/doctorPatientDiagnosing/components/systemRecommendation/systemRecommendationTableHeader';
import SystemRecommendationTableContent from '../../diagnosingPatient/doctorPatientDiagnosing/components/systemRecommendation/systemRecommendationTableContent';

const systemRecommendationDiseaseTableHeader = [
    { name: 'Disease', width: 'auto' },
    { name: 'Probabilities', width: '150px' }
];

function DoctorFinalizingDiagnosisForPatientDiagnosisRecommendation({ patientDiagnosisRecommendation }) {
    return (
        <div className="systemRecommendation">
            <HuggedText text="System Recommendation:" font_size="14px" font_weight="600" color="#4E4B66" />

            <div className="systemRecommendationTable">
                {/* Table header */}
                <SystemRecommendationTableHeader systemRecommendationDiseaseTableHeader={systemRecommendationDiseaseTableHeader} />

                {/* Table content */}
                <SystemRecommendationTableContent systemRecommendationDiseaseTableHeader={systemRecommendationDiseaseTableHeader} systemRecommendationDiseaseTableData={patientDiagnosisRecommendation} />
            </div>
        </div>
    );
}

export default DoctorFinalizingDiagnosisForPatientDiagnosisRecommendation;