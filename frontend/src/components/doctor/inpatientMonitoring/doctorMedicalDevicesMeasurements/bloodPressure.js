import React, { useMemo } from 'react'; // Import useMemo
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import BloodPressureIcon from '../../../../assets/images/doctor/bloodPressureIcon.png';

import HuggedText from '../../../common/huggedText';
import LineChartComponent from '../../../common/lineChart';


// ADDED: Fixed mock data array
const mockBloodPressureData = [
    { time: '00:00', systolic: 115, diastolic: 75 },
    { time: '02:00', systolic: 118, diastolic: 78 },
    { time: '04:00', systolic: 122, diastolic: 80 },
    { time: '06:00', systolic: 125, diastolic: 82 },
    { time: '08:00', systolic: 130, diastolic: 85 }, // Borderline high
    { time: '10:00', systolic: 128, diastolic: 84 },
    { time: '12:00', systolic: 120, diastolic: 79 },
    { time: '14:00', systolic: 112, diastolic: 72 }, // Lower
    { time: '16:00', systolic: 110, diastolic: 70 },
    { time: '18:00', systolic: 114, diastolic: 74 },
    { time: '20:00', systolic: 116, diastolic: 76 },
    { time: '22:00', systolic: 119, diastolic: 77 },
];

// Blood Pressure = SYSTOLIC/DIASTOLIC
// Define safe range primarily for Systolic for the reference area
const SAFE_RANGE_BP_SYSTOLIC = { low: 90, high: 120 };
// You might have a separate range check for diastolic if needed for status text
const SAFE_RANGE_BP_DIASTOLIC = { low: 60, high: 80 };

function BloodPressure() {
    // Use the fixed mock data directly
    const mockData = mockBloodPressureData;
    
    const latestMeasurement = mockData.length > 0 ? mockData[mockData.length - 1] : null;
    const latestSystolic = latestMeasurement ? latestMeasurement.systolic : 'N/A';
    const latestDiastolic = latestMeasurement ? latestMeasurement.diastolic : 'N/A';

    // Determine status based on both (example logic)
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
        } else {
            latestStatus = 'Low';
            statusColor = '#FF9800'; // Orange for low
        }
    }


    return (
        <BoxContainer className='cardBox bloodPressure'>
            <BoxContainerTitle className='cardTitle'>
                <img src={BloodPressureIcon} alt="Blood Pressure Icon" className='cardIcon' /> {/* Changed class to cardIcon */}
                Blood Pressure
            </BoxContainerTitle>

            <BoxContainerContent className='cardContent'>
                {/* Display Latest Stats */}
                <div className="measurementStats">
                    <div className="measurementValue">
                        <HuggedText text={`${latestSystolic}/${latestDiastolic}`} font_size="32px" font_weight="400" color="#272927" />
                        <HuggedText text='mmHg' font_size="16px" font_weight="400" color="#818181" />
                    </div>
                    <div className="measurementStatus" style={{ backgroundColor: statusColor }}>
                        <HuggedText text={latestStatus} font_size="16px" font_weight="400" color="#FFF" />
                    </div>
                </div>

                {/* Add Line Chart */}
                <div className="chartContainer" style={{ marginTop: '15px', width: '100%', height: '300px' }}>
                    <LineChartComponent
                        data={mockData}
                        dataKeys={['systolic', 'diastolic']} // Pass both keys
                        unit="mmHg" // Unit is the same for both
                        safeRange={SAFE_RANGE_BP_SYSTOLIC} // Reference area based on systolic
                        chartName={['Systolic', 'Diastolic']} // Names for legend
                        height={300}
                    />
                </div>
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default BloodPressure;