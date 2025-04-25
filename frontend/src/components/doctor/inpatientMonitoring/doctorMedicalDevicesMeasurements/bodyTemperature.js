import React, { useMemo } from 'react'; // Import useMemo
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import BodyTemperatureIcon from '../../../../assets/images/doctor/bodyTemperatureIcon.png';

import HuggedText from '../../../common/huggedText';
import LineChartComponent from '../../../common/lineChart';


// ADDED: Fixed mock data array
const mockBodyTempData = [
    { time: '00:00', temp: 36.8 },
    { time: '02:00', temp: 36.9 },
    { time: '04:00', temp: 37.1 },
    { time: '06:00', temp: 37.5 }, // Slightly elevated
    { time: '08:00', temp: 38.2 }, // Fever
    { time: '10:00', temp: 37.8 },
    { time: '12:00', temp: 37.4 },
    { time: '14:00', temp: 37.0 },
    { time: '16:00', temp: 36.7 },
    { time: '18:00', temp: 36.5 }, // Slightly low
    { time: '20:00', temp: 36.6 },
    { time: '22:00', temp: 36.8 },
];

const SAFE_RANGE_TEMP = { low: 36.5, high: 37.3 }; // Example safe range in Celsius

function BodyTemperature() {
    // Use the fixed mock data directly
    const mockData = mockBodyTempData;
    
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
                        yMin={24}
                        yMax={45}
                    />
                </div>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default BodyTemperature;