import React from 'react';
import './style/systemRecommendation.css';

import HuggedText from '../../../../common/huggedText';

import SystemRecommendationTableHeader from './systemRecommendation/systemRecommendationTableHeader';
import SystemRecommendationTableContent from './systemRecommendation/systemRecommendationTableContent';

const systemRecommendationDiseaseTableHeader = [
    { name: 'Disease', width: 'auto' },
    { name: 'Probabilities', width: '150px' }
];

// Accept recommendationsData as a prop
function SystemRecommendation({ recommendationsData }) {
    return (
        <div className="systemRecommendation">
            <HuggedText text="System Recommendation:" font_size="14px" font_weight="600" color="#4E4B66" />

            <div className="systemRecommendationTable">
                {/* Table header */}
                <SystemRecommendationTableHeader systemRecommendationDiseaseTableHeader={systemRecommendationDiseaseTableHeader} />

                {/* Table content - Pass the received recommendationsData */}
                <SystemRecommendationTableContent
                    systemRecommendationDiseaseTableHeader={systemRecommendationDiseaseTableHeader}
                    systemRecommendationDiseaseTableData={recommendationsData || []} // Use received data, default to empty array
                />
            </div>
        </div>
    );
}

export default SystemRecommendation;