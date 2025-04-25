import React from 'react';
import './style/doctorPatientVitalSignsAndPhysicalMeasurementsCard.css';

import SpecificInformationItemWrapper from '../../../common/specificInformationItemWrapper';

const patientFields = [
    { key: "Blood Pressure (mmHg)", label: "Blood Pressure (mmHg)" },
    { key: "Pulse (beats/minute)", label: "Pulse (beats/minute)" },
    { key: "Breathing Rate (breaths/minute)", label: "Breathing Rate (breaths/minute)" },
    { key: "Temperature (°C)", label: "Temperature (°C)" },
    { key: "BMI", label: "BMI" },
    { key: "Oxygen Saturation (%)", label: "Oxygen Saturation (%)" },
];

function DoctorPatientVitalSignsAndPhysicalMeasurementsCard({ patientVitalSignsAndPhysicalMeasurements }) {
    return (
        <div className="doctorPatientVitalSignsAndPhysicalMeasurementsCard">
            {patientFields.map(field => (
                <SpecificInformationItemWrapper
                    className="vitalSignsAndPhysicalMeasurement"
                    key={field.key}
                    item={field.label}
                    itemValue={patientVitalSignsAndPhysicalMeasurements[field.key]}
                />
            ))}
        </div>
    );
}

export default DoctorPatientVitalSignsAndPhysicalMeasurementsCard;