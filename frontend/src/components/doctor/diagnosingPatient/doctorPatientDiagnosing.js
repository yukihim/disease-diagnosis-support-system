// import React, { useState, useEffect } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
// import './style/doctorPatientDiagnosing.css';

// import BoxContainer from '../../common/boxContainer';
// import BoxContainerTitle from '../../common/boxContainerTitle';
// import BoxContainerContent from '../../common/boxContainerContent';

// import DoctorPatientDiagnosingReasonToVisit from './doctorPatientDiagnosing/doctorPatientDiagnosingReasonToVisit';
// import DoctorPatientDiagnosingSymptoms from './doctorPatientDiagnosing/doctorPatientDiagnosingSymptoms';
// import DoctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosis from './doctorPatientDiagnosing/doctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosisCard';
// import DoctorPatientDiagnosingSendForTestAndFinalizeDiagnosisButtons from './doctorPatientDiagnosing/doctorPatientDiagnosingSendForTestAndFinalizeDiagnosisButtons';

// function DoctorPatientDiagnosing() {
//     const history = useHistory();
//     const location = useLocation();

//     // Get patient data from location state (passed from DoctorIncomingPatient)
//     const patientData = location.state || {};

//     const [patientReasonToVisit, setpatientReasonToVisit] = useState("");
//     const [patientSymptoms, setPatientSymptoms] = useState("");
//     const [preliminaryDiagnosis, setPreliminaryDiagnosis] = useState("");

//     useEffect(() => {
//         fetchPatientReasonToVisit();
//     }, []);
    
//     // Fetch data from API
//     const fetchPatientReasonToVisit = async () => {
//         try {
//             // Replace with your actual API endpoint
//             // const response = await fetch('your-api-endpoint');
//             // const data = await response.json();
//             // setpatientReasonToVisit(data);
            
//             // Mock data for demonstration
//             const mockData = "High fever, dry cough, and difficulty breathing.";
            
//             setpatientReasonToVisit(mockData);
//         } catch (error) {
//             console.error('Error fetching patient reason to visit:', error);
//         }
//     };

//     // Handler for updating symptoms from child component
//     const handleSymptomsChange = (symptoms) => {
//         setPatientSymptoms(symptoms);
//         console.log("Updated symptoms:", symptoms);
        
//         // Here you could also add any processing logic for the symptoms
//         // For example, sending to an API or updating other state
//     };

//     // Handler for updating preliminary diagnosis from child component
//     const handlePreliminaryDiagnosisChange = (diagnosis) => {
//         setPreliminaryDiagnosis(diagnosis);
//         console.log("Updated preliminary diagnosis:", diagnosis);
//     };

//     // Handler for "Send for Test" button
//     const onClickSendForTest = () => {
//         console.log("Saving diagnosis data before sending for test");
        
//         // You could save this data to localStorage or a global state management solution
//         // localStorage.setItem('currentDiagnosis', JSON.stringify(diagnosisData));
        
//         // Navigate to the send for test page
//         history.push({
//             pathname: '/doctor/send_patient_for_test',
//             state: patientData,
//         });
//     };
    
//     // Handler for "Finalize Diagnosis" button
//     const onClickFinalizeDiagnosis = () => {
//         console.log("Saving diagnosis data before finalizing");
        
//         // You could save this data to localStorage or a global state management solution
//         // localStorage.setItem('currentDiagnosis', JSON.stringify(diagnosisData));
//         // Create an object with all the diagnosis data
        
//         // Navigate to the finalizing diagnosis page
//         history.push({
//             pathname: '/doctor/finalizing_diagnosis',
//             state: patientData,
//         });
//     };
    
//     return (
//         <BoxContainer className='doctorPatientDiagnosingBox'>
//             {/* Design finalize and check in for patient component here */}
//             <BoxContainerTitle className='doctorPatientDiagnosing'>
//                 Diagnosis
//             </BoxContainerTitle>

//             <BoxContainerContent className='doctorPatientDiagnosingContent'>
//                 {/* Reason to visit */}
//                 <DoctorPatientDiagnosingReasonToVisit patientReasonToVisit={patientReasonToVisit} />

//                 {/* Enter Symptoms */}
//                 <DoctorPatientDiagnosingSymptoms patientSymptoms={patientSymptoms} setPatientSymptoms={handleSymptomsChange} />

//                 {/* System recommendation and Preliminary diagnosis */}
//                 <DoctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosis preliminaryDiagnosis={preliminaryDiagnosis} setPreliminaryDiagnosis={handlePreliminaryDiagnosisChange} />

