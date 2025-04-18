import React from 'react';
import { useLocation } from 'react-router-dom';
import './style/patientInformationCard.css';

import BoxContainer from './boxContainer';
import BoxContainerTitle from './boxContainerTitle';
import BoxContainerContent from './boxContainerContent';

import PatientInformationForm from './patientInformationForm/patientInformationForm';


const initialPatientInformationHolder = [
    {
        "Name": "Phuong Xuong Thinh",
        "SSN": "123-45-6789",
        "DOB": "01/01/2002",
        "Health Insurance Code": "123456789",
        "Gender": "Male",
        "Height (cm)": "163 cm",
        "Type": "Inpatient",
        "Weight (kg)": "70 kg",
        "Phone Number": "0123456789",
        "Address": "168 Ly Thuong Kiet Street, District 10, Ho Chi Minh City, Vietnam",
        "Job": "Student",
    },
    {
        "Name": "Phuong Xuong B",
        "SSN": "123-45-6789", // Moved from "Column 2"
        "DOB": "01/01/2001",
        "Health Insurance Code": "123456789", // Moved from "Column 2"
        "Gender": "Male",
        "Height (cm)": "163 cm", // Moved from "Column 2"
        "Type": "Inpatient",
        "Weight (kg)": "70 kg", // Moved from "Column 2"
        "Phone Number": "0123456789",
        "Address": "168 Ly Thuong Kiet Street, District 10, Ho Chi Minh City, Vietnam", // Moved from "Column 2"
        "Job": "Student",
    },
    {
        "Name": "Phuong Xuong C",
        "SSN": "123-45-6789", // Moved from "Column 2"
        "DOB": "01/01/2000",
        "Health Insurance Code": "123456789", // Moved from "Column 2"
        "Gender": "Male",
        "Height (cm)": "163 cm", // Moved from "Column 2"
        "Type": "Patient", // Changed type for this patient
        "Weight (kg)": "70 kg", // Moved from "Column 2"
        "Phone Number": "0123456789",
        "Address": "168 Ly Thuong Kiet Street, District 10, Ho Chi Minh City, Vietnam", // Moved from "Column 2"
        "Job": "Student",
    }
];

function PatientInformationCard() {
    const location = useLocation();
    const { patientName } = location.state || {};

    // Use find instead of map to get a single patient object
    const patientInformation = initialPatientInformationHolder.find(patient => 
        patient.Name === patientName
    ) || null; // Return null if 0 patient found
    
    return (
        <BoxContainer className='patientInformationBox'>
            <BoxContainerTitle className='patientInformationTitle'>
                Patient Information
            </BoxContainerTitle>

            <BoxContainerContent className='patientInformationContent'>
                <PatientInformationForm patientInformation={patientInformation} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default PatientInformationCard;