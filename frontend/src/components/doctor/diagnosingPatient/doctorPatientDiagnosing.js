import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
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
    const [systemRecommendations, setSystemRecommendations] = useState([]); // Add state for recommendations
    const [isPredicting, setIsPredicting] = useState(false); // Loading state for prediction
    const [predictionError, setPredictionError] = useState(null); // Error state for prediction

    // Fetch mock reason to visit on mount
    useEffect(() => {
        fetchPatientReasonToVisit();
    }, []);

    // Fetch data from API (Mock)
    const fetchPatientReasonToVisit = async () => {
        try {
            // Mock data for demonstration
            const mockData = "High fever, dry cough, and difficulty breathing.";
            setpatientReasonToVisit(mockData);
        } catch (error) {
            console.error('Error fetching patient reason to visit:', error);
        }
    };

    // --- Debounce Logic for Predictions ---
    useEffect(() => {
        // Don't run the effect if symptoms are empty initially or after clearing
        if (!patientSymptoms || patientSymptoms.trim() === '') {
            setSystemRecommendations([]); // Clear recommendations
            setPredictionError(null);
            return; // Exit early
        }

        // Timer
        const handler = setTimeout(() => {
            fetchPredictions(patientSymptoms);
        }, 10000);

        // Cleanup function: Clear the timer if the effect runs again before the timer finishes
        return () => {
            clearTimeout(handler);
        };
        // Dependency array: Re-run the effect only when patientSymptoms changes
    }, [patientSymptoms]); // Removed fetchPredictions from dependencies as it's wrapped in useCallback now
    // --- End Debounce Logic ---


    // Call prediction API (wrapped in useCallback)
    const fetchPredictions = useCallback(async (symptoms) => {
        if (!symptoms || symptoms.trim() === '') {
            return; // Already handled by useEffect
        }

        setIsPredicting(true);
        setPredictionError(null);
        setSystemRecommendations([]); // Clear previous recommendations before new fetch

        // Split symptoms string into an array, trimming whitespace
        const symptomsList = symptoms.split(',').map(s => s.trim()).filter(s => s !== '');

        // Ensure age and sex are available, provide defaults if necessary
        const age = patientData.age ? parseInt(patientData.age, 10) : 30; // Default age if not provided
        // Corrected logic for sex: If not Male, assume Female. Provide default 'M' if patientData.sex is missing.
        const sex = patientData.sex ? (patientData.sex === "Male" ? "M" : "F") : 'M';

        try {
            const response = await fetch('http://localhost:5002/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    symptoms: symptomsList,
                    age: age,
                    sex: sex,
                }),
            });

            console.log("Prediction API Response Status:", response.status);

            if (!response.ok) {
                // Try to parse error message from backend JSON response
                const errorData = await response.json().catch(() => ({ error: `HTTP error! status: ${response.status}` }));
                // Use the 'error' field from the backend response if available
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Prediction API Response Data:", data);

            // --- MODIFICATION: Get only top 3 predictions ---
            // The backend already sorts probabilities descending. Slice the top 3.
            const top3Probabilities = data.probabilities.slice(0, 3);

            // Format the top 3 prediction data for the state
            const formattedRecommendations = top3Probabilities.map(item => ({
                disease: item[0], // disease name is the first element
                // Format probability to percentage string
                probabilities: `${(item[1] * 100).toFixed(1)}%` // probability is the second element
            }));

            setSystemRecommendations(formattedRecommendations);

        } catch (error) {
            console.error("Error fetching predictions:", error);
            // Display the error message from the caught error
            setPredictionError(`Failed to get predictions: ${error.message}`);
            setSystemRecommendations([]); // Clear recommendations on error
        } finally {
            setIsPredicting(false);
        }
    // Add dependencies for useCallback: patientData might change if navigating between patients
    }, [patientData.age, patientData.sex]);


    // Handler for updating symptoms from child component
    const handleSymptomsChange = (symptoms) => {
        // Only update the state here. The useEffect will handle calling fetchPredictions.
        setPatientSymptoms(symptoms);
        console.log("Updated symptoms:", symptoms);
    };

    // Handler for updating preliminary diagnosis from child component
    const handlePreliminaryDiagnosisChange = (diagnosis) => {
        setPreliminaryDiagnosis(diagnosis);
        console.log("Updated preliminary diagnosis:", diagnosis);
    };

    // Handler for "Send for Test" button
    const onClickSendForTest = () => {
        console.log("Saving diagnosis data before sending for test");
        // Navigate to the send for test page
        history.push({
            pathname: '/doctor/send_patient_for_test',
            state: patientData, // Pass necessary patient data
        });
    };

    // Handler for "Finalize Diagnosis" button
    const onClickFinalizeDiagnosis = () => {
        console.log("Saving diagnosis data before finalizing");
        // Navigate to the finalizing diagnosis page
        history.push({
            pathname: '/doctor/finalizing_diagnosis',
            state: {
                ...patientData, // Keep existing patient data (like sessionID, name, etc.)
                systemRecommendations: systemRecommendations, // Pass the recommendations
                preliminaryDiagnosis: preliminaryDiagnosis, // Pass the preliminary diagnosis
                patientReasonToVisit: patientReasonToVisit, // Pass reason to visit
                patientSymptoms: patientSymptoms, // Pass symptoms string
            },
        });
    };

    return (
        <BoxContainer className='doctorPatientDiagnosingBox'>
            <BoxContainerTitle className='doctorPatientDiagnosing'>
                Diagnosis
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPatientDiagnosingContent'>
                {/* Reason to visit */}
                <DoctorPatientDiagnosingReasonToVisit patientReasonToVisit={patientReasonToVisit} />

                {/* Enter Symptoms */}
                <DoctorPatientDiagnosingSymptoms patientSymptoms={patientSymptoms} setPatientSymptoms={handleSymptomsChange} />

                {/* System recommendation and Preliminary diagnosis */}
                <DoctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosis
                    systemRecommendations={systemRecommendations}
                    preliminaryDiagnosis={preliminaryDiagnosis}
                    setPreliminaryDiagnosis={handlePreliminaryDiagnosisChange}
                    isLoading={isPredicting} // Pass loading state
                    error={predictionError} // Pass error state
                />

                {/* Send for Test & Finalize Diagnosis Buttons */}
                <DoctorPatientDiagnosingSendForTestAndFinalizeDiagnosisButtons onClickSendForTest={onClickSendForTest} onClickFinalizeDiagnosis={onClickFinalizeDiagnosis} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPatientDiagnosing;