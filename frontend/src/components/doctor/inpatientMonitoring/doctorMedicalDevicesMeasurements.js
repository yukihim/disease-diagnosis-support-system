import React from 'react';
import './style/doctorMedicalDevicesMeasurements.css';

import BloodSugar from './doctorMedicalDevicesMeasurements/bloodSugar';
import HeartRate from './doctorMedicalDevicesMeasurements/heartRate';
import BloodPressure from './doctorMedicalDevicesMeasurements/bloodPressure';
import BodyTemperature from './doctorMedicalDevicesMeasurements/bodyTemperature';
import RespiratoryRate from './doctorMedicalDevicesMeasurements/respiratoryRate';

// Accept processed data props
function DoctorMedicalDevicesMeasurements({
    deviceMeasurements,
    selectedDevice,
    setSelectedDevice,
    deviceList,
    deviceStatus
}) {

    

    
    
    return (
        <div className="doctorMedicalDevicesMeasurements">
            {/* Pass specific data down to each card */}
            <BloodSugar deviceStatus={deviceStatus} deviceMeasurements={deviceMeasurements} deviceList={deviceList} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice}/>
            <HeartRate deviceStatus={deviceStatus} deviceMeasurements={deviceMeasurements} deviceList={deviceList} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice}/>
            <BloodPressure deviceStatus={deviceStatus} deviceMeasurements={deviceMeasurements} deviceList={deviceList} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice}/>
            <BodyTemperature deviceStatus={deviceStatus} deviceMeasurements={deviceMeasurements} deviceList={deviceList} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice}/>
            <RespiratoryRate deviceStatus={deviceStatus} deviceMeasurements={deviceMeasurements} deviceList={deviceList} selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice}/>
        </div>
    );
}

export default DoctorMedicalDevicesMeasurements;