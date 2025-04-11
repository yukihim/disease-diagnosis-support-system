import React, { useState, useEffect } from 'react';
import './style/prescription.css';

import BoxContainer from '../../boxContainer';
import BoxContainerTitle from '../../boxContainerTitle';
import BoxContainerContent from '../../boxContainerContent';

import DoctorPrescriptionAndProcedurePrescriptionsCardHeader from '../../../doctor/prescriptionAndProcedure/doctorPrescriptionAndProcedurePrescriptionsCard/doctorPrescriptionAndProcedurePrescriptionsCardHeader'
import PrescriptionContent from './prescriptionTable/prescriptionContent';

const patientPrescriptionTableHeader = [
    { name: 'Medicine', width: '190px' },
    { name: 'Morning', width: '85px' },
    { name: 'Noon', width: '85px' },
    { name: 'Afternoon', width: '85px' },
    { name: 'Evening', width: '85px' },
    { name: 'Duration', width: '120px' },
    { name: 'Note', width: '500px' }
];

function Prescription() {
    const [prescription, setPrescription] = useState(null);
    
    // Fetch data from API
    const fetchVitalsData = async () => {
        try {
            // Replace with your actual API endpoint
            // const response = await fetch('your-api-endpoint/patient/vitals');
            // const data = await response.json();
            // setPrescription(data);
            
            // Mock data for demonstration
            const mockData = [
                {
                    medicine: "Paracetamol 500 mg",
                    morning: "1",
                    noon: "0",
                    afternoon: "0",
                    evening: "0",
                    durations: "5 days",
                    note: "Take after food",
                },
                {
                    medicine: "Ibuprofen 200 mg",
                    morning: "0",
                    noon: "1",
                    afternoon: "0",
                    evening: "0",
                    durations: "3 days",
                    note: "Take with water",
                }
            ];
            
            setPrescription(mockData);
        } catch (error) {
            console.error('Error fetching vital signs data:', error);
        }
    };
    
    useEffect(() => {
        fetchVitalsData();
    });
    
    return (
        <BoxContainer className='prescriptionBox'>
            <BoxContainerTitle className='prescription'>
                Prescription
            </BoxContainerTitle>

            <BoxContainerContent className='prescriptionContent'>
                {prescription ? (
                    <>
                        <DoctorPrescriptionAndProcedurePrescriptionsCardHeader patientPrescriptionTableHeader={patientPrescriptionTableHeader} />
                        <PrescriptionContent 
                            patientPrescriptionTableHeader={patientPrescriptionTableHeader}
                            prescriptionTableData={prescription}
                        />
                    </>
                ) : (
                    <div className="no-data">
                        Prescription data is not available.
                    </div>
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default Prescription;