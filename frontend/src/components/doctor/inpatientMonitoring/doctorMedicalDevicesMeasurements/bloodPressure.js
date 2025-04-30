import React from 'react';
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import BloodPressureIcon from '../../../../assets/images/doctor/bloodPressureIcon.png';

import HuggedText from '../../../common/huggedText';
import LineChartComponent from '../../../common/lineChart';

// Define safe ranges
const SAFE_RANGE_BP_SYSTOLIC = { low: 90, high: 120 };
const SAFE_RANGE_BP_DIASTOLIC = { low: 60, high: 80 };

// REMOVED: filterDataForLastMinute function

// Accept data prop
function BloodPressure({ data = [] }) { // Default to empty array

    // *** Use the full data array directly for charts ***
    const chartData = data;
    // console.log(`[${new Date().toLocaleTimeString()}] BloodPressure component received data:`, JSON.stringify(data));

    // Use the full data array to get the absolute latest measurement
    const latestMeasurement = data.length > 0 ? data[data.length - 1] : null;
    const latestSystolic = latestMeasurement ? latestMeasurement.systolic : 'N/A';
    const latestDiastolic = latestMeasurement ? latestMeasurement.diastolic : 'N/A';

    // Determine status based on the latest measurement
    let latestStatus = 'N/A';
    let statusColor = '#818181'; // Grey for N/A
    if (latestMeasurement) {
        const isSysNormal = latestSystolic >= SAFE_RANGE_BP_SYSTOLIC.low && latestSystolic <= SAFE_RANGE_BP_SYSTOLIC.high;
        const isDiaNormal = latestDiastolic >= SAFE_RANGE_BP_DIASTOLIC.low && latestDiastolic <= SAFE_RANGE_BP_DIASTOLIC.high;
        if (isSysNormal && isDiaNormal) {
            latestStatus = 'Normal';
            statusColor = '#4CAF50';
        } else if (latestSystolic > SAFE_RANGE_BP_SYSTOLIC.high || latestDiastolic > SAFE_RANGE_BP_DIASTOLIC.high) {
            latestStatus = 'High';
            statusColor = '#F44336';
        } else { // Covers low systolic OR low diastolic OR both
            latestStatus = 'Low';
            statusColor = '#FF9800'; // Orange for low
        }
    }

    return (
        <BoxContainer className='cardBox bloodPressure'>
            <BoxContainerTitle className='cardTitle'>
                <img src={BloodPressureIcon} alt="Blood Pressure Icon" className='cardIcon' />
                Blood Pressure
            </BoxContainerTitle>

            <BoxContainerContent className='cardContent'>
                {/* Display Latest Stats (using original latest value) */}
                <div className="measurementStats">
                    <div className="measurementValue">
                        <HuggedText text={latestMeasurement ? `${latestSystolic}/${latestDiastolic}` : 'N/A'} font_size="32px" font_weight="400" color="#272927" />
                        <HuggedText text='mmHg' font_size="16px" font_weight="400" color="#818181" />
                    </div>
                    <div className="measurementStatus" style={{ backgroundColor: statusColor }}>
                        <HuggedText text={latestStatus} font_size="16px" font_weight="400" color="#FFF" />
                    </div>
                </div>

                {/* *** Display TWO separate charts *** */}
                <div className="chartContainer" style={{ marginTop: '15px', width: '100%' }}>
                    {chartData.length > 0 ? (
                        <>
                            {/* Systolic Chart */}
                            <div style={{ height: '200px', marginBottom: '10px' }}> {/* Adjust height/margin */}
                                <LineChartComponent
                                    data={chartData} // Use full data
                                    dataKeys={['systolic']}
                                    unit="mmHg"
                                    safeRange={SAFE_RANGE_BP_SYSTOLIC} // Use systolic range
                                    chartName="Systolic BP" // Updated name
                                    height={200} // Reduced height
                                />
                            </div>
                            {/* Diastolic Chart */}
                            <div style={{ height: '200px' }}> {/* Adjust height */}
                                <LineChartComponent
                                    data={chartData} // Use full data
                                    dataKeys={['diastolic']}
                                    unit="mmHg"
                                    safeRange={SAFE_RANGE_BP_DIASTOLIC} // Use diastolic range
                                    chartName="Diastolic BP" // Updated name
                                    height={200} // Reduced height
                                />
                            </div>
                        </>
                    ) : (
                         <div style={{ textAlign: 'center', paddingTop: '50px', color: '#818181' }}>No data available</div>
                    )}
                </div>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default BloodPressure;