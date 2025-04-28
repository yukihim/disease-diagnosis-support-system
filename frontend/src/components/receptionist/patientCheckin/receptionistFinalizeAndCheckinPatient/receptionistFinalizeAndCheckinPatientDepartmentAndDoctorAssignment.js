import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import './style/receptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment.css';

import ChooseBox from '../../../common/chooseBox';

// Receive state and setters from parent
function ReceptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment({
    patientID, // Receive patientID from parent
    selectedDepartment,
    setSelectedDepartment,
    selectedDoctor,
    setSelectedDoctor,
    setReasonToVisit // Function to update reason in parent
}) {
    // Removed internal state for selectedDepartment and selectedDoctor
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Removed location hook, patientID comes from props now

    // Fetch follow-up data
    useEffect(() => {
        // Check if patientID is valid before fetching
        if (!patientID) {
            setError("Patient ID not provided.");
            // Clear selections if ID becomes invalid
            setSelectedDepartment('');
            setSelectedDoctor('');
            setReasonToVisit(''); // Clear reason in parent
            return;
        }

        const fetchFollowUpData = async () => {
            setIsLoading(true);
            setError(null);
            const token = Cookies.get('token');

            if (!token) {
                setError("User not authenticated.");
                setIsLoading(false);
                return;
            }

            try {
                const apiUrl = `http://localhost:5001/receptionist/finalize_check_in/patient_information/${patientID}/follow_up`;
                console.log("Fetching follow-up info from:", apiUrl);

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        console.log(`No follow-up info found for patient ${patientID}.`);
                        // Clear selections if no follow-up found
                        setSelectedDepartment('');
                        setSelectedDoctor('');
                        setReasonToVisit(''); // Clear reason in parent
                    } else {
                        const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                        throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
                    }
                } else {
                    const data = await response.json();
                    console.log("API Response Data (Follow-up Info):", data);
                    // Update parent state using setters from props
                    setSelectedDepartment(data.department || '');
                    setSelectedDoctor(data.doctor || '');
                    // Update reason in parent state ONLY if it's not empty
                    if (data.reasonToVisit) {
                        setReasonToVisit(data.reasonToVisit);
                    } else {
                        // Optionally clear reason if API returns empty string, or leave existing user input
                        // setReasonToVisit(''); // Uncomment to clear if API reason is empty
                    }
                }

            } catch (err) {
                console.error("Error fetching follow-up information:", err);
                setError(err.message || "Failed to fetch follow-up information.");
                // Clear selections on error
                setSelectedDepartment('');
                setSelectedDoctor('');
                setReasonToVisit(''); // Clear reason in parent on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchFollowUpData();
        // Dependencies: fetch when patientID changes, or when setters change (though unlikely)
    }, [patientID, setSelectedDepartment, setSelectedDoctor, setReasonToVisit]);

    // --- TODO: Fetch actual department and doctor options ---
    const departmentOptions = [
        { label: 'Lão - Ngoại', value: 'Lão - Ngoại' },
        { label: 'Lão - Nội', value: 'Lão - Nội' },
        { label: 'Cấp cứu hồi sức', value: 'Cấp cứu hồi sức' },
        { label: 'Cardiology', value: 'Cardiology' },
        { label: 'Neurology', value: 'Neurology' },
    ];

    const doctorOptions = [
        { label: 'Dr. A', value: 'Dr. A' },
        { label: 'Dr. B', value: 'Dr. B' },
        { label: 'Dr. C', value: 'Dr. C' },
        { label: 'Dr. Jones', value: 'Dr. Jones' },
        { label: 'Dr. Smith', value: 'Dr. Smith' },
    ];
    // --- End TODO ---

    if (isLoading) {
        return <div className="receptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment loading">Loading assignment...</div>;
    }

    return (
        <div className="receptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment">
            {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>Error loading default assignment: {error}</div>}
            <ChooseBox
                text="Choose Department:"
                options={departmentOptions}
                selectedValue={selectedDepartment} // Use prop value
                setSelectedValue={setSelectedDepartment} // Use prop setter
            />
            <ChooseBox
                text="Choose Doctor:"
                options={doctorOptions}
                selectedValue={selectedDoctor} // Use prop value
                setSelectedValue={setSelectedDoctor} // Use prop setter
            />
        </div>
    );
}

export default ReceptionistFinalizeAndCheckinPatientDepartmentAndDoctorAssignment;