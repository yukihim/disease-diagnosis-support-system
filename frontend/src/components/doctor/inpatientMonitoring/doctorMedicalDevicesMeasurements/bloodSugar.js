import React, { useMemo } from 'react'; // Import useMemo
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import BloodSugarIcon from '../../../../assets/images/doctor/bloodSugarIcon.png';

import HuggedText from '../../../common/huggedText';
import LineChartComponent from '../../../common/lineChart';


// ADDED: Fixed mock data array
const mockBloodSugarData = [
    { time: '00:00', sugarLevel: 90 },
    { time: '02:00', sugarLevel: 95 },
    { time: '04:00', sugarLevel: 105 },
    { time: '06:00', sugarLevel: 130 },
    { time: '08:00', sugarLevel: 155 }, // High
    { time: '10:00', sugarLevel: 145 }, // High
    { time: '12:00', sugarLevel: 120 },
    { time: '14:00', sugarLevel: 85 },
    { time: '16:00', sugarLevel: 75 },
    { time: '18:00', sugarLevel: 65 }, // Low
    { time: '20:00', sugarLevel: 80 },
    { time: '22:00', sugarLevel: 88 },
];

const SAFE_RANGE_BS = { low: 70, high: 100 }; // Example safe range (adjust as needed)

function BloodSugar() {
    // Use the fixed mock data directly
    const mockData = mockBloodSugarData;
    
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