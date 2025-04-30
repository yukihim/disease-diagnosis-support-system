import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies
import './style/doctorSendPatientForTestCard.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorSendPatientForTestTestType from './doctorSendPatientForTest/doctorSendPatientForTestTestType';
import DoctorSendPatientForTestNote from './doctorSendPatientForTest/doctorSendPatientForTestNote';
import DoctorSendPatientForTestCancelOrConfirmButton from './doctorSendPatientForTest/doctorSendPatientForTestCancelOrConfirmButton';

const API_BASE_URL = "http://localhost:5001/doctor";

// Accept sessionID as a prop
function DoctorSendPatientForTestCard({ sessionID }) {
    const history = useHistory();

    // State for selected tests (managed here)
    const [selectedTestValues, setSelectedTestValues] = useState([]);
    // State for the note (managed here)
    const [note, setNote] = useState('');
    // State for API submission
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // Handler for toggling test selection (passed down)
    const handleTestTypeToggle = (testValue) => {
        setSelectedTestValues(prev =>
            prev.includes(testValue)
                ? prev.filter(value => value !== testValue)
                : [...prev, testValue]
        );
    };

    // Handler for note change (passed down)
    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };

    // Handler for "Confirm" button - Now makes API call
    const onClickConfirmSendForTest = async () => {
        if (selectedTestValues.length === 0) {
            setSubmitError("Please select at least one test type.");
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
            console.log(`API Call: Sending tests for session ${sessionID}:`, selectedTestValues);
            const response = await fetch(`${API_BASE_URL}/send_for_test/test_list/${sessionID}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                // The backend expects an object with a 'tests' key containing the array of test names (values)
                body: JSON.stringify({ tests: selectedTestValues }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Failed to send tests: ${response.statusText}`);
            }

            console.log("API Call: Tests sent successfully.");
            alert("Patient sent for test request successfully!"); // Keep simple alert for now
            history.push("/doctor/homepage"); // Navigate on success

        } catch (error) {
            console.error("Error sending patient for test:", error);
            setSubmitError(error.message || "An unexpected error occurred while sending the test request.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handler for "Cancel" button
    const onClickCancelSendForTest = () => {
        history.goBack();
    };

    return (
        <BoxContainer className='doctorSendPatientForTestCardBox'>
            <BoxContainerTitle className='doctorSendPatientForTestCard'>
                Send Patient For Test
            </BoxContainerTitle>

            <BoxContainerContent className='doctorSendPatientForTestCardContent'>
                {/* Test type - Pass state and handler */}
                <DoctorSendPatientForTestTestType
                    selectedTestValues={selectedTestValues}
                    onTestTypeToggle={handleTestTypeToggle}
                />

                {/* Note if any - Pass state and handler */}
                <DoctorSendPatientForTestNote
                    note={note}
                    onNoteChange={handleNoteChange}
                />

                {/* Cancel or Confirm button - Pass handlers and submission state */}
                <DoctorSendPatientForTestCancelOrConfirmButton
                    onClickCancelSendForTest={onClickCancelSendForTest}
                    onClickConfirmSendForTest={onClickConfirmSendForTest}
                    isSubmitting={isSubmitting}
                    submitError={submitError}
                />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorSendPatientForTestCard;