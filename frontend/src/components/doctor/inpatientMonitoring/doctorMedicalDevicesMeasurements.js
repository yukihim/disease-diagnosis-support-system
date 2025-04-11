import React from 'react';
import './style/doctorMedicalDevicesMeasurements.css';

import BloodSugar from './doctorMedicalDevicesMeasurements/bloodSugar';
import HeartRate from './doctorMedicalDevicesMeasurements/heartRate';
import BloodPressure from './doctorMedicalDevicesMeasurements/bloodPressure';
import BodyTemperature from './doctorMedicalDevicesMeasurements/bodyTemperature';
import RespiratoryRate from './doctorMedicalDevicesMeasurements/respiratoryRate';


function DoctorMedicalDevicesMeasurements() {
    return (
        <div className="doctorMedicalDevicesMeasurements">
            <BloodSugar />
            <HeartRate />
            <BloodPressure />
            <BodyTemperature />
            <RespiratoryRate />
        </div>
    );
}

export default DoctorMedicalDevicesMeasurements;