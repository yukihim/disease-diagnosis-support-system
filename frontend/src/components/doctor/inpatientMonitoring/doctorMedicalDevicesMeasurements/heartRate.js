// import React from 'react';
// import './style/measurementCard.css';

// import BoxContainer from '../../../common/boxContainer';
// import BoxContainerTitle from '../../../common/boxContainerTitle';
// import BoxContainerContent from '../../../common/boxContainerContent';

// import HeartRateIcon from '../../../../assets/images/doctor/heartRateIcon.png';

// import HuggedText from '../../../common/huggedText';
// import LineChartComponent from '../../../common/lineChart'; // Import the chart component

// function HeartRate() {
//     return (
//         <BoxContainer className='cardBox heartRate'>
//             <BoxContainerTitle className='cardTitle'>
//                 <img src={HeartRateIcon} alt="Heart Rate Icon" className='cardIcon' />
//                 Heart Rate
//             </BoxContainerTitle>

//             <BoxContainerContent className='cardContent'>
//                 {/* Existing Stats */}
//                 <div className="measurementStats">
//                     <div className="measurementValue">
//                         <HuggedText text='98' font_size="32px" font_weight="400" color="#272927" />
//                         <HuggedText text='bpm' font_size="16px" font_weight="400" color="#818181" />
//                     </div>
//                     <div className="measurementStatus" style={{ backgroundColor: '#4CAF50' }}>
//                         <HuggedText text='Normal' font_size="16px" font_weight="400" color="#FFF" />
//                     </div>
//                 </div>

//                 {/* Add Line Chart */}
//                 <div className="chartContainer" style={{ marginTop: '20px', width: '100%', height: '150px' }}> {/* Adjust height as needed */}
//                     <LineChartComponent />
//                 </div>
//             </BoxContainerContent>
//         </BoxContainer>
//     );
// }

// export default HeartRate;





















































import React, { useMemo } from 'react'; // Import useMemo
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import HeartRateIcon from '../../../../assets/images/doctor/heartRateIcon.png';

import HuggedText from '../../../common/huggedText';
import LineChartComponent from '../../../common/lineChart';

// Mock Data Generation
const generateMockHeartRateData = (numPoints = 12) => {
    const data = [];
    let currentRate = 75;
    for (let i = 0; i < numPoints; i++) {
        const time = `${String(i * 2).padStart(2, '0')}:00`; // Every 2 hours
        // Simulate some variation
        const change = (Math.random() - 0.4) * 15; // Allow bigger swings
        currentRate = Math.max(50, Math.min(130, Math.round(currentRate + change))); // Keep within reasonable bounds

        // Round the bounded rate to 2 decimal places and update currentRate
        currentRate = parseFloat(currentRate.toFixed(2));
        data.push({ time, rate: currentRate });
    }
    return data;
};

const SAFE_RANGE_HR = { low: 60, high: 100 };

function HeartRate() {
    const mockData = useMemo(() => generateMockHeartRateData(), []);
    const latestMeasurement = mockData.length > 0 ? mockData[mockData.length - 1].rate : 'N/A';
    const latestStatus = latestMeasurement >= SAFE_RANGE_HR.low && latestMeasurement <= SAFE_RANGE_HR.high ? 'Normal' : (latestMeasurement < SAFE_RANGE_HR.low ? 'Low' : 'High');
    const statusColor = latestStatus === 'Normal' ? '#4CAF50' : '#F44336'; // Green for normal, Red for abnormal

    return (
        <BoxContainer className='cardBox heartRate'>
            <BoxContainerTitle className='cardTitle'>
                <img src={HeartRateIcon} alt="Heart Rate Icon" className='cardIcon' />
                Heart Rate
            </BoxContainerTitle>

            <BoxContainerContent className='cardContent'>
                {/* Display Latest Stats */}
                <div className="measurementStats">
                    <div className="measurementValue">
                        <HuggedText text={latestMeasurement.toString()} font_size="32px" font_weight="400" color="#272927" />
                        <HuggedText text='bpm' font_size="16px" font_weight="400" color="#818181" />
                    </div>
                    <div className="measurementStatus" style={{ backgroundColor: statusColor }}>
                        <HuggedText text={latestStatus} font_size="16px" font_weight="400" color="#FFF" />
                    </div>
                </div>

                {/* Add Line Chart */}
                <div className="chartContainer" style={{ marginTop: '15px', width: '100%', height: '300px' }}>
                    <LineChartComponent
                        data={mockData}
                        dataKeys={['rate']} // Pass dataKey as an array
                        unit="bpm"
                        safeRange={SAFE_RANGE_HR}
                        chartName="Heart Rate"
                        height={300} // Explicitly set height
                    />
                </div>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default HeartRate;