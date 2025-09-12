import React, { useState } from 'react'; // Added useState
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import BloodSugarIcon from '../../../../assets/images/doctor/bloodSugarIcon.png';

import HuggedText from '../../../common/huggedText';
import LineChartComponent from '../../../common/lineChart';

// REMOVED: Fixed mock data array
// const mockBloodSugarData = [ ... ];

// Define safe range (can be moved to constants if used elsewhere)
const SAFE_RANGE_BS = { low: 70, high: 140 }; // Example range (adjust as needed)

// Accept data prop and deviceList prop
function BloodSugar({ 
    deviceList = [], 
    deviceStatus,
    deviceMeasurements, 
    selectedDevice,
    setSelectedDevice
}) { // Added deviceList prop
    
    
    
    // Use the data prop instead of mockData
    const chartData = deviceMeasurements['blood_sugar']; // Use prop directly

    console.log("chartData:", chartData)

    const latestMeasurement = chartData.length > 0 ? chartData[chartData.length - 1].value : 'N/A';
    let latestStatus = 'N/A';
    let statusColor = '#818181'; // Grey for N/A

    

    if (latestMeasurement !== 'N/A') {
        latestStatus = latestMeasurement >= SAFE_RANGE_BS.low && latestMeasurement <= SAFE_RANGE_BS.high ? 'Normal' : (latestMeasurement < SAFE_RANGE_BS.low ? 'Low' : 'High');
        statusColor = latestStatus === 'Normal' ? '#4CAF50' : '#F44336';
    }
    

    const handleDeviceChange = (event) => {
        const device = deviceList['blood_sugar'].find(device => device.id === parseInt(event.target.value));
        setSelectedDevice({ ...selectedDevice, blood_sugar: device });
    };

    return (
        <BoxContainer className='cardBox bloodSugar'>
            <BoxContainerTitle className='cardTitle'>
                <div className='cardTitleContent'>
                    <img src={BloodSugarIcon} alt="Blood Sugar Icon" className='cardIcon' />
                    <span>Blood Sugar</span>
                </div>
                <div className='cardTitleDeviceStatus'>
                    <select 
                        value={selectedDevice.blood_sugar.id}
                        onChange={handleDeviceChange}
                        className='selectDevice'
                    >
                        {deviceList['blood_sugar'].map((device) => (
                            <option key={device.id} value={device.id}>
                                {device.name}
                            </option>
                        ))}
                    </select>
                    <div className='deviceStatus'>
                        <div className='deviceStatusIcon'
                        style={{
                            backgroundColor: deviceStatus.blood_sugar ? '#4CAF50' : '#F44336'
                        }}></div>
                        <span className='deviceStatusText'>
                            {deviceStatus.blood_sugar ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            </BoxContainerTitle>
            

            <BoxContainerContent className='cardContent'>
                {/* Display Latest Stats */}
                <div className="measurementStats">
                    <div className="measurementValue">
                        <HuggedText text={latestMeasurement !== 'N/A' ? latestMeasurement.toString() : 'N/A'} font_size="32px" font_weight="400" color="#272927" />
                        <HuggedText text='mg/dL' font_size="16px" font_weight="400" color="#818181" />
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
                            unit="mg/dL"
                            safeRange={SAFE_RANGE_BS}
                            chartName="Blood Sugar"
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

export default BloodSugar;