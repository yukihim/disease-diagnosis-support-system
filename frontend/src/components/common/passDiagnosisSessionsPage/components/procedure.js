import React, { useState, useEffect } from 'react';
import './style/procedure.css';

import BoxContainer from '../../boxContainer';
import BoxContainerTitle from '../../boxContainerTitle';
import BoxContainerContent from '../../boxContainerContent';

import DoctorPrescriptionAndProcedureProceduresCardHeader from '../../../doctor/prescriptionAndProcedure/doctorPrescriptionAndProcedureProceduresCard/doctorPrescriptionAndProcedureProceduresCardHeader'
import ProcedureTable from './procedureTable/procedureTable';

const patientProcedureTableHeader = [
    { name: 'Procedure', width: '400px' },
    { name: 'Date/Time', width: '250px' },
    { name: 'Note', width: '500px' }
];

function Procedure() {
    const [procedure, setProcedure] = useState(null);
    
    // Fetch data from API
    const fetchVitalsData = async () => {
        try {
            // Replace with your actual API endpoint
            // const response = await fetch('your-api-endpoint/patient/vitals');
            // const data = await response.json();
            // setProcedure(data);
            
            // Mock data for demonstration
            const mockData = [
                {
                    procedure: "Nasal Irrigation",
                    datetime: "12/13/2024, 08:30 AM",
                    note: "Patient reported improvement in nasal congestion."
                },
                {
                    procedure: "Nasal Swab",
                    datetime: "12/15/2024, 09:00 AM",
                    note: "Swab taken for culture and sensitivity."
                }
            ];
            
            setProcedure(mockData);
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
                Procedure
            </BoxContainerTitle>

            <BoxContainerContent className='prescriptionContent'>
                {procedure ? (
                    <>
                        <DoctorPrescriptionAndProcedureProceduresCardHeader patientProcedureTableHeader={patientProcedureTableHeader} />
                        <ProcedureTable 
                            patientProcedureTableHeader={patientProcedureTableHeader}
                            procedureTableData={procedure}
                        />
                    </>
                ) : (
                    <div className="no-data">
                        Procedure data is not available.
                    </div>
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default Procedure;