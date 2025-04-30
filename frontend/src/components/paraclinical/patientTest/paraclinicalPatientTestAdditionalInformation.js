import React, { useState, useEffect } from 'react'; // Import useState, useEffect
import { useLocation } from 'react-router-dom'; // Import useLocation
import Cookies from 'js-cookie'; // Import Cookies
import './style/paraclinicalPatientTestAdditionalInformation.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ParaclinicalPatientTestAdditionalInformationDisplay from './paraclinicalPatientTestAdditionalInformation/paraclinicalPatientTestAdditionalInformationDisplay';

// Define API base URL (replace with environment variable in real app)
const API_BASE_URL = 'http://localhost:5001';

function ParaclinicalPatientTestAdditionalInformation() {
    const location = useLocation();
    const sessionID = location.state?.sessionID;

    // State for fetched data
    const [sentFromRoom, setSentFromRoom] = useState('Loading...');
    const [doctorNote, setDoctorNote] = useState('Loading...');
    const [testNames, setTestNames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch additional session details (patient info for note/from, test structure for names)
    useEffect(() => {
        const fetchSessionDetails = async () => {
            if (!sessionID) {
                setError("Session ID not found.");
                setSentFromRoom('N/A');
                setDoctorNote('N/A');
                setTestNames([]);
                return;
            }
            setIsLoading(true);
            setError(null);
            const token = Cookies.get('token');
            if (!token) {
                setError("Authentication token not found.");
                setIsLoading(false);
                return;
            }

            try {
                // Fetch 1: Get patient details (for note and from) - Inefficiently fetch all and filter
                // Ideally, a dedicated endpoint /paraclinical/session_details/<sessionID> would exist
                const patientListResponse = await fetch(`${API_BASE_URL}/paraclinical/landing_page/incoming_patient`, {
                     headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!patientListResponse.ok) throw new Error('Failed to fetch patient list');
                const patientListData = await patientListResponse.json();
                const patientDetails = patientListData.incomingPatient?.find(p => p.sessionID === sessionID);

                setSentFromRoom(patientDetails?.from || 'N/A');
                setDoctorNote(patientDetails?.note || 'N/A');

                // Fetch 2: Get test structure (for test names)
                const testStructureResponse = await fetch(`${API_BASE_URL}/paraclinical/patient_test/${sessionID}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                 if (!testStructureResponse.ok) throw new Error('Failed to fetch test structure');
                const testStructureData = await testStructureResponse.json();
                setTestNames(testStructureData.patientTests?.map(t => t.testName) || []);

            } catch (err) {
                console.error("Error fetching session details:", err);
                setError(err.message || "Failed to fetch details.");
                setSentFromRoom('Error');
                setDoctorNote('Error');
                setTestNames([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSessionDetails();
    }, [sessionID]); // Re-fetch if sessionID changes

    const testCount = testNames.length;
    const testTypesString = testNames.join(', ') || (isLoading ? 'Loading...' : 'None');

    return (
        <BoxContainer className='paraclinicalPatientTestAdditionalInformationBox'>
            <BoxContainerTitle className='paraclinicalPatientTestAdditionalInformation'>
                Test Related Information
                {isLoading && <span> Loading...</span>}
                {error && <span style={{ color: 'red' }}> Error: {error}</span>}
            </BoxContainerTitle>

            <BoxContainerContent className='paraclinicalPatientTestAdditionalInformationContent'>
                {/* Sent From Room */}
                <ParaclinicalPatientTestAdditionalInformationDisplay item="Sent From Room" itemValue={sentFromRoom} />

                {/* Doctor Note */}
                <ParaclinicalPatientTestAdditionalInformationDisplay item="Doctor Note" itemValue={doctorNote} />

                {/* Amount of Tests */}
                <ParaclinicalPatientTestAdditionalInformationDisplay item="Amount of Tests" itemValue={isLoading ? 'Loading...' : testCount.toString()} />

                {/* Test Type */}
                <ParaclinicalPatientTestAdditionalInformationDisplay className="spanFull" item="Test Type" itemValue={testTypesString} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ParaclinicalPatientTestAdditionalInformation;