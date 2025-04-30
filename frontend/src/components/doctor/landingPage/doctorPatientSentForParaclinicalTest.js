import React, { useState, useEffect, useMemo, useCallback } from 'react'; // Import useCallback
import Cookies from 'js-cookie'; // Import Cookies

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorPatientSentForParaclinicalTestOverview from './doctorPatientSentForParaclinicalTest/doctorPatientSentForParaclinicalTestOverview';
import DoctorPatientSentForParaclinicalTestPagination from './doctorPatientSentForParaclinicalTest/doctorPatientSentForParaclinicalTestPagination';
import DoctorPatientSentForParaclinicalTestTableHeader from './doctorPatientSentForParaclinicalTest/doctorPatientSentForParaclinicalTestTableHeader';
import DoctorPatientSentForParaclinicalTestTableContent from './doctorPatientSentForParaclinicalTest/doctorPatientSentForParaclinicalTestTableContent';

const patientSentForParaclinicalTestTableHeader = [
    { name: 'Name', width: '130px' },
    { name: 'Test', width: '150px' },
    { name: 'State', width: '170px' }
];

// Remove dummy data
// const patientSentForParaclinicalTestTableDummyData = [ ... ];

const ROWS_PER_PAGE_OPTIONS = [3, 5, 7]; // Define options for rows per page
const API_BASE_URL = 'http://localhost:5001/doctor'; // Define base URL for doctor API

function DoctorPatientSentForParaclinicalTest() {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[1]); // Default to 5 (index 1)
    const [sentPatientsData, setSentPatientsData] = useState([]); // State for fetched data
    const [displayData, setDisplayData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // --- Fetch Data from Backend ---
    const fetchSentPatients = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setSentPatientsData([]); // Clear previous data

        const token = Cookies.get('token');
        if (!token) {
            setError("User not authenticated.");
            setIsLoading(false);
            return;
        }

        try {
            // Use the correct endpoint from Doctor/routes.py
            const apiUrl = `${API_BASE_URL}/landing_page/patient_sent_for_test`;
            // console.log("Fetching sent patients from:", apiUrl);

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
            // console.log("API Response Data (Sent Patients):", data);

            // Assuming the backend returns the list in 'patientSentForTest' array
            setSentPatientsData(data.patientSentForTest || []);

        } catch (err) {
            console.error("Error fetching sent patients:", err);
            setError(err.message || "Failed to fetch sent patients.");
            setSentPatientsData([]);
        } finally {
            setIsLoading(false);
        }
    }, []); // Empty dependency array means fetch only once on mount

    // Fetch data when component mounts
    useEffect(() => {
        fetchSentPatients();
    }, [fetchSentPatients]);

    // Calculate total count based on fetched data
    const totalRecords = sentPatientsData.length;

    // Calculate total pages based on fetched data and current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(totalRecords / rowsPerPage);
    }, [totalRecords, rowsPerPage]); // Recalculate when count or rowsPerPage changes

    // Update displayed data when page, rowsPerPage, or fetched data changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalRecords);
        setDisplayData(sentPatientsData.slice(startIndex, endIndex));
    }, [currentPage, rowsPerPage, sentPatientsData, totalRecords]); // Add sentPatientsData and totalRecords dependency

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

    function onClickPatientSentForParaclinicalTest(patient) {
        // Navigate to the next page with patient information
        // history.push({
        //     pathname: '/receptionist/patient_checkin',
        //     state: {
        //         patientSSN: patient.name,
        //         patientHealthInsuranceCode: patient.test
        //     }
        // });

        // Keep alert for now, or implement navigation as needed
        alert(`Patient ${patient.name} is sent for ${patient.test} test. State: ${patient.state}`);
    }

    return (
        <BoxContainer className='bigBox'>
            <BoxContainerTitle>
                Patient Sent For Paraclinical Test
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <DoctorPatientSentForParaclinicalTestOverview patientSentForParaclinicalTestCount={totalRecords} />

                {/* Pagination - Pass new props */}
                <DoctorPatientSentForParaclinicalTestPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS} // Pass options
                    currentRowsPerPage={rowsPerPage} // Pass current value
                    onRowsPerPageChange={handleRowsPerPageChange} // Pass handler
                />

                {/* Table header */}
                <DoctorPatientSentForParaclinicalTestTableHeader patientSentForParaclinicalTestTableHeader={patientSentForParaclinicalTestTableHeader} />

                {/* Table content - Conditional Rendering */}
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading sent patients...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    <DoctorPatientSentForParaclinicalTestTableContent
                        patientSentForParaclinicalTestTableHeader={patientSentForParaclinicalTestTableHeader}
                        patientSentForParaclinicalTestTableData={displayData} // Use paginated data
                        onClickPatientSentForParaclinicalTest={onClickPatientSentForParaclinicalTest}
                    />
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPatientSentForParaclinicalTest;