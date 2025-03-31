import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './style/doctorFinalizingDiagnosisForPatient.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorPatientDiagnosingReasonToVisit from '../diagnosingPatient/doctorPatientDiagnosing/doctorPatientDiagnosingReasonToVisit';
import DoctorFinalizingDiagnosisForPatientSymptoms from './doctorFinalizingDiagnosisForPatient/doctorFinalizingDiagnosisForPatientSymptoms';
import DoctorFinalizingDiagnosisForPatientDiagnosisRecommendation from './doctorFinalizingDiagnosisForPatient/doctorFinalizingDiagnosisForPatientDiagnosisRecommendation';
import DoctorFinalizingDiagnosisForPatientFinalDiagnosis from './doctorFinalizingDiagnosisForPatient/doctorFinalizingDiagnosisForPatientFinalDiagnosis';
import DoctorFinalizingDiagnosisForPatientEndDiagnosisSessionButtons from './doctorFinalizingDiagnosisForPatient/doctorFinalizingDiagnosisForPatientEndDiagnosisSessionButtons';

function DoctorFinalizingDiagnosisForPatient() {
    const history = useHistory();
    
    const [patientReasonToVisit, setpatientReasonToVisit] = useState("");
    const [patientSymptoms, setPatientSymptoms] = useState("");
    const [patientDiagnosisRecommendation, setPatientDiagnosisRecommendation] = useState([]);

    const [finalDiagnosis, setFinalDiagnosis] = useState("");
    
    useEffect(() => {
        fetchPatientReasonToVisit();
        fetchPatientSymptoms();
        fetchDiagnosisRecommendation();
        fetchPreliminaryDiagnosis();
    }, []);
    
    // Fetch Reason to Visit from API
    const fetchPatientReasonToVisit = async () => {
        try {
            // Replace with your actual API endpoint
            // const response = await fetch('your-api-endpoint');
            // const data = await response.json();
            // setpatientReasonToVisit(data);
            
            // Mock data for demonstration
            const mockData = "High fever, dry cough, and difficulty breathing.";
            
            setpatientReasonToVisit(mockData);
        } catch (error) {
            console.error('Error fetching patient reason to visit:', error);
        }
    };

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

    // Fetch Diagnosis Recommendationfrom API
    const fetchDiagnosisRecommendation = async () => {
        try {
            // Replace with your actual API endpoint
            // const response = await fetch('your-api-endpoint');
            // const data = await response.json();
            // setpatientReasonToVisit(data);
            
            // Mock data for demonstration
            const mockData = [
                { disease: 'Influenza (Flu)', probabilities: '60%' },
                { disease: 'Strep Throat', probabilities: '20%' },
                { disease: 'Sore Throat', probabilities: '20%' },
            ];
            
            setPatientDiagnosisRecommendation(mockData);
        } catch (error) {
            console.error('Error fetching patient diagnosis recommendation:', error);
        }
    };

    // Fetch Diagnosis from API
    const fetchPreliminaryDiagnosis = async () => {
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

    // Handler for "Send for Test" button
    const onClickFinalizeDiagnosis = () => {
        alert("End Session For Patient");
        history.push("/doctor/homepage");
    };
    
    return (
        <BoxContainer className='doctorFinalizingDiagnosisForPatientBox'>
            <BoxContainerTitle className='doctorFinalizingDiagnosisForPatient'>
                Finalizing Diagnosis
            </BoxContainerTitle>

            <BoxContainerContent className='doctorFinalizingDiagnosisForPatientContent'>
                {/* Reason to visit */}
                <DoctorPatientDiagnosingReasonToVisit patientReasonToVisit={patientReasonToVisit} />

                {/* Symptoms */}
                <DoctorFinalizingDiagnosisForPatientSymptoms patientSymptoms={patientSymptoms} />

                {/* Diagnosis Recommendation */}
                <DoctorFinalizingDiagnosisForPatientDiagnosisRecommendation patientDiagnosisRecommendation={patientDiagnosisRecommendation} />

                {/* Final Diagnosis */}
                <DoctorFinalizingDiagnosisForPatientFinalDiagnosis doctorFinalizingDiagnosisForPatientFinalDiagnosis={finalDiagnosis} setDoctorFinalizingDiagnosisForPatientFinalDiagnosis={setFinalDiagnosis} />
                
                {/* End Diagnosis Session Button */}
                <DoctorFinalizingDiagnosisForPatientEndDiagnosisSessionButtons onClickFinalizeDiagnosis={onClickFinalizeDiagnosis} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorFinalizingDiagnosisForPatient;