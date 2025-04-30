import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import PageLayout from '../../components/common/pageLayout';

import PatientInformationCard from '../../components/common/patientInformationCard';
import PatientPassSessions from '../../components/common/patientPassSessions/patientPassSessions';
import DoctorPatientVitalSignsAndPhysicalMeasurements from '../../components/doctor/diagnosingPatient/doctorPatientVitalSignsAndPhysicalMeasurements';
import DoctorPatientParaclinicalTestResult from '../../components/doctor/diagnosingPatient/doctorPatientParaclinicalTestResult';
import DoctorPrescriptionAndProcedureDiagnosisResult from '../../components/doctor/prescriptionAndProcedure/doctorPrescriptionAndProcedureDiagnosisResult';
import DoctorPrescriptionAndProcedurePrescriptionsCard from '../../components/doctor/prescriptionAndProcedure/doctorPrescriptionAndProcedurePrescriptionsCard';
import DoctorPrescriptionAndProcedureProceduresCard from '../../components/doctor/prescriptionAndProcedure/doctorPrescriptionAndProcedureProceduresCard';
import DoctorPrescriptionAndProcedureEndDiagnosisSessionButton from '../../components/doctor/prescriptionAndProcedure/doctorPrescriptionAndProcedureEndDiagnosisSessionButton';

const API_BASE_URL = "http://localhost:5001/doctor";

