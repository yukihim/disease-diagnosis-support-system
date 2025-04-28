import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import './style/receptionistFinalizeAndCheckinPatientCheckinButton.css';

import Button from '../../../common/button';
import ButtonText from '../../../common/buttonText';

// Receive necessary data from parent
function ReceptionistFinalizeAndCheckinPatientCheckinButton({ patientID, reasonToVisit, department, doctor }) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckin = async () => {
        if (!patientID) {
            alert("Error: Patient ID is missing.");
            return;
        }
        if (!reasonToVisit || !department || !doctor) {
            alert("Error: Please ensure Reason to Visit, Department, and Doctor are selected.");
            return;
        }

        setIsLoading(true);
        const token = Cookies.get('token');

        if (!token) {
            alert("Error: Authentication token not found.");
            setIsLoading(false);
            return;
        }

        const payload = {
            reasonForVisit: reasonToVisit,
            department: department,
            doctor: doctor,
        };

        try {
            const apiUrl = `http://localhost:5001/receptionist/finalize_check_in/patient_information/${patientID}/checkin`;
            console.log("Checking in patient:", apiUrl);
            console.log("Payload:", JSON.stringify(payload));

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json(); // Attempt to parse JSON regardless of status

            if (!response.ok) {
                throw new Error(result.error || result.message || `Check-in failed: ${response.status}`);
            }

            console.log("Check-in Response:", result);
            alert(result.message || "Patient checked in successfully!");
            history.push("/receptionist/homepage");
        } catch (err) {
            console.error("Error checking in patient:", err);
            alert(`Error: ${err.message || "Failed to check in patient."}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="receptionistFinalizeAndCheckinPatientCheckinButton">
            <Button
                onClick={handleCheckin}
                disabled={isLoading || !patientID} // Disable if loading or no patientID
            >
                <ButtonText>
                    {isLoading ? 'Checking In...' : 'Check in for Patient'}
                </ButtonText>
            </Button>
        </div>
    );
}

export default ReceptionistFinalizeAndCheckinPatientCheckinButton;