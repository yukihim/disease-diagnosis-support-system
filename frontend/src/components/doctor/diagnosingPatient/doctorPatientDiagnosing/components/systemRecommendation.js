// import React from 'react';
// import './style/systemRecommendation.css';

// import HuggedText from '../../../../common/huggedText';

// import SystemRecommendationTableHeader from './systemRecommendation/systemRecommendationTableHeader';
// import SystemRecommendationTableContent from './systemRecommendation/systemRecommendationTableContent';

// const systemRecommendationDiseaseTableHeader = [
//     { name: 'Disease', width: 'auto' },
//     { name: 'Probabilities', width: '150px' }
// ];

// const systemRecommendationDiseaseTableDummyData = [
//     { disease: 'Influenza (Flu)', probabilities: '60%' },
//     { disease: 'Strep Throat', probabilities: '20%' },
//     { disease: 'Sore Throat', probabilities: '20%' },
// ];

// function SystemRecommendation() {
//     return (
//         <div className="systemRecommendation">
//             <HuggedText text="System Recommendation:" font_size="14px" font_weight="600" color="#000000" />

//             <div className="systemRecommendationTable">
//                 {/* Table header */}
//                 <SystemRecommendationTableHeader systemRecommendationDiseaseTableHeader={systemRecommendationDiseaseTableHeader} />

//                 {/* Table content */}
//                 <SystemRecommendationTableContent systemRecommendationDiseaseTableHeader={systemRecommendationDiseaseTableHeader} systemRecommendationDiseaseTableData={systemRecommendationDiseaseTableDummyData} />
//             </div>
//         </div>
//     );
// }

// export default SystemRecommendation;
























// filepath: d:\WORK\_SUBJECT\_ĐATN\src\disease-diagnosis-support-system\frontend\src\components\doctor\diagnosingPatient\doctorPatientDiagnosing\components\systemRecommendation.js
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
            <HuggedText text="System Recommendation:" font_size="14px" font_weight="600" color="#000000" />

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