//                 {/* Send for Test & Finalize Diagnosis Buttons */}
//                 <DoctorPatientDiagnosingSendForTestAndFinalizeDiagnosisButtons onClickSendForTest={onClickSendForTest} onClickFinalizeDiagnosis={onClickFinalizeDiagnosis} />
//             </BoxContainerContent>
//         </BoxContainer>
//     );
// }

// export default DoctorPatientDiagnosing;



















// filepath: d:\WORK\_SUBJECT\_ĐATN\src\disease-diagnosis-support-system\frontend\src\components\doctor\diagnosingPatient\doctorPatientDiagnosing.js
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './style/doctorPatientDiagnosing.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorPatientDiagnosingReasonToVisit from './doctorPatientDiagnosing/doctorPatientDiagnosingReasonToVisit';
import DoctorPatientDiagnosingSymptoms from './doctorPatientDiagnosing/doctorPatientDiagnosingSymptoms';
import DoctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosis from './doctorPatientDiagnosing/doctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosisCard'; // Corrected import if needed
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

    // Simple logic to generate recommendations based on symptoms
    const calculateRecommendations = (symptoms) => {
        const lowerCaseSymptoms = symptoms.toLowerCase();
        let recommendations = [];

        if (lowerCaseSymptoms.includes('a')) {
            recommendations.push(
                { disease: 'Flu', probabilities: '70%' },
                { disease: 'COVID-19', probabilities: '20%' },
                { disease: 'Common Cold', probabilities: '10%' }
            );
        }
        if (lowerCaseSymptoms.includes('b')) {
            recommendations.push(
                { disease: 'Strep Throat', probabilities: '50%' },
                { disease: 'Sore Throat', probabilities: '40%' },
                { disease: 'COVID-19', probabilities: '10%' }
            );
        }
        if (lowerCaseSymptoms.includes('c')) {
            recommendations.push(
                { disease: 'Sore Throat', probabilities: '40%' },
                { disease: 'COVID-19', probabilities: '30%' },
                { disease: 'Flu', probabilities: '20%' },
                { disease: 'Strep Throat', probabilities: '10%' }
            );
        }

        // Add a default or fallback if no specific symptoms match
        // if (recommendations.length === 0 && lowerCaseSymptoms.trim() !== '') {
        //      recommendations.push({ disease: 'Common Cold', probabilities: '30%' });
        // }

        // You might want more complex logic here, adjusting probabilities based on combinations etc.
        // Or call an API:
        // fetch('/api/recommendations', { method: 'POST', body: JSON.stringify({ symptoms }) })
        //  .then(res => res.json())
        //  .then(data => setSystemRecommendations(data))
        //  .catch(err => console.error("Error fetching recommendations:", err));

        setSystemRecommendations(recommendations);
    };


    // Handler for updating symptoms from child component
    const handleSymptomsChange = (symptoms) => {
        setPatientSymptoms(symptoms);
        console.log("Updated symptoms:", symptoms);
        calculateRecommendations(symptoms); // Calculate recommendations when symptoms change
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
        // const diagnosisData = { patientReasonToVisit, patientSymptoms, preliminaryDiagnosis, systemRecommendations, patientData };
        // localStorage.setItem('currentDiagnosis', JSON.stringify(diagnosisData));

        // Navigate to the send for test page
        history.push({
            pathname: '/doctor/send_patient_for_test',
            state: patientData, // Pass necessary data
        });
    };

    // Handler for "Finalize Diagnosis" button
    const onClickFinalizeDiagnosis = () => {
        console.log("Saving diagnosis data before finalizing");

        // You could save this data to localStorage or a global state management solution
        // const diagnosisData = { patientReasonToVisit, patientSymptoms, preliminaryDiagnosis, systemRecommendations, patientData };
        // localStorage.setItem('currentDiagnosis', JSON.stringify(diagnosisData));

        // Navigate to the finalizing diagnosis page
        history.push({
            pathname: '/doctor/finalizing_diagnosis',
            state: patientData, // Pass necessary data
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
                {/* Pass recommendations data down */}
                <DoctorPatientDiagnosingSystemRecommendationAndPreliminaryDiagnosis
                    systemRecommendations={systemRecommendations}
                    preliminaryDiagnosis={preliminaryDiagnosis}
                    setPreliminaryDiagnosis={handlePreliminaryDiagnosisChange}
                />

                {/* Send for Test & Finalize Diagnosis Buttons */}
                <DoctorPatientDiagnosingSendForTestAndFinalizeDiagnosisButtons onClickSendForTest={onClickSendForTest} onClickFinalizeDiagnosis={onClickFinalizeDiagnosis} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPatientDiagnosing;