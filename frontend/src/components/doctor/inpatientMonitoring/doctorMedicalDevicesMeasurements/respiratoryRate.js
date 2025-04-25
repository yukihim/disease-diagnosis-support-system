import React, { useMemo } from 'react'; // Import useMemo
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import RespiratoryRateIcon from '../../../../assets/images/doctor/respiratoryRateIcon.png';

import HuggedText from '../../../common/huggedText';
import LineChartComponent from '../../../common/lineChart';


// ADDED: Fixed mock data array
const mockRespRateData = [
    { time: '00:00', respRate: 16 },
    { time: '02:00', respRate: 17 },
    { time: '04:00', respRate: 18 },
    { time: '06:00', respRate: 21 }, // High
    { time: '08:00', respRate: 23 }, // High
    { time: '10:00', respRate: 19 },
    { time: '12:00', respRate: 15 },
    { time: '14:00', respRate: 14 },
    { time: '16:00', respRate: 11 }, // Low
    { time: '18:00', respRate: 13 },
    { time: '20:00', respRate: 15 },
    { time: '22:00', respRate: 16 },
];

const SAFE_RANGE_RESP = { low: 12, high: 18 }; // Example safe range

function RespiratoryRate() {
    // Use the fixed mock data directly
    const mockData = mockRespRateData;
    
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