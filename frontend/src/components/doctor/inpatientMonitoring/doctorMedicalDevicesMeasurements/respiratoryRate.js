// import React from 'react';
// import './style/measurementCard.css';

// import BoxContainer from '../../../common/boxContainer';
// import BoxContainerTitle from '../../../common/boxContainerTitle';
// import BoxContainerContent from '../../../common/boxContainerContent';

// import RespiratoryRateIcon from '../../../../assets/images/doctor/respiratoryRateIcon.png';

// import HuggedText from '../../../common/huggedText';
// import LineChartComponent from '../../../common/lineChart'; // Import the chart component

// function RespiratoryRate() {
//     // Note: The current LineChartComponent uses 'bpm'. You'll need to adapt it
//     // or create a specific chart component for respiratory rate (rpm).
//     // For now, it will display the default BPM chart.
//     return (
//         <BoxContainer className='cardBox respiratoryRate'>
//             <BoxContainerTitle className='cardTitle'>
//                 <img src={RespiratoryRateIcon} alt="Respiratory Rate Icon" className='icon' />
//                 Respiratory Rate
//             </BoxContainerTitle>

//             <BoxContainerContent className='cardContent'>
//                 {/* Existing Stats */}
//                 <div className="measurementStats">
//                     <div className="measurementValue">
//                         <HuggedText text='15' font_size="32px" font_weight="400" color="#272927" />
//                         <HuggedText text='rpm' font_size="16px" font_weight="400" color="#818181" />
//                     </div>
//                     <div className="measurementStatus" style={{ backgroundColor: '#4CAF50' }}>
//                         <HuggedText text='Normal' font_size="16px" font_weight="400" color="#FFF" />
//                     </div>
//                 </div>

//                 {/* Add Line Chart */}
//                 <div className="chartContainer" style={{ marginTop: '20px', width: '100%', height: '150px' }}> {/* Adjust height as needed */}
//                     <LineChartComponent /> {/* Needs adaptation for RPM data */}
//                 </div>
//             </BoxContainerContent>
//         </BoxContainer>
//     );
// }

// export default RespiratoryRate;























































import React, { useMemo } from 'react'; // Import useMemo
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import RespiratoryRateIcon from '../../../../assets/images/doctor/respiratoryRateIcon.png';

import HuggedText from '../../../common/huggedText';
import LineChartComponent from '../../../common/lineChart';

// Mock Data Generation
const generateMockRespRateData = (numPoints = 12) => {
    const data = [];
    let currentRate = 16;
    for (let i = 0; i < numPoints; i++) {
        const time = `${String(i * 2).padStart(2, '0')}:00`;
        const change = (Math.random() - 0.5) * 4; // Variation for resp rate
        currentRate = Math.max(10, Math.min(25, Math.round(currentRate + change))); // Bounds for resp rate

        // Round the bounded rate to 2 decimal places and update currentRate
        currentRate = parseFloat(currentRate.toFixed(2));
        data.push({ time, respRate: currentRate });
    }
    return data;
};

const SAFE_RANGE_RESP = { low: 12, high: 20 }; // Example safe range

function RespiratoryRate() {
    const mockData = useMemo(() => generateMockRespRateData(), []);
    const latestMeasurement = mockData.length > 0 ? mockData[mockData.length - 1].respRate : 'N/A';
    const latestStatus = latestMeasurement >= SAFE_RANGE_RESP.low && latestMeasurement <= SAFE_RANGE_RESP.high ? 'Normal' : (latestMeasurement < SAFE_RANGE_RESP.low ? 'Low' : 'High');
    const statusColor = latestStatus === 'Normal' ? '#4CAF50' : '#F44336';

    return (
        <BoxContainer className='cardBox respiratoryRate'>
            <BoxContainerTitle className='cardTitle'>
                <img src={RespiratoryRateIcon} alt="Respiratory Rate Icon" className='cardIcon' /> {/* Changed class to cardIcon */}
                Respiratory Rate
            </BoxContainerTitle>

            <BoxContainerContent className='cardContent'>
                {/* Display Latest Stats */}
                <div className="measurementStats">
                    <div className="measurementValue">
                        <HuggedText text={latestMeasurement.toString()} font_size="32px" font_weight="400" color="#272927" />
                        <HuggedText text='rpm' font_size="16px" font_weight="400" color="#818181" />
                    </div>
                    <div className="measurementStatus" style={{ backgroundColor: statusColor }}>
                        <HuggedText text={latestStatus} font_size="16px" font_weight="400" color="#FFF" />
                    </div>
                </div>

                {/* Add Line Chart */}
                <div className="chartContainer" style={{ marginTop: '15px', width: '100%', height: '300px' }}>
                    <LineChartComponent
                        data={mockData}
                        dataKeys={['respRate']} // Pass dataKey as an array
                        unit="rpm"
                        safeRange={SAFE_RANGE_RESP}
                        chartName="Resp. Rate"
                        height={300}
                    />
                </div>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default RespiratoryRate;