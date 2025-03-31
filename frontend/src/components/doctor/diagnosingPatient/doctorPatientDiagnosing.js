import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './style/doctorPatientDiagnosing.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorPatientDiagnosingReasonToVisit from './doctorPatientDiagnosing/doctorPatientDiagnosingReasonToVisit';
import DoctorPatientDiagnosingSymptoms from './doctorPatientDiagnosing/doctorPatientDiagnosingSymptoms';
import DoctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosis from './doctorPatientDiagnosing/doctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosisCard';
import DoctorPatientDiagnosingSendForTestAndFinalizeDiagnosisButtons from './doctorPatientDiagnosing/doctorPatientDiagnosingSendForTestAndFinalizeDiagnosisButtons';

function DoctorPatientDiagnosing() {
    const history = useHistory();
    const location = useLocation();

    // Get patient data from location state (passed from DoctorIncomingPatient)
    const patientData = location.state || {};

    const [patientReasonToVisit, setpatientReasonToVisit] = useState("");
    const [patientSymptoms, setPatientSymptoms] = useState("");
    const [preliminaryDiagnosis, setPreliminaryDiagnosis] = useState("");

    useEffect(() => {
        fetchPatientReasonToVisit();
    }, []);
    
    // Fetch data from API
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

    // Handler for updating symptoms from child component
    const handleSymptomsChange = (symptoms) => {
        setPatientSymptoms(symptoms);
        console.log("Updated symptoms:", symptoms);
        
        // Here you could also add any processing logic for the symptoms
        // For example, sending to an API or updating other state
    };

    // Handler for updating preliminary diagnosis from child component
    const handlePreliminaryDiagnosisChange = (diagnosis) => {
        setPreliminaryDiagnosis(diagnosis);
        console.log("Updated preliminary diagnosis:", diagnosis);
    };

    // Handler for "Send for Test" button
    const onClickSendForTest = () => {
        console.log("Saving diagnosis data before sending for test");
        
        // You could save this data to localStorage or a global state management solution
        // localStorage.setItem('currentDiagnosis', JSON.stringify(diagnosisData));
        
        // Navigate to the send for test page
        history.push({
            pathname: '/doctor/send_patient_for_test',
            state: patientData,
        });
    };
    
    // Handler for "Finalize Diagnosis" button
    const onClickFinalizeDiagnosis = () => {
        console.log("Saving diagnosis data before finalizing");
        
        // You could save this data to localStorage or a global state management solution
        // localStorage.setItem('currentDiagnosis', JSON.stringify(diagnosisData));
        // Create an object with all the diagnosis data
        
        // Navigate to the finalizing diagnosis page
        history.push({
            pathname: '/doctor/finalizing_diagnosis',
            state: patientData,
        });
    };
    
    return (
        <BoxContainer className='doctorPatientDiagnosingBox'>
            {/* Design finalize and check in for patient component here */}
            <BoxContainerTitle className='doctorPatientDiagnosing'>
                Diagnosis
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPatientDiagnosingContent'>
                {/* Reason to visit */}
                <DoctorPatientDiagnosingReasonToVisit patientReasonToVisit={patientReasonToVisit} />

                {/* Enter Symptoms */}
                <DoctorPatientDiagnosingSymptoms patientSymptoms={patientSymptoms} setPatientSymptoms={handleSymptomsChange} />

                {/* System recommendation and Preliminary diagnosis */}
                <DoctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosis preliminaryDiagnosis={preliminaryDiagnosis} setPreliminaryDiagnosis={handlePreliminaryDiagnosisChange} />

                {/* Send for Test & Finalize Diagnosis Buttons */}
                <DoctorPatientDiagnosingSendForTestAndFinalizeDiagnosisButtons onClickSendForTest={onClickSendForTest} onClickFinalizeDiagnosis={onClickFinalizeDiagnosis} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPatientDiagnosing;