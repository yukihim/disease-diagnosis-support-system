import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies

import PageLayout from '../pageLayout';

import PatientInformationCard from '../patientInformationCard';
import DoctorPatientVitalSignsAndPhysicalMeasurements from '../../doctor/diagnosingPatient/doctorPatientVitalSignsAndPhysicalMeasurements';
import DoctorPatientParaclinicalTestResult from '../../doctor/diagnosingPatient/doctorPatientParaclinicalTestResult';
import DoctorPrescriptionAndProcedureDiagnosisResult from '../../doctor/prescriptionAndProcedure/doctorPrescriptionAndProcedureDiagnosisResult';
import GoBackButton from './components/goBackButton';
import Prescription from './components/prescription'; // Import updated component
import Procedure from './components/procedure'; // Import updated component

const API_BASE_URL = "http://localhost:5001"; // Define base URL

function PassDiagnosisSessionsPage() {
    const history = useHistory();
    const location = useLocation();

    // Extract sessionID from location state
    const { sessionID } = location.state || {};

    // State for session data, loading, and error
    const [sessionData, setSessionData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch session details when component mounts or sessionID changes
    useEffect(() => {
        if (!sessionID) {
            setError("Session ID not provided.");
            setIsLoading(false);
            return;
        }

        const fetchSessionDetails = async () => {
            setIsLoading(true);
            setError(null);
            const token = Cookies.get('token'); // Use 'token'

            if (!token) {
                setError("Authentication token not found.");
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/pass_sessions/${sessionID}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                    throw new Error(errorData.message || `Failed to fetch session details: ${response.statusText}`);
                }

                const data = await response.json();
                setSessionData(data);
                // console.log("Fetched Pass Session Data:", data); 

            } catch (err) {
                console.error("Error fetching session details:", err);
                setError(err.message || "An unexpected error occurred.");
                setSessionData(null); // Clear data on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchSessionDetails();
    }, [sessionID]); // Dependency array includes sessionID

    const onClickGoBackToPreviousPage = () => {
        history.goBack();
    };

    // Conditional rendering based on loading/error state
    if (isLoading) {
        return <PageLayout useGrid={false}><div style={{ textAlign: 'center', padding: '20px' }}>Loading session details...</div></PageLayout>;
    }

    if (error) {
        return <PageLayout useGrid={false}><div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Error: {error}</div></PageLayout>;
    }

    if (!sessionData) {
         return <PageLayout useGrid={false}><div style={{ textAlign: 'center', padding: '20px' }}>No session data found.</div></PageLayout>;
    }

    // Extract data for child components
    const patientInfo = sessionData.patientInformation || {};
    const vitalSigns = sessionData.vitalSigns || [];
    const testResults = sessionData.testResults || [];
    const finalDiagnosis = sessionData.finalDiagnosis || {}; // Contains symptom, diagnosis, note
    const prescriptions = sessionData.prescriptions || [];
    const procedures = sessionData.procedures || [];

    return (
        <PageLayout useGrid={false}>
            {/* Patient Information Card - Pass fetched data */}
            <PatientInformationCard
                patientName={patientInfo.name}
                dob={patientInfo.dob}
                gender={patientInfo.gender}
                phone={patientInfo.phone}
                ssn={patientInfo.ssn}
                hic={patientInfo.hic} // Assuming hic is insurance number
                job={patientInfo.job}
                address={patientInfo.address}
                // Pass height and weight if available and needed by the card
                height={patientInfo.height}
                weight={patientInfo.weight}
                // Pass role if needed, assuming 'doctor' or 'nurse' can view this
                role="doctor"
            />

            {/* Pass fetched data to other relevant cards */}
            {/* Note: These components might need internal updates to accept and display props */}
            <DoctorPatientVitalSignsAndPhysicalMeasurements
                userRole="doctor" // Or determine dynamically if needed
                vitalSignsData={vitalSigns} // Pass fetched vital signs
            />
            <DoctorPatientParaclinicalTestResult
                 testResultsData={testResults} // Pass fetched test results
            />
            <DoctorPrescriptionAndProcedureDiagnosisResult
                patientSymptoms={finalDiagnosis.symptoms} // Pass symptom from finalDiagnosis
                finalDiagnosis={finalDiagnosis.diagnosis} // Pass diagnosis from finalDiagnosis
                // Pass note if the component supports it
            />

            {/* Prescriptions & Procedure - Pass fetched data */}
            <Prescription prescriptionData={prescriptions} />
            <Procedure procedureData={procedures} />

            {/* Return */}
            <GoBackButton onClickGoBackToPreviousPage={onClickGoBackToPreviousPage} />
        </PageLayout>
    );
}

export default PassDiagnosisSessionsPage;