import React, { useState } from 'react';
import './style/receptionistPatientInformationForm.css';

import SpecificInformationItemWrapper from './components/specificInformationItemWrapper';

const initialPatientInformation = {
    "Name": "Phuong Xuong Thinh",
    "DOB": "01/01/2000",
    "Gender": "Male",
    "Phone Number": "0123456789",
    "SSN": "123-45-6789",
    "Health Insurance Code": "123456789",
    "Job": "Student",
    "Address": "168 Ly Thuong Kiet Street, District 10, Ho Chi Minh City, Vietnam",
};

function ReceptionistPatientInformationForm({ isEditing }) {
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
        { key: "Job", label: "Job" },
        { key: "Address", label: "Address" },
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