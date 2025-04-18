// import React from 'react';
// import './style/measurementCard.css';

// import BoxContainer from '../../../common/boxContainer';
// import BoxContainerTitle from '../../../common/boxContainerTitle';
// import BoxContainerContent from '../../../common/boxContainerContent';

// import BodyTemperatureIcon from '../../../../assets/images/doctor/bodyTemperatureIcon.png';

// import HuggedText from '../../../common/huggedText';
// import LineChartComponent from '../../../common/lineChart'; // Import the chart component

// function BodyTemperature() {
//     // Note: The current LineChartComponent uses 'bpm'. You'll need to adapt it
//     // or create a specific chart component for temperature.
//     // For now, it will display the default BPM chart.
//     return (
//         <BoxContainer className='cardBox bodyTemperature'>
//             <BoxContainerTitle className='cardTitle'>
//                 <img src={BodyTemperatureIcon} alt="Body Temperature Icon" className='icon' />
//                 Body Temperature
//             </BoxContainerTitle>

//             <BoxContainerContent className='cardContent'>
//                 {/* Existing Stats */}
//                 <div className="measurementStats">
//                     <div className="measurementValue">
//                         <HuggedText text='37.0' font_size="32px" font_weight="400" color="#272927" /> {/* Example value */}
//                         <HuggedText text='°C' font_size="16px" font_weight="400" color="#818181" />
//                     </div>
//                     <div className="measurementStatus" style={{ backgroundColor: '#4CAF50' }}>
//                         <HuggedText text='Normal' font_size="16px" font_weight="400" color="#FFF" />
//                     </div>
//                 </div>

//                 {/* Add Line Chart */}
//                 <div className="chartContainer" style={{ marginTop: '20px', width: '100%', height: '150px' }}> {/* Adjust height as needed */}
//                     <LineChartComponent /> {/* Needs adaptation for Temp data */}
//                 </div>
//             </BoxContainerContent>
//         </BoxContainer>
//     );
// }

// export default BodyTemperature;





























































import React, { useMemo } from 'react'; // Import useMemo
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import BodyTemperatureIcon from '../../../../assets/images/doctor/bodyTemperatureIcon.png';

import HuggedText from '../../../common/huggedText';
import LineChartComponent from '../../../common/lineChart';

// Mock Data Generation
const generateMockBodyTempData = (numPoints = 12) => {
    const data = [];
    let currentTemp = 36.8;
    for (let i = 0; i < numPoints; i++) {
        const time = `${String(i * 2).padStart(2, '0')}:00`;
        const change = (Math.random() - 0.5) * 0.8; // Smaller variations for temp
        currentTemp = Math.max(35.0, Math.min(40.0, parseFloat((currentTemp + change).toFixed(1)))); // Bounds for temp
        
        // Round the bounded rate to 2 decimal places and update currentRate
        currentTemp = parseFloat(currentTemp.toFixed(2));
        data.push({ time, temp: currentTemp });
    }
    return data;
};

const SAFE_RANGE_TEMP = { low: 36.1, high: 37.2 }; // Example safe range

function BodyTemperature() {
    const mockData = useMemo(() => generateMockBodyTempData(), []);
    const latestMeasurement = mockData.length > 0 ? mockData[mockData.length - 1].temp : 'N/A';
    const latestStatus = latestMeasurement >= SAFE_RANGE_TEMP.low && latestMeasurement <= SAFE_RANGE_TEMP.high ? 'Normal' : (latestMeasurement < SAFE_RANGE_TEMP.low ? 'Low' : 'Fever');
    const statusColor = latestStatus === 'Normal' ? '#4CAF50' : '#F44336';

    return (
        <BoxContainer className='cardBox bodyTemperature'>
            <BoxContainerTitle className='cardTitle'>
                <img src={BodyTemperatureIcon} alt="Body Temperature Icon" className='cardIcon' /> {/* Changed class to cardIcon */}
                Body Temperature
            </BoxContainerTitle>

            <BoxContainerContent className='cardContent'>
                {/* Display Latest Stats */}
                <div className="measurementStats">
                    <div className="measurementValue">
                        <HuggedText text={latestMeasurement.toString()} font_size="32px" font_weight="400" color="#272927" />
                        <HuggedText text='°C' font_size="16px" font_weight="400" color="#818181" />
                    </div>
                    <div className="measurementStatus" style={{ backgroundColor: statusColor }}>
                        <HuggedText text={latestStatus} font_size="16px" font_weight="400" color="#FFF" />
                    </div>
                </div>

                {/* Add Line Chart */}
                <div className="chartContainer" style={{ marginTop: '15px', width: '100%', height: '300px' }}>
                    <LineChartComponent
                        data={mockData}
                        dataKeys={['temp']} // Pass dataKey as an array
                        unit="°C"
                        safeRange={SAFE_RANGE_TEMP}
                        chartName="Temperature"
                        height={300}
                    />
                </div>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default BodyTemperature;