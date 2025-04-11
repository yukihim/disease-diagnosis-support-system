import React, { useState, useEffect } from 'react';
import './style/doctorPrescriptionAndProcedureDiagnosisResult.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorFinalizingDiagnosisForPatientSymptoms from '../finalizingDiagnosis/doctorFinalizingDiagnosisForPatient/doctorFinalizingDiagnosisForPatientSymptoms';
import DoctorPrescriptionAndProcedureDiagnosisResultFinalDiagnosis from './doctorPrescriptionAndProcedureDiagnosisResult/doctorPrescriptionAndProcedureDiagnosisResultFinalDiagnosis';

function DoctorPrescriptionAndProcedureDiagnosisResult() {
    const [patientSymptoms, setPatientSymptoms] = useState("");

    const [finalDiagnosis, setFinalDiagnosis] = useState("");
    
    useEffect(() => {
        fetchPatientSymptoms();
        fetchFinalDiagnosis();
    }, []);

    // Fetch Patient Symptoms from API
    const fetchPatientSymptoms = async () => {
        try {
            // Replace with your actual API endpoint
            // const response = await fetch('your-api-endpoint');
            // const data = await response.json();
            // setpatientReasonToVisit(data);
            
            // Mock data for demonstration
            const mockData = "Influenza (Flu)";
            
            setPatientSymptoms(mockData);
        } catch (error) {
            console.error('Error fetching patient symptoms:', error);
        }
    };

    // Fetch Diagnosis from API
    const fetchFinalDiagnosis = async () => {
        try {
            // Replace with your actual API endpoint
            // const response = await fetch('your-api-endpoint');
            // const data = await response.json();
            // setpatientReasonToVisit(data);
            
            // Mock data for demonstration
            const mockData = "Influenza (Flu)";
            
            setFinalDiagnosis(mockData);
        } catch (error) {
            console.error('Error fetching diagnosis recommendation:', error);
        }
    };
    
    return (
        <BoxContainer className='doctorPrescriptionAndProcedureDiagnosisResultBox'>
            <BoxContainerTitle className='doctorPrescriptionAndProcedureDiagnosisResult'>
                Finalizing Diagnosis
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPrescriptionAndProcedureDiagnosisResultContent'>
                {/* Symptoms */}
                <DoctorFinalizingDiagnosisForPatientSymptoms patientSymptoms={patientSymptoms} />

                {/* Final Diagnosis */}
                <DoctorPrescriptionAndProcedureDiagnosisResultFinalDiagnosis patientFinalDiagnosis={finalDiagnosis} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPrescriptionAndProcedureDiagnosisResult;