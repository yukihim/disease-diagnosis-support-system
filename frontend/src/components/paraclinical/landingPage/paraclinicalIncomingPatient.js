import React, { useState, useEffect, useMemo, useCallback } from 'react'; // Added useCallback
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies
import './style/paraclinicalIncomingPatient.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import Button from '../../common/button';
import ButtonText from '../../common/buttonText';

import IncomingPatientOverview from '../../common/incomingPatient/incomingPatientOverview';
import IncomingPatientPagination from '../../common/incomingPatient/incomingPatientPagination';
import IncomingPatientTableHeader from '../../common/incomingPatient/incomingPatientTableHeader';
import IncomingPatientTableContent from '../../common/incomingPatient/incomingPatientTableContent';

const incomingPatientTableHeader = [
    { name: 'Name', width: '150px' },
    { name: 'Sex', width: '50px' },
    { name: 'Age', width: '30px' },
    { name: 'From', width: '100px' },
    { name: 'State', width: '150px' },
    { name: 'Note', width: '250px' }
];

// Define states consistent with backend/frontend
const PATIENT_STATES = {
    ALL: 'all',
    RESULT_READY: 'Test Result Ready',
    WAITING_RESULT: 'Waiting For Result',
    WAITING_TEST: 'Waiting For Test' // Ensure this matches backend value if different
};

// Remove dummy data - it will be fetched
// const incomingPatientTableDummyData = [ ... ];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];

function ParaclinicalIncomingPatient() {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[1]);
    const [currentFilter, setCurrentFilter] = useState(PATIENT_STATES.ALL);
    const [allPatients, setAllPatients] = useState([]); // State for ALL fetched data
    const [displayData, setDisplayData] = useState([]); // State for currently displayed (paginated) data
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // --- Fetch ALL Data on Mount ---
    useEffect(() => {
        const fetchAllIncomingPatients = async () => {
            setIsLoading(true);
            setError(null);
            setAllPatients([]); // Clear previous data

            const token = Cookies.get('token');
            if (!token) {
                setError("User not authenticated.");
                setIsLoading(false);
                return;
            }

            try {
                // Fetch without pagination/filter params to get all data
                const apiUrl = `http://localhost:5001/paraclinical/landing_page/incoming_patient`;
                console.log("Fetching ALL incoming patients from:", apiUrl);

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Response Data (ALL Incoming Patients):", data);

                // Assuming the backend returns all patients in 'incomingPatient' array
                // when no pagination params are sent
                setAllPatients(data.incomingPatient || []); // Store the full list

            } catch (err) {
                console.error("Error fetching all incoming patients:", err);
                setError(err.message || "Failed to fetch incoming patients.");
                setAllPatients([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllIncomingPatients();
    }, []); // Empty dependency array means fetch only once on mount

    // --- Frontend Filtering ---
    const filteredData = useMemo(() => {
        if (isLoading || error) return []; // Don't filter if loading or error
        if (currentFilter === PATIENT_STATES.ALL) {
            return allPatients; // Use the full fetched list
        }
        // Filter the full list based on the selected state
        return allPatients.filter(patient => patient.state === currentFilter);
    }, [currentFilter, allPatients, isLoading, error]); // Re-filter when filter or the full list changes

    // --- Frontend Pagination Calculations ---
    const totalRecords = filteredData.length; // Count based on filtered data

    const totalPages = useMemo(() => {
        return Math.ceil(totalRecords / rowsPerPage);
    }, [totalRecords, rowsPerPage]);

    // --- Update Display Data (Pagination) ---
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalRecords);
        setDisplayData(filteredData.slice(startIndex, endIndex)); // Slice the filtered data
    }, [currentPage, rowsPerPage, filteredData]); // Update display when page, rpp, or filtered data changes

    // --- Reset Page on Filter/RPP Change ---
    useEffect(() => {
        setCurrentPage(1); // Reset page to 1 when filter or rowsPerPage changes
    }, [rowsPerPage, currentFilter]);

    // --- Handlers ---
    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    function handleRowsPerPageChange(newRowsPerPage) {
        setRowsPerPage(newRowsPerPage);
        // setCurrentPage(1) is handled by the useEffect hook above
    }

    function onClickIncomingPatient(patient) {
        // Navigate to the patient test page, passing sessionID
        history.push({
            pathname: '/paraclinical/paraclinical_patient_test',
            state: {
                sessionID: patient.sessionID, // Pass sessionID
            }
        });
    }

    const handleFilterChange = (filterType) => {
        setCurrentFilter(filterType);
        // setCurrentPage(1) is handled by the useEffect hook above
    };

    return (
        <BoxContainer className='bigBoxForParaclinic'>
            <BoxContainerTitle>
                Incoming Patient

                <div className='manyButtonGroup'>
                    {/* Filter Buttons */}
                    <Button className={`buttonText ${currentFilter === PATIENT_STATES.ALL ? 'active' : ''}`} onClick={() => handleFilterChange(PATIENT_STATES.ALL)}>
                        <ButtonText>Show All</ButtonText>
                    </Button>
                    <Button className={`buttonText ${currentFilter === PATIENT_STATES.RESULT_READY ? 'active' : ''}`} onClick={() => handleFilterChange(PATIENT_STATES.RESULT_READY)}>
                        <ButtonText>Show Result Ready</ButtonText>
                    </Button>
                    <Button className={`buttonText ${currentFilter === PATIENT_STATES.WAITING_RESULT ? 'active' : ''}`} onClick={() => handleFilterChange(PATIENT_STATES.WAITING_RESULT)}>
                        <ButtonText>Show Waiting Result</ButtonText>
                    </Button>
                    <Button className={`buttonText ${currentFilter === PATIENT_STATES.WAITING_TEST ? 'active' : ''}`} onClick={() => handleFilterChange(PATIENT_STATES.WAITING_TEST)}>
                        <ButtonText>Show Waiting Test</ButtonText>
                    </Button>
                </div>
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview - Use totalRecords calculated from filteredData */}
                <IncomingPatientOverview currentFilter={currentFilter} incomingPatientCount={totalRecords} />

                {/* Pagination - Use totalPages calculated locally */}
                <IncomingPatientPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    currentRowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />

                <IncomingPatientTableHeader incomingPatientTableHeader={incomingPatientTableHeader} />

                {/* Conditional Rendering for Loading/Error/Content */}
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading patients...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    <IncomingPatientTableContent
                        incomingPatientTableHeader={incomingPatientTableHeader}
                        incomingPatientTableData={displayData} // Use displayData (paginated slice of filtered data)
                        onClickIncomingPatient={onClickIncomingPatient}
                    />
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ParaclinicalIncomingPatient;