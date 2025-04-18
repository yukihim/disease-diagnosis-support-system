// import React from 'react';
// import './style/measurementCard.css';

// import BoxContainer from '../../../common/boxContainer';
// import BoxContainerTitle from '../../../common/boxContainerTitle';
// import BoxContainerContent from '../../../common/boxContainerContent';

// import BloodPressureIcon from '../../../../assets/images/doctor/bloodPressureIcon.png';

// import HuggedText from '../../../common/huggedText';
// import LineChartComponent from '../../../common/lineChart'; // Import the chart component

// function BloodPressure() {
//     // Note: The current LineChartComponent uses 'bpm'. You'll need to adapt it
//     // or create a specific chart component for blood pressure (systolic/diastolic).
//     // For now, it will display the default BPM chart.
//     return (
//         <BoxContainer className='cardBox bloodPressure'>
//             <BoxContainerTitle className='cardTitle'>
//                 <img src={BloodPressureIcon} alt="Blood Pressure Icon" className='icon' />
//                 Blood Pressure
//             </BoxContainerTitle>

//             <BoxContainerContent className='cardContent'>
//                 {/* Existing Stats */}
//                 <div className="measurementStats">
//                     <div className="measurementValue">
//                         <HuggedText text='102/72' font_size="32px" font_weight="400" color="#272927" />
//                         <HuggedText text='mmhg' font_size="16px" font_weight="400" color="#818181" />
//                     </div>
//                     <div className="measurementStatus" style={{ backgroundColor: '#4CAF50' }}>
//                         <HuggedText text='Normal' font_size="16px" font_weight="400" color="#FFF" />
//                     </div>
//                 </div>

//                 {/* Add Line Chart */}
//                 <div className="chartContainer" style={{ marginTop: '20px', width: '100%', height: '150px' }}> {/* Adjust height as needed */}
//                     <LineChartComponent /> {/* Needs adaptation for BP data */}
//                 </div>
//             </BoxContainerContent>
//         </BoxContainer>
//     );
// }

// export default BloodPressure;









































import React, { useMemo } from 'react'; // Import useMemo
import './style/measurementCard.css';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import BloodPressureIcon from '../../../../assets/images/doctor/bloodPressureIcon.png';

import HuggedText from '../../../common/huggedText';
import LineChartComponent from '../../../common/lineChart';

// Mock Data Generation
const generateMockBloodPressureData = (numPoints = 12) => {
    const data = [];
    let currentSystolic = 115;
    let currentDiastolic = 75;
    for (let i = 0; i < numPoints; i++) {
        const time = `${String(i * 2).padStart(2, '0')}:00`;
        const sysChange = (Math.random() - 0.5) * 10;
        const diaChange = (Math.random() - 0.5) * 8;
        currentSystolic = Math.max(90, Math.min(160, Math.round(currentSystolic + sysChange)));
        currentDiastolic = Math.max(60, Math.min(100, Math.round(currentDiastolic + diaChange)));
        // Ensure systolic is always higher than diastolic
        if (currentSystolic <= currentDiastolic) {
            currentSystolic = currentDiastolic + 10;
        }
        
        
        // Round the bounded rate to 2 decimal places
        currentSystolic = parseFloat(currentSystolic.toFixed(2));
        currentDiastolic = parseFloat(currentDiastolic.toFixed(2));
        data.push({ time, systolic: currentSystolic, diastolic: currentDiastolic });
    }
    return data;
};

// Define safe range primarily for Systolic for the reference area
const SAFE_RANGE_BP_SYSTOLIC = { low: 100, high: 130 };
// You might have a separate range check for diastolic if needed for status text
const SAFE_RANGE_BP_DIASTOLIC = { low: 65, high: 85 };

function BloodPressure() {
    const mockData = useMemo(() => generateMockBloodPressureData(), []);
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