// import React from 'react';
// import './style/measurementCard.css';

// import BoxContainer from '../../../common/boxContainer';
// import BoxContainerTitle from '../../../common/boxContainerTitle';
// import BoxContainerContent from '../../../common/boxContainerContent';

// import BloodSugarIcon from '../../../../assets/images/doctor/bloodSugarIcon.png';

// import HuggedText from '../../../common/huggedText';
// import LineChartComponent from '../../../common/lineChart'; // Import the chart component

// function BloodSugar() {
//     return (
//         <BoxContainer className='cardBox bloodSugar'>
//             <BoxContainerTitle className='cardTitle'>
//                 <img src={BloodSugarIcon} alt="Blood Sugar Icon" className='cardIcon' />
//                 Blood Sugar
//             </BoxContainerTitle>

//             <BoxContainerContent className='cardContent'>
//                 {/* Existing Stats */}
//                 <div className="measurementStats">
//                     <div className="measurementValue">
//                         <HuggedText text='80' font_size="32px" font_weight="400" color="#272927" />
//                         <HuggedText text='mg/dL' font_size="16px" font_weight="400" color="#818181" />
//                     </div>
//                     <div className="measurementStatus" style={{ backgroundColor: '#4CAF50' }}>
//                         <HuggedText text='Normal' font_size="16px" font_weight="400" color="#FFF" />
//                     </div>
//                 </div>

//                 {/* Add Line Chart */}
//                 <div className="chartContainer" style={{ marginTop: '20px', width: '100%', height: 'auto', zIndex: '0' }}> {/* Adjust height as needed */}
//                     <LineChartComponent />
//                 </div>
//             </BoxContainerContent>
//         </BoxContainer>
//     );
// }

// export default BloodSugar;






















































import React, { useMemo } from 'react'; // Import useMemo
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import BloodSugarIcon from '../../../../assets/images/doctor/bloodSugarIcon.png';

import HuggedText from '../../../common/huggedText';
import LineChartComponent from '../../../common/lineChart';

// Mock Data Generation
const generateMockBloodSugarData = (numPoints = 12) => {
    const data = [];
    let currentLevel = 90;
    for (let i = 0; i < numPoints; i++) {
        const time = `${String(i * 2).padStart(2, '0')}:00`; // Every 2 hours
        const change = (Math.random() - 0.5) * 20; // Simulate variation
        currentLevel = Math.max(60, Math.min(180, Math.round(currentLevel + change))); // Bounds for sugar
        
        
        // Round the bounded rate to 2 decimal places and update currentRate
        currentLevel = parseFloat(currentLevel.toFixed(2));
        data.push({ time, sugarLevel: currentLevel });
    }
    return data;
};

const SAFE_RANGE_BS = { low: 70, high: 140 }; // Example safe range (adjust as needed)

function BloodSugar() {
    const mockData = useMemo(() => generateMockBloodSugarData(), []);
    const latestMeasurement = mockData.length > 0 ? mockData[mockData.length - 1].sugarLevel : 'N/A';
    const latestStatus = latestMeasurement >= SAFE_RANGE_BS.low && latestMeasurement <= SAFE_RANGE_BS.high ? 'Normal' : (latestMeasurement < SAFE_RANGE_BS.low ? 'Low' : 'High');
    const statusColor = latestStatus === 'Normal' ? '#4CAF50' : '#F44336';

    return (
        <BoxContainer className='cardBox bloodSugar'>
            <BoxContainerTitle className='cardTitle'>
                <img src={BloodSugarIcon} alt="Blood Sugar Icon" className='cardIcon' />
                Blood Sugar
            </BoxContainerTitle>

            <BoxContainerContent className='cardContent'>
                {/* Display Latest Stats */}
                <div className="measurementStats">
                    <div className="measurementValue">
                        <HuggedText text={latestMeasurement.toString()} font_size="32px" font_weight="400" color="#272927" />
                        <HuggedText text='mg/dL' font_size="16px" font_weight="400" color="#818181" />
                    </div>
                    <div className="measurementStatus" style={{ backgroundColor: statusColor }}>
                        <HuggedText text={latestStatus} font_size="16px" font_weight="400" color="#FFF" />
                    </div>
                </div>

                {/* Add Line Chart */}
                <div className="chartContainer" style={{ marginTop: '15px', width: '100%', height: '300px' }}>
                    <LineChartComponent
                        data={mockData}
                        dataKeys={['sugarLevel']} // Pass dataKey as an array
                        unit="mg/dL"
                        safeRange={SAFE_RANGE_BS}
                        chartName="Blood Sugar"
                        height={300}
                    />
                </div>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default BloodSugar;