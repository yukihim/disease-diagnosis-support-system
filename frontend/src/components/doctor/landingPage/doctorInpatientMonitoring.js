import React, { useState, useEffect, useMemo, useCallback } from 'react'; // Import useCallback
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorInpatientMonitoringOverview from './doctorMonitoringInpatient/doctorInpatientMonitoringOverview';
import DoctorInpatientMonitoringPagination from './doctorMonitoringInpatient/doctorInpatientMonitoringPagination';
import DoctorInpatientMonitoringTableHeader from './doctorMonitoringInpatient/doctorInpatientMonitoringTableHeader';
import DoctorInpatientMonitoringTableContent from './doctorMonitoringInpatient/doctorInpatientMonitoringTableContent';

const inpatientMonitoringTableHeader = [
    { name: 'Name', width: '130px' },
    { name: 'Sex', width: '50px' },
    { name: 'Age', width: '30px' },
    { name: 'Room', width: '70px' },
    { name: 'Admission Date', width: '130px' },
    { name: 'Condition', width: '160px' },
    { name: 'Status', width: '70px' }
];

// Remove dummy data
// const inpatientMonitoringTableDummyData = [ ... ];

const ROWS_PER_PAGE_OPTIONS = [3, 5, 7]; // Define options for rows per page
const API_BASE_URL = 'http://localhost:5001/doctor'; // Define base URL for doctor API

function DoctorInpatientMonitoring({ userRole }) {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[1]); // Default to 5 (index 1)
    const [inpatientData, setInpatientData] = useState([]); // State for fetched data
    const [displayData, setDisplayData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // --- Fetch Data from Backend ---
    const fetchInpatients = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setInpatientData([]); // Clear previous data

        const token = Cookies.get('token');
        if (!token) {
            setError("User not authenticated.");
            setIsLoading(false);
            return;
        }

        try {
            // Use the correct endpoint from Doctor/routes.py
            const apiUrl = `${API_BASE_URL}/landing_page/inpatient_monitoring`;
            // console.log("Fetching inpatient monitoring data from:", apiUrl);

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
            // console.log("INPATIENT MONITORING _ API Response Data (Inpatient Monitoring):", data);

            // Assuming the backend returns the list in 'inpatientMonitoring' array
            setInpatientData(data.inpatientMonitoring || []);

        } catch (err) {
            console.error("Error fetching inpatient monitoring data:", err);
            setError(err.message || "Failed to fetch inpatient monitoring data.");
            setInpatientData([]);
        } finally {
            setIsLoading(false);
        }
    }, []); // Empty dependency array means fetch only once on mount

    // Fetch data when component mounts
    useEffect(() => {
        fetchInpatients();
    }, [fetchInpatients]);

    // Calculate total count based on fetched data
    const totalRecords = inpatientData.length;

    // Calculate total pages based on fetched data and current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(totalRecords / rowsPerPage);
    }, [totalRecords, rowsPerPage]); // Recalculate when count or rowsPerPage changes

    // Update displayed data when page, rowsPerPage, or fetched data changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalRecords);
        setDisplayData(inpatientData.slice(startIndex, endIndex));
    }, [currentPage, rowsPerPage, inpatientData, totalRecords]); // Add inpatientData and totalRecords dependency

    // Reset to first page when rowsPerPage changes
    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage]); // Reset page if rowsPerPage changes

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    // --- Handle Rows Per Page Change ---
    function handleRowsPerPageChange(newRowsPerPage) {
        setRowsPerPage(newRowsPerPage);
        // setCurrentPage(1) is handled by the useEffect hook
    }

    function onClickInpatientMonitoring(patient) {
        // Navigate to the next page with patient information
        history.push({
            pathname: '/doctor/inpatient_monitoring',
            state: {
                // Pass patientID if available from backend, otherwise use name as fallback identifier
                sessionID: patient.sessionID, // Pass sessionID
                patientID: patient.patientID,
                name: patient.name,
                sex: patient.sex,
                age: patient.age,
                userRole: userRole,
            }
        });
    }

    return (
        <BoxContainer className='bigBox'>
            <BoxContainerTitle>
                Inpatient Monitoring
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <DoctorInpatientMonitoringOverview inpatientMonitoringCount={totalRecords} />

                {/* Pagination - Pass new props */}
                <DoctorInpatientMonitoringPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS} // Pass options
                    currentRowsPerPage={rowsPerPage} // Pass current value
                    onRowsPerPageChange={handleRowsPerPageChange} // Pass handler
                />

                {/* Table header */}
                <DoctorInpatientMonitoringTableHeader inpatientMonitoringTableHeader={inpatientMonitoringTableHeader} />

                {/* Table content - Conditional Rendering */}
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading inpatient data...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    <DoctorInpatientMonitoringTableContent
                        inpatientMonitoringTableHeader={inpatientMonitoringTableHeader}
                        inpatientMonitoringTableData={displayData} // Use paginated data
                        onClickInpatientMonitoring={onClickInpatientMonitoring}
                    />
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorInpatientMonitoring;