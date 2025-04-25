import React, { useMemo } from 'react'; // Import useMemo
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import HeartRateIcon from '../../../../assets/images/doctor/heartRateIcon.png';

import HuggedText from '../../../common/huggedText';
import LineChartComponent from '../../../common/lineChart';


// ADDED: Fixed mock data array
const mockHeartRateData = [
    { time: '00:00', rate: 75 },
    { time: '02:00', rate: 78 },
    { time: '04:00', rate: 82 },
    { time: '06:00', rate: 90 },
    { time: '08:00', rate: 105 }, // High
    { time: '10:00', rate: 95 },
    { time: '12:00', rate: 88 },
    { time: '14:00', rate: 80 },
    { time: '16:00', rate: 72 },
    { time: '18:00', rate: 65 },
    { time: '20:00', rate: 58 }, // Low
    { time: '22:00', rate: 62 },
];

const SAFE_RANGE_HR = { low: 60, high: 100 };

function HeartRate() {
    // Use the fixed mock data directly
    const mockData = mockHeartRateData;
    
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