import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './style/doctorPatientInformation.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorPatientInformationForm from './doctorPatientInformation/doctorPatientInformationForm';

const initialPatientInformationHolder = [
    {
        "Name": "Phuong Xuong Thinh",
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

function DoctorPatientInformation() {
    const location = useLocation();
    const { patientName } = location.state || {};
    const [isCondensed, setIsCondensed] = useState(false);

    // Use find instead of map to get a single patient object
    const patientInformation = initialPatientInformationHolder.find(patient => 
        patient.Name === patientName
    ) || null; // Return null if 0 patient found

    // Add scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            // Change to condensed mode after scrolling past a threshold (e.g., 100px)
            if (window.scrollY > 0) {
                setIsCondensed(true);
            } else {
                setIsCondensed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        // Clean up event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return (
        <BoxContainer className='doctorPatientInformationBox'>
            <BoxContainerTitle className='doctorPatientInformationTitle'>
                Patient Information
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPatientInformationContent'>
                <DoctorPatientInformationForm patientInformation={patientInformation} isCondensed={isCondensed} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPatientInformation;