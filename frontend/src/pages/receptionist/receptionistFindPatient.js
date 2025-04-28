import React, { useState, useEffect, useRef, useCallback } from 'react'; // Added useRef, useCallback
import Cookies from 'js-cookie'; // Added Cookies

import PageLayout from '../../components/common/pageLayout';
import ReceptionistPatientIndentification from '../../components/receptionist/findPatient/receptionistPatientIndentification';
import ReceptionistPatientFound from '../../components/receptionist/findPatient/receptionistPatientFound';

// Debounce delay in milliseconds
const DEBOUNCE_DELAY = 2000; // 2 seconds

// Remove mock data
// const allPatientData = [ ... ];

function ReceptionistFindPatient() {
    const [ssnFilter, setSsnFilter] = useState('');
    const [healthInsuranceFilter, setHealthInsuranceFilter] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [isListVisible, setIsListVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const [error, setError] = useState(null); // Added error state

    const debounceTimeoutRef = useRef(null); // Ref for debounce timer

    // --- API Fetch Function ---
    const fetchPatients = useCallback(async (searchTerm, searchType) => {
        setIsLoading(true);
        setError(null);
        setFilteredPatients([]); // Clear previous results immediately
        setIsListVisible(true); // Show list area (for loading/error/results)

        console.log(`Starting API call for ${searchType}: ${searchTerm} (after delay)`);

        const token = Cookies.get('token');
        if (!token) {
            setError("User not authenticated.");
            setIsLoading(false);
            return;
        }

        let apiUrl = '';
        let bodyData = {};

        // Determine API endpoint and body based on search type
        if (searchType === 'ssn') {
            apiUrl = 'http://localhost:5001/receptionist/find_patient/ssn';
            bodyData = { ssn: searchTerm };
        } else if (searchType === 'hic') {
            apiUrl = 'http://localhost:5001/receptionist/find_patient/hic';
            bodyData = { hic: searchTerm };
        } else {
            setError("Invalid search type specified."); // Should not happen with current logic
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                // Use backend error message if available
                throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("API Response Data (Patient Find):", data);
            // Use the 'patients' key from the backend response
            const results = data.patients || [];
            setFilteredPatients(results);
            if (results.length === 0) {
                 setError("No patients found matching the criteria."); // Inform user if no results
            }

        } catch (err) {
            console.error(`Error fetching patients by ${searchType}:`, err);
            setError(err.message || `Failed to fetch patients by ${searchType}.`);
            setFilteredPatients([]); // Ensure results are cleared on error
        } finally {
            setIsLoading(false); // Stop loading indicator regardless of success/failure
        }
    }, []); // useCallback dependencies are empty

    // --- Debounced Effect for API Calls ON INPUT CHANGE ---
    useEffect(() => {
        // Clear any existing timeout whenever ssnFilter or healthInsuranceFilter changes
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        const currentSsn = ssnFilter.trim();
        const currentHic = healthInsuranceFilter.trim();

        // Only set a new timeout if at least one filter has a non-empty value
        if (currentSsn || currentHic) {
            debounceTimeoutRef.current = setTimeout(() => {
                // This code runs *after* the DEBOUNCE_DELAY (2 seconds)
                // Prioritize SSN search if both are somehow filled after trimming
                if (currentSsn) {
                    fetchPatients(currentSsn, 'ssn');
                } else { // Only HIC is filled
                    fetchPatients(currentHic, 'hic');
                }
            }, DEBOUNCE_DELAY); // Use the 2000ms delay
        } else {
            // Both filters are empty/whitespace, clear results and hide list immediately
            setFilteredPatients([]);
            setError(null); // Clear any previous errors
            setIsLoading(false); // Ensure loading is off
            setIsListVisible(false); // Hide the results area
        }

        // Cleanup function: clear the timeout if the component unmounts
        // or if the effect re-runs before the timeout finishes.
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
        // Re-run this effect if filter values or the fetch function changes
    }, [ssnFilter, healthInsuranceFilter, fetchPatients]);

    // --- Event Handlers ---
    function handleSsnChange(event) {
        setSsnFilter(event.target.value);
        // Optionally clear the other filter for better UX
        // setHealthInsuranceFilter('');
    }

    function handleHealthInsuranceChange(event) {
        setHealthInsuranceFilter(event.target.value);
        // Optionally clear the other filter for better UX
        // setSsnFilter('');
    }

    // --- Handler for the Find Button Click (Optional, but kept from previous logic) ---
    // This allows immediate search bypassing the debounce
    function handleFindClick() {
        // Clear any pending debounce timeout immediately
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        const currentSsn = ssnFilter.trim();
        const currentHic = healthInsuranceFilter.trim();

        // Trigger fetch immediately based on current input values
        if (currentSsn) {
            console.log("Find Click: Fetching SSN immediately");
            fetchPatients(currentSsn, 'ssn');
        } else if (currentHic) {
            console.log("Find Click: Fetching HIC immediately");
            fetchPatients(currentHic, 'hic');
        } else {
            // Handle button click with no input
            setError("Please enter SSN or Health Insurance Number to search.");
            setIsListVisible(true); // Show the area to display the error
            setFilteredPatients([]);
            setIsLoading(false);
        }
    }


    return (
        <PageLayout requiredRole="receptionist" useGrid={false}>
            <ReceptionistPatientIndentification
                onChangeSSN={handleSsnChange}
                onChangeHealthInsuranceNumber={handleHealthInsuranceChange}
                ssnValue={ssnFilter} // Pass state value
                healthInsuranceValue={healthInsuranceFilter} // Pass state value
                onClickFind={handleFindClick} // Pass the immediate find handler
            />
            {/* Pass visibility, data, loading, and error states */}
            <ReceptionistPatientFound
                patientFoundTableData={filteredPatients}
                isVisible={isListVisible}
                isLoading={isLoading} // Pass loading state
                error={error} // Pass error state
            />
        </PageLayout>
    );
}

export default ReceptionistFindPatient;