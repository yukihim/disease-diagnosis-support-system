import React, { useState } from 'react';
import './style/receptionistPatientInformationForm.css';

import SpecificInformationItemWrapper from '../../../common/specificInformationItemWrapper';

function ReceptionistPatientInformationForm({ initialPatientInformation, isEditing }) {
    const [patientInfo, setPatientInfo] = useState({...initialPatientInformation});
    
    const handleChange = (field, value) => {
        setPatientInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const patientFields = [
        { key: "Name", label: "Name" },
        { key: "DOB", label: "DOB" },
        { key: "Gender", label: "Gender" },
        { key: "Phone Number", label: "Phone Number" },
        { key: "SSN", label: "SSN" },
        { key: "Health Insurance Code", label: "Health Insurance Code" },
        { key: "Height (cm)", label: "Height (cm)" },
        { key: "Weight (kg)", label: "Weight (kg)" },
        { key: "Job", label: "Job" },
        { key: "Address", label: "Address" },
        { key: "Follow-up Date", label: "Follow-up Date" },
    ];

    return (
        <div className="receptionistPatientInformationForm">
            {patientFields.map(field => (
                <SpecificInformationItemWrapper 
                    key={field.key}
                    item={field.label}
                    itemValue={patientInfo[field.key]}
                    isEditing={isEditing}
                    onChange={(value) => handleChange(field.key, value)}
                />
            ))}
        </div>
    );
}

export default ReceptionistPatientInformationForm;