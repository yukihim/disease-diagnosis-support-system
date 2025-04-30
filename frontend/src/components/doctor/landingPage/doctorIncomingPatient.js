import React, { useState, useEffect, useMemo, useCallback } from 'react'; // Import useCallback
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import IncomingPatientOverview from '../../common/incomingPatient/incomingPatientOverview';
import IncomingPatientPagination from '../../common/incomingPatient/incomingPatientPagination'; // Ensure this is imported
import IncomingPatientTableHeader from '../../common/incomingPatient/incomingPatientTableHeader';
import IncomingPatientTableContent from '../../common/incomingPatient/incomingPatientTableContent';

const incomingPatientTableHeader = [
    { name: 'Name', width: '130px' },
    { name: 'Sex', width: '50px' },
    { name: 'Age', width: '30px' },
    { name: 'From', width: '100px' },
    { name: 'State', width: '150px' },
    { name: 'Note', width: '170px' }
];

// Define options for rows per page
const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];
const API_BASE_URL = 'http://localhost:5001/doctor'; // Define base URL for doctor API

function DoctorIncomingPatient({ role }) {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]); // Default to 5
    const [allPatients, setAllPatients] = useState([]); // Store all fetched patients
    const [displayData, setDisplayData] = useState([]); // Data currently displayed on the page
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // --- Fetch Data from Backend ---
    const fetchIncomingPatients = useCallback(async () => {
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
            // Use the correct endpoint from Doctor/routes.py
            const apiUrl = `${API_BASE_URL}/landing_page/incoming_patient`;
            // console.log("Fetching incoming patients from:", apiUrl);

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
            // console.log("API Response Data (Incoming Patients):", data);

            // Assuming the backend returns the list in 'incomingPatient' array
            setAllPatients(data.incomingPatient || []);

        } catch (err) {
            console.error("Error fetching incoming patients:", err);
            setError(err.message || "Failed to fetch incoming patients.");
            setAllPatients([]);
        } finally {
            setIsLoading(false);
        }
    }, []); // Empty dependency array means fetch only once on mount

    // Fetch data when component mounts
    useEffect(() => {
        fetchIncomingPatients();
    }, [fetchIncomingPatients]);

    // --- Pagination Calculations ---
    const totalRecords = allPatients.length;

    const totalPages = useMemo(() => {
        return Math.ceil(totalRecords / rowsPerPage);
    }, [totalRecords, rowsPerPage]);

    // --- Update Display Data (Pagination) ---
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalRecords);
        setDisplayData(allPatients.slice(startIndex, endIndex));
    }, [currentPage, rowsPerPage, allPatients, totalRecords]); // Update display when page, rpp, or data changes

    // --- Reset Page on RPP Change ---
    useEffect(() => {
        setCurrentPage(1); // Reset page to 1 when rowsPerPage changes
    }, [rowsPerPage]);

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
        let pathnameUrl='';

        // Use the role prop passed down to determine navigation
        if (role === 'doctor') {
            pathnameUrl = '/doctor/diagnosis';
        } else if (role === 'nurse') {
            pathnameUrl = '/nurse/add_patient_measurements';
        } else {
            console.error("Unknown role:", role);
            return; // Don't navigate if role is unexpected
        }

        // console.log("Navigating with patient data:", patient);
        // Navigate to the next page with patient information
        // Ensure the state includes sessionID from the backend data
        history.push({
            pathname: pathnameUrl,
            state: {
                sessionID: patient.sessionID, // Pass sessionID
                name: patient.name,
                sex: patient.sex,
                age: patient.age,
            }
        });
    }

    return (
        <BoxContainer className='bigBox'>
            <BoxContainerTitle>
                Incoming Patient
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <IncomingPatientOverview incomingPatientCount={totalRecords} />

                {/* Pagination - Pass new props */}
                <IncomingPatientPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS} // Pass options
                    currentRowsPerPage={rowsPerPage} // Pass current value
                    onRowsPerPageChange={handleRowsPerPageChange} // Pass handler
                />

                {/* Table header */}
                <IncomingPatientTableHeader incomingPatientTableHeader={incomingPatientTableHeader} />

                {/* Conditional Rendering for Loading/Error/Content */}
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading patients...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    <IncomingPatientTableContent
                        incomingPatientTableHeader={incomingPatientTableHeader}
                        incomingPatientTableData={displayData} // Use displayData (paginated slice of fetched data)
                        onClickIncomingPatient={onClickIncomingPatient}
                    />
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorIncomingPatient;