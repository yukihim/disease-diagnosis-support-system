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
        "Type": "Inpatient",
        "DOB": "01/01/2002",
        "Gender": "Male",
        "Phone Number": "0123456789",
        "SSN": "123-45-6789",
        "Health Insurance Code": "123456789",
        "Job": "Student",
        "Address": "168 Ly Thuong Kiet Street, District 10, Ho Chi Minh City, Vietnam",
        "Height (cm)": "163 cm",
        "Weight (kg)": "70 kg",
    },
    {
        "Name": "Phuong Xuong B",
        "Type": "Inpatient",
        "DOB": "01/01/2001",
        "Gender": "Male",
        "Phone Number": "0123456789",
        "SSN": "123-45-6789",
        "Health Insurance Code": "123456789",
        "Job": "Student",
        "Address": "168 Ly Thuong Kiet Street, District 10, Ho Chi Minh City, Vietnam",
        "Height (cm)": "163 cm",
        "Weight (kg)": "70 kg",
    },
    {
        "Name": "Phuong Xuong C",
        "Type": "Patient",
        "DOB": "01/01/2000",
        "Gender": "Male",
        "Phone Number": "0123456789",
        "SSN": "123-45-6789",
        "Health Insurance Code": "123456789",
        "Job": "Student",
        "Address": "168 Ly Thuong Kiet Street, District 10, Ho Chi Minh City, Vietnam",
        "Height (cm)": "163 cm",
        "Weight (kg)": "70 kg",
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