function DoctorPrescriptionAndProcedure() {
    const history = useHistory();
    const location = useLocation();
    const [error, setError] = useState(null);

    // State to hold the latest data from child cards
    const [currentPrescriptions, setCurrentPrescriptions] = useState([]);
    const [currentProcedures, setCurrentProcedures] = useState([]);
    const [currentFollowUpDate, setCurrentFollowUpDate] = useState(''); // Added state for follow-up date

    // Extract data passed from the previous page
    const {
        patientName,
        sessionID,
        patientSymptoms,
        finalDiagnosis
    } = location.state || {};

    // Callback function to receive prescription data updates
    const handlePrescriptionDataUpdate = (updatedPrescriptions) => {
        setCurrentPrescriptions(updatedPrescriptions);
    };

    // Callback function to receive procedure data updates
    const handleProcedureDataUpdate = (updatedProcedures) => {
        setCurrentProcedures(updatedProcedures);
    };

    // Callback function to receive follow-up date updates
    const handleFollowUpDateUpdate = (updatedDate) => {
        setCurrentFollowUpDate(updatedDate); // Update state with YYYY-MM-DD string
        // console.log("Parent received updated follow-up date:", updatedDate); // For debugging
    };


    function onClickSession(session) {
        // ... existing code ...
        history.push({
            pathname: '/view_pass_session',
            state: {
                patientName: patientName,
                patientSessionDate: session.sessionDate,
                sessionID: session.sessionID
            }
        });
    }

    const onClickEndDiagnosisSession = async () => {
        setError(null);
        const token = Cookies.get('token');

        if (!sessionID) {
            setError("Session ID is missing. Cannot end session.");
            console.error("Session ID is missing from location state.");
            return;
        }

        if (!token) {
            setError("Authentication token not found. Please log in again.");
            return;
        }

        // --- Prepare Prescription Data ---
        const prescriptionsToSend = currentPrescriptions;
        const nonEmptyPrescriptions = prescriptionsToSend.filter(p =>
            p.medicine?.trim() !== '' ||
            p.morning?.trim() !== '' ||
            p.noon?.trim() !== '' ||
            p.afternoon?.trim() !== '' ||
            p.evening?.trim() !== '' ||
            p.duration?.trim() !== '' ||
            p.note?.trim() !== ''
        );

        // --- Prepare Procedure Data ---
        const proceduresToSend = currentProcedures;
        const nonEmptyProcedures = proceduresToSend
            .filter(p =>
                p.procedure?.trim() !== '' ||
                p.datetime?.trim() !== '' ||
                p.note?.trim() !== ''
            )
            .map(p => ({
                procedureName: p.procedure,
                dateTime: p.datetime,
                note: p.note
            }));

        // --- Prepare Follow-up Data ---
        // The state `currentFollowUpDate` already holds the 'YYYY-MM-DD' string
        const followUpDateToSend = currentFollowUpDate;


        // --- API Calls ---
        let prescriptionSuccess = false;
        let procedureSuccess = false;
        let followUpSuccess = false; // Added flag for follow-up

        try {
            // Call Set Prescription API
            if (nonEmptyPrescriptions.length > 0) {
                console.log("Sending prescriptions:", JSON.stringify({ prescription: nonEmptyPrescriptions }));
                const presResponse = await fetch(`${API_BASE_URL}/prescription_and_procedure/set_prescription/${sessionID}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prescription: nonEmptyPrescriptions }),
                });
                if (!presResponse.ok) {
                    const errorData = await presResponse.json().catch(() => ({ message: `HTTP error! status: ${presResponse.status}` }));
                    throw new Error(`Failed to set prescriptions: ${errorData.message || presResponse.statusText}`);
                }
                console.log("Prescription API Success:", (await presResponse.json()).message);
                prescriptionSuccess = true;
            } else {
                console.log("No non-empty prescriptions to send.");
                prescriptionSuccess = true;
            }

            // Call Set Procedure API
            if (nonEmptyProcedures.length > 0) {
                console.log("Sending procedures:", JSON.stringify({ procedure: nonEmptyProcedures }));
                const procResponse = await fetch(`${API_BASE_URL}/prescription_and_procedure/set_procedure/${sessionID}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ procedure: nonEmptyProcedures }),
                });
                if (!procResponse.ok) {
                    const errorData = await procResponse.json().catch(() => ({ message: `HTTP error! status: ${procResponse.status}` }));
                    throw new Error(`Failed to set procedures: ${errorData.message || procResponse.statusText}`);
                }
                console.log("Procedure API Success:", (await procResponse.json()).message);
                procedureSuccess = true;
            } else {
                console.log("No non-empty procedures to send.");
                procedureSuccess = true;
            }

            // Call Set Follow Up API (only if a date is selected)
            if (followUpDateToSend) {
                console.log("Sending follow-up date:", JSON.stringify({ date: followUpDateToSend }));
                const followUpResponse = await fetch(`${API_BASE_URL}/prescription_and_procedure/set_follow_up/${sessionID}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ date: followUpDateToSend }), // Backend expects { "date": "YYYY-MM-DD" }
                });
                if (!followUpResponse.ok) {
                    const errorData = await followUpResponse.json().catch(() => ({ message: `HTTP error! status: ${followUpResponse.status}` }));
                    throw new Error(`Failed to set follow-up date: ${errorData.message || followUpResponse.statusText}`);
                }
                console.log("Follow-up API Success:", (await followUpResponse.json()).message);
                followUpSuccess = true;
            } else {
                console.log("No follow-up date selected to send.");
                followUpSuccess = true; // Consider success if no date was set
            }


            // Check if all were successful
            if (prescriptionSuccess && procedureSuccess && followUpSuccess) {
                alert("Diagnosis session ended successfully! Prescriptions, procedures, and follow-up date saved.");
                history.push('/doctor/homepage'); // Redirect only after all successful calls
            } else {
                 console.log("One or more API calls failed. Check error message.");
            }

        } catch (error) {
            console.error("Failed to save session data:", error);
            setError(`Failed to save session data: ${error.message}`);
        }
    };

    // Effect to log state changes for debugging
    useEffect(() => {
        console.log("Location state:", location.state);
        console.log("Current Session ID:", sessionID);
    }, [location.state, sessionID]);


    return (
        <PageLayout requiredRole="doctor" useGrid={false}>
            {/* ... existing cards ... */}
             <PatientInformationCard patientName={patientName} />
             <PatientPassSessions role="doctor" onClickSession={onClickSession} />
             <DoctorPatientVitalSignsAndPhysicalMeasurements userRole="doctor" />
             <DoctorPatientParaclinicalTestResult />
             <DoctorPrescriptionAndProcedureDiagnosisResult
                 patientSymptoms={patientSymptoms}
                 finalDiagnosis={finalDiagnosis}
             />
             <DoctorPrescriptionAndProcedurePrescriptionsCard
                onPrescriptionDataUpdate={handlePrescriptionDataUpdate}
             />
             <DoctorPrescriptionAndProcedureProceduresCard
                onProcedureDataUpdate={handleProcedureDataUpdate}
             />

            {/* Display error message if any */}
            {error && <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</div>}

            {/* End Diagnosis Session Button - Pass the update callback */}
            <DoctorPrescriptionAndProcedureEndDiagnosisSessionButton
                onClickEndDiagnosisSession={onClickEndDiagnosisSession}
                onFollowUpDateUpdate={handleFollowUpDateUpdate} // Pass callback
            />
        </PageLayout>
    );
}

export default DoctorPrescriptionAndProcedure;