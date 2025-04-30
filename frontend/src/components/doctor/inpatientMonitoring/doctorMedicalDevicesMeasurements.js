import React from 'react';
import './style/doctorMedicalDevicesMeasurements.css';

import BloodSugar from './doctorMedicalDevicesMeasurements/bloodSugar';
import HeartRate from './doctorMedicalDevicesMeasurements/heartRate';
import BloodPressure from './doctorMedicalDevicesMeasurements/bloodPressure';
import BodyTemperature from './doctorMedicalDevicesMeasurements/bodyTemperature';
import RespiratoryRate from './doctorMedicalDevicesMeasurements/respiratoryRate';

// Accept processed data props
function DoctorMedicalDevicesMeasurements({
    bloodSugarData,
    heartRateData,
    bloodPressureData,
    bodyTemperatureData,
    respiratoryRateData
}) {
    return (
        <div className="doctorMedicalDevicesMeasurements">
            {/* Pass specific data down to each card */}
            <BloodSugar data={bloodSugarData} />
            <HeartRate data={heartRateData} />
            <BloodPressure data={bloodPressureData} />
            <BodyTemperature data={bodyTemperatureData} />
            <RespiratoryRate data={respiratoryRateData} />
        </div>
    );
}

export default DoctorMedicalDevicesMeasurements;