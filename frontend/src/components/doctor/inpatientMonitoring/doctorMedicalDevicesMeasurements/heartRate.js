import React from 'react'; // Removed useMemo if not needed elsewhere
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import HeartRateIcon from '../../../../assets/images/doctor/heartRateIcon.png';

import HuggedText from '../../../common/huggedText';
import LineChartComponent from '../../../common/lineChart';

// REMOVED: Fixed mock data array
// const mockHeartRateData = [ ... ];

const SAFE_RANGE_HR = { low: 60, high: 100 };

// Accept data prop
function HeartRate({ data = [] }) { // Default to empty array
    // console.log(`[${new Date().toLocaleTimeString()}] HeartRate component received data:`, JSON.stringify(data));

    // Use the data prop instead of mockData
    const chartData = data;

    const latestMeasurement = chartData.length > 0 ? chartData[chartData.length - 1].rate : 'N/A';
    let latestStatus = 'N/A';
    let statusColor = '#818181'; // Grey for N/A

    if (latestMeasurement !== 'N/A') {
        latestStatus = latestMeasurement >= SAFE_RANGE_HR.low && latestMeasurement <= SAFE_RANGE_HR.high ? 'Normal' : (latestMeasurement < SAFE_RANGE_HR.low ? 'Low' : 'High');
        statusColor = latestStatus === 'Normal' ? '#4CAF50' : '#F44336'; // Green for normal, Red for abnormal
    }

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
                        <HuggedText text={latestMeasurement !== 'N/A' ? latestMeasurement.toString() : 'N/A'} font_size="32px" font_weight="400" color="#272927" />
                        <HuggedText text='bpm' font_size="16px" font_weight="400" color="#818181" />
                    </div>
                    <div className="measurementStatus" style={{ backgroundColor: statusColor }}>
                        <HuggedText text={latestStatus} font_size="16px" font_weight="400" color="#FFF" />
                    </div>
                </div>

                {/* Add Line Chart */}
                <div className="chartContainer" style={{ marginTop: '15px', width: '100%', height: '410px' }}>
                    {chartData.length > 0 ? (
                        <LineChartComponent
                            data={chartData} // Use data from props
                            dataKeys={['rate']}
                            unit="bpm"
                            safeRange={SAFE_RANGE_HR}
                            chartName="Heart Rate"
                            height={410}
                        />
                    ) : (
                         <div style={{ textAlign: 'center', paddingTop: '50px', color: '#818181' }}>No data available</div>
                    )}
                </div>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default HeartRate;