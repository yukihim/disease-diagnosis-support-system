import React from 'react'; // Removed useMemo if not needed elsewhere
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import BodyTemperatureIcon from '../../../../assets/images/doctor/bodyTemperatureIcon.png';

import HuggedText from '../../../common/huggedText';
import LineChartComponent from '../../../common/lineChart';

// REMOVED: Fixed mock data array
// const mockBodyTempData = [ ... ];

const SAFE_RANGE_TEMP = { low: 36.5, high: 37.3 }; // Example safe range in Celsius

// Accept data prop
function BodyTemperature({ data = [] }) { // Default to empty array
    // Use the data prop instead of mockData
    const chartData = data;

    const latestMeasurement = chartData.length > 0 ? chartData[chartData.length - 1].temp : 'N/A';
    let latestStatus = 'N/A';
    let statusColor = '#818181'; // Grey for N/A

    if (latestMeasurement !== 'N/A') {
        latestStatus = latestMeasurement >= SAFE_RANGE_TEMP.low && latestMeasurement <= SAFE_RANGE_TEMP.high ? 'Normal' : (latestMeasurement < SAFE_RANGE_TEMP.low ? 'Low' : 'Fever');
        statusColor = latestStatus === 'Normal' ? '#4CAF50' : '#F44336';
    }

    return (
        <BoxContainer className='cardBox bodyTemperature'>
            <BoxContainerTitle className='cardTitle'>
                <img src={BodyTemperatureIcon} alt="Body Temperature Icon" className='cardIcon' />
                Body Temperature
            </BoxContainerTitle>

            <BoxContainerContent className='cardContent'>
                {/* Display Latest Stats */}
                <div className="measurementStats">
                    <div className="measurementValue">
                        <HuggedText text={latestMeasurement !== 'N/A' ? latestMeasurement.toString() : 'N/A'} font_size="32px" font_weight="400" color="#272927" />
                        <HuggedText text='°C' font_size="16px" font_weight="400" color="#818181" />
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
                            dataKeys={['temp']}
                            unit="°C"
                            safeRange={SAFE_RANGE_TEMP}
                            chartName="Temperature"
                            height={410}
                            yMin={34} // Adjust y-axis range if needed
                            yMax={42}
                        />
                     ) : (
                         <div style={{ textAlign: 'center', paddingTop: '50px', color: '#818181' }}>No data available</div>
                    )}
                </div>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default BodyTemperature;