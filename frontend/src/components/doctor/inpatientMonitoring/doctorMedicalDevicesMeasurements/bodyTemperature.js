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
function BodyTemperature({ 
    
    deviceList = [], 
    deviceMeasurements, 
    deviceStatus,
    selectedDevice,
    setSelectedDevice
}) { // Default to empty array
    // Use the data prop instead of mockData
    const chartData = deviceMeasurements['temperature'];

    const latestMeasurement = chartData.length > 0 ? chartData[chartData.length - 1].value : 'N/A';
    let latestStatus = 'N/A';
    let statusColor = '#818181'; // Grey for N/A

    if (latestMeasurement !== 'N/A') {
        latestStatus = latestMeasurement >= SAFE_RANGE_TEMP.low && latestMeasurement <= SAFE_RANGE_TEMP.high ? 'Normal' : (latestMeasurement < SAFE_RANGE_TEMP.low ? 'Low' : 'Fever');
        statusColor = latestStatus === 'Normal' ? '#4CAF50' : '#F44336';
    }

    const handleDeviceChange = (event) => {
        const device = deviceList['temperature'].find(device => device.id === parseInt(event.target.value));
        setSelectedDevice({ ...selectedDevice, temperature: device });
    };

    return (
        <BoxContainer className='cardBox bodyTemperature'>
            <BoxContainerTitle className='cardTitle'>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={BodyTemperatureIcon} alt="Body Temperature Icon" className='cardIcon' />
                    <span>Body Temperature</span>
                </div>
                <div className='cardTitleDeviceStatus'>
                    <select 
                        value={selectedDevice.temperature.id}
                        onChange={handleDeviceChange}
                        className='selectDevice'
                    >
                        {deviceList['temperature'].map((device) => (
                            <option key={device.id} value={device.id}>
                                {device.name}
                            </option>
                        ))}
                    </select>
                    <div className='deviceStatus'>
                        <div className='deviceStatusIcon'
                        style={{
                            backgroundColor: deviceStatus.temperature ? '#4CAF50' : '#F44336'
                        }}></div>
                        <span className='deviceStatusText'>
                            {deviceStatus.temperature ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
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
                            dataKeys={['value']}
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