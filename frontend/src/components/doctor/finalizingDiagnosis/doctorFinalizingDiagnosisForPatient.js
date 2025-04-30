import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies
import './style/doctorFinalizingDiagnosisForPatient.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorPatientDiagnosingReasonToVisit from '../diagnosingPatient/doctorPatientDiagnosing/doctorPatientDiagnosingReasonToVisit';
import DoctorFinalizingDiagnosisForPatientSymptoms from './doctorFinalizingDiagnosisForPatient/doctorFinalizingDiagnosisForPatientSymptoms';
import DoctorFinalizingDiagnosisForPatientDiagnosisRecommendation from './doctorFinalizingDiagnosisForPatient/doctorFinalizingDiagnosisForPatientDiagnosisRecommendation';
import DoctorFinalizingDiagnosisForPatientFinalDiagnosis from './doctorFinalizingDiagnosisForPatient/doctorFinalizingDiagnosisForPatientFinalDiagnosis';
import DoctorFinalizingDiagnosisForPatientFinalizeDiagnosisSessionButtons from './doctorFinalizingDiagnosisForPatient/doctorFinalizingDiagnosisForPatientFinalizeDiagnosisSessionButtons';

const API_BASE_URL = "http://localhost:5001/doctor";

function DoctorFinalizingDiagnosisForPatient() {
    const history = useHistory();
    const location = useLocation();

    // Retrieve all data passed from the previous page's state
    const {
        sessionID,
        systemRecommendations: passedRecommendations,
        preliminaryDiagnosis: passedPreliminaryDiagnosis,
        patientReasonToVisit: passedReasonToVisit,
        patientSymptoms: passedSymptoms,
        ...restPatientData
    } = location.state || {};

    // State for this component, initialized with passed data
    const [patientReasonToVisit, setPatientReasonToVisit] = useState(passedReasonToVisit || "");
    const [patientSymptoms, setPatientSymptoms] = useState(passedSymptoms || "");
    const [patientDiagnosisRecommendation, setPatientDiagnosisRecommendation] = useState(passedRecommendations || []);
    const [finalDiagnosis, setFinalDiagnosis] = useState(passedPreliminaryDiagnosis || "");

    // Reintroduce states for API submission
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null); // Renamed from validationError for clarity

    // Handler for the "Finalize Diagnosis & Continue" button click - Saves via API then navigates
    const handleFinalizeDiagnosis = async () => {
        // Basic validation: Ensure final diagnosis is not empty
        if (!finalDiagnosis || finalDiagnosis.trim() === '') {
            setSubmitError("Final diagnosis cannot be empty.");
            return; // Stop execution if validation fails
        }
        if (!sessionID) {
            setSubmitError("Session ID is missing. Cannot finalize diagnosis.");
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);
        const token = Cookies.get('token');

        if (!token) {
            setSubmitError("Authentication token not found.");
            setIsSubmitting(false);
            return;
        }

        try {
            console.log("API Call: Setting Final Diagnosis for", sessionID);
            const response = await fetch(`${API_BASE_URL}/finalize_diagnosis/set_final_diagnosis/${sessionID}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ diagnosis: finalDiagnosis }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Failed to set final diagnosis: ${response.statusText}`);
            }

            console.log("API Call: Final Diagnosis Set Successfully. Navigating...");

            // Navigate to the prescription page AFTER successful API call
            history.push({
                pathname: '/doctor/prescription_and_procedure', // Corrected typo
                state: {
                    ...location.state, // Pass along all data received
                    finalDiagnosis: finalDiagnosis // Ensure the final diagnosis is passed
                },
            });

        } catch (error) {
            console.error("Error finalizing diagnosis:", error);
            setSubmitError(error.message || "An unexpected error occurred while saving the diagnosis.");
        } finally {
            setIsSubmitting(false); // Stop loading indicator regardless of success/failure
        }
    };

    return (
        <BoxContainer className='doctorFinalizingDiagnosisForPatientBox'>
            <BoxContainerTitle className='doctorFinalizingDiagnosisForPatient'>
                Finalizing Diagnosis
            </BoxContainerTitle>

            <BoxContainerContent className='doctorFinalizingDiagnosisForPatientContent'>
                {/* Display Reason to visit */}
                <DoctorPatientDiagnosingReasonToVisit patientReasonToVisit={patientReasonToVisit} />

                {/* Display Symptoms */}
                <DoctorFinalizingDiagnosisForPatientSymptoms patientSymptoms={patientSymptoms} />

                {/* Display Diagnosis Recommendation */}
                <DoctorFinalizingDiagnosisForPatientDiagnosisRecommendation patientDiagnosisRecommendation={patientDiagnosisRecommendation} />

                {/* Finalizing Diagnosis Input */}
                <DoctorFinalizingDiagnosisForPatientFinalDiagnosis
                    doctorFinalizingDiagnosisForPatientFinalDiagnosis={finalDiagnosis}
                    setDoctorFinalizingDiagnosisForPatientFinalDiagnosis={setFinalDiagnosis}
                />

                {/* Display Submission Error */}
                {submitError && <div style={{ color: 'red', marginTop: '10px' }}>{submitError}</div>}

                {/* Finalize Diagnosis Session Button - Pass loading state */}
                <DoctorFinalizingDiagnosisForPatientFinalizeDiagnosisSessionButtons
                    onClickFinalizeDiagnosis={handleFinalizeDiagnosis}
                    disabled={isSubmitting} // Pass the submitting state to disable button
                />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorFinalizingDiagnosisForPatient;