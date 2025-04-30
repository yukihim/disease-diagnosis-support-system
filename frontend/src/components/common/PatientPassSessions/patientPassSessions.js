import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Cookies from 'js-cookie'; // Import Cookies
import './style/patientPassSessions.css';

import BoxContainer from '../boxContainer';
import BoxContainerTitle from '../boxContainerTitle';
import BoxContainerContent from '../boxContainerContent';

import PatientPassSessionsOverview from './components/patientPassSessionsOverview';
import PatientPassSessionsPagination from './components/patientPassSessionsPagination';
import PatientPassSessionsHeader from './components/patientPassSessionsHeader';
import PatientPassSessionsTable from './components/patientPassSessionsTable';

const patientPassSessionsTableHeader = [
    { name: 'Session Date', width: '150px' }, // Adjusted width
    { name: 'Session Type', width: '150px' }, // Adjusted width
    { name: 'Person In Charged', width: '200px' },
    { name: 'Department', width: '200px' },
    { name: 'Result', width: '250px' } // Adjusted width
];

// Removed dummy data

const ROWS_PER_PAGE_OPTIONS = [3, 5, 10]; // Adjusted options

// Keep role and onClickSession props
function PatientPassSessions({ role, onClickSession }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]); // Default to 3
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [allSessionsData, setAllSessionsData] = useState([]); // State for fetched data
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Get sessionID from location state
    const location = useLocation();
    // Adjust key based on how it was pushed in ReceptionistPatientFound
    const sessionID = location.state?.sessionID || "";

    // console.log("PATIENT PASS SESSIONS _ Session ID from location state:", sessionID);

    // --- Fetch Data ---
    useEffect(() => {
        // Don't fetch if sessionID is missing
        if (!sessionID) {
            setError("Patient ID not found in location state.");
            setAllSessionsData([]); // Clear data if no ID
            return;
        }

        const fetchPassSessions = async () => {
            setIsLoading(true);
            setError(null);
            const token = Cookies.get('token');

            if (!token) {
                setError("User not authenticated.");
                setIsLoading(false);
                setAllSessionsData([]);
                return;
            }

            try {
                // Use the correct endpoint: /pass_sessions/<sessionID>
                const apiUrl = `http://localhost:5001/pass_sessions/${sessionID}`;
                console.log("PatientPassSessions _ Fetching pass sessions from:", apiUrl);

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
                // Log the actual data received from the backend
                console.log("PATIENT PASS SESSIONS _ API Response Data:", data);

                // The backend returns a single object, wrap it in an array
                // Check if data is not null/undefined before wrapping
                setAllSessionsData(data ? [data] : []);

            } catch (err) {
                console.error("Error fetching pass sessions:", err);
                setError(err.message || "Failed to fetch pass sessions.");
                setAllSessionsData([]); // Clear data on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchPassSessions();
    }, [sessionID]); // Dependency array includes sessionID from location state

    // --- Sorting Logic ---
    const sortedData = useMemo(() => {
        let sortableData = [...allSessionsData]; // Use fetched data
        if (sortConfig.key) {
            const keyMap = {
                'Session Date': 'sessionDate',
                'Session Type': 'sessionType',
                'Person In Charged': 'personInCharged', // Match API response key
                'Department': 'department',
                'Result': 'result'
            };
            const dataKey = keyMap[sortConfig.key] || sortConfig.key.toLowerCase();

            sortableData.sort((a, b) => {
                let aValue = a[dataKey];
                let bValue = b[dataKey];

                if (dataKey === 'sessionDate') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                }

                const valA = aValue === undefined || aValue === null ? '' : aValue;
                const valB = bValue === undefined || bValue === null ? '' : bValue;

                if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableData;
    }, [sortConfig, allSessionsData]); // Depend on fetched data

    // Calculate total count from sorted (fetched) data
    const totalSessionsCount = sortedData.length;

    // Calculate total pages based on current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(totalSessionsCount / rowsPerPage);
    }, [totalSessionsCount, rowsPerPage]);

    // Update displayed data when page, rowsPerPage, or sortedData changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalSessionsCount);
        setDisplayData(sortedData.slice(startIndex, endIndex));
    }, [currentPage, rowsPerPage, sortedData, totalSessionsCount]);

    // Reset to first page when rowsPerPage, sorting, or sessionID changes
    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage, sortConfig, sessionID]); // Add sessionID dependency

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    function handleRowsPerPageChange(newRowsPerPage) {
        setRowsPerPage(newRowsPerPage);
    }

    function handleSort(key) {
        let direction = 'asc';
        let nextKey = key;

        if (sortConfig.key === key) {
            if (sortConfig.direction === 'asc') {
                direction = 'desc';
            } else if (sortConfig.direction === 'desc') {
                direction = null;
                nextKey = null;
            }
        }
        setSortConfig({ key: nextKey, direction });
    }

    return (
        <BoxContainer className='patientPassSessionsBox'>
            <BoxContainerTitle className='patientPassSessions'>
                Patient's Pass Sessions
            </BoxContainerTitle>

            <BoxContainerContent className='patientPassSessionsContent'>
                <PatientPassSessionsOverview totalSessionsCount={totalSessionsCount} />
                <PatientPassSessionsPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    currentRowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
                <PatientPassSessionsHeader
                    patientPassSessionsTableHeader={patientPassSessionsTableHeader}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                />

                {/* Conditional rendering for loading/error states */}
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading sessions...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    /* Pass displayed data and onClickSession prop */
                    <PatientPassSessionsTable
                        patientPassSessionsTableHeader={patientPassSessionsTableHeader}
                        patientPassSessionsTableData={displayData} // Use state variable holding paginated data
                        onClickSession={onClickSession} // Keep passing the prop
                    />
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default PatientPassSessions;