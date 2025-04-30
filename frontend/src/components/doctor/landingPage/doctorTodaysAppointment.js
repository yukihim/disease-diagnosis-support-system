import React, { useState, useEffect, useMemo, useCallback } from 'react'; // Added useCallback
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorTodaysAppointmentOverview from './doctorTodaysAppointment/doctorTodaysAppointmentOverview';
import DoctorTodaysAppointmentPagination from './doctorTodaysAppointment/doctorTodaysAppointmentPagination';
import DoctorTodaysAppointmentTableHeader from './doctorTodaysAppointment/doctorTodaysAppointmentTableHeader';
import DoctorTodaysAppointmentTableContent from './doctorTodaysAppointment/doctorTodaysAppointmentTableContent';

const todaysAppointmentTableHeader = [
    { name: 'Name', width: '130px' },
    { name: 'Time', width: '70px' },
    { name: 'Condition', width: '100px' }
];

// Remove dummy data
// const todaysAppointmentTableDummyData = [ ... ];

const ROWS_PER_PAGE_OPTIONS = [3, 5, 7]; // Define options for rows per page
const API_BASE_URL = 'http://localhost:5001/doctor'; // Define base URL for doctor API

function DoctorTodaysAppointment() {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[1]); // Default to 5 (index 1)
    const [appointmentData, setAppointmentData] = useState([]); // State for fetched data
    const [displayData, setDisplayData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // --- Fetch Data from Backend ---
    const fetchAppointments = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setAppointmentData([]); // Clear previous data

        const token = Cookies.get('token');
        if (!token) {
            setError("User not authenticated.");
            setIsLoading(false);
            return;
        }

        try {
            // Use the correct endpoint from Doctor/routes.py
            const apiUrl = `${API_BASE_URL}/landing_page/todays_appointment`;
            // console.log("Fetching today's appointments from:", apiUrl);

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
            // console.log("API Response Data (Today's Appointments):", data);

            // Assuming the backend returns the list in 'appointments' array
            setAppointmentData(data.appointments || []);

        } catch (err) {
            console.error("Error fetching today's appointments:", err);
            setError(err.message || "Failed to fetch today's appointments.");
            setAppointmentData([]);
        } finally {
            setIsLoading(false);
        }
    }, []); // Empty dependency array means fetch only once on mount

    // Fetch data when component mounts
    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);


    // Calculate total count based on fetched data
    const totalRecords = appointmentData.length;

    // Calculate total pages based on fetched data and current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(totalRecords / rowsPerPage);
    }, [totalRecords, rowsPerPage]); // Recalculate when count or rowsPerPage changes

    // Update displayed data when page, rowsPerPage, or fetched data changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalRecords);
        setDisplayData(appointmentData.slice(startIndex, endIndex));
    }, [currentPage, rowsPerPage, appointmentData, totalRecords]); // Add appointmentData and totalRecords dependency

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

    function onClickTodaysAppointment(patient) {
        // Navigate to the next page with patient information
        // Update pathname and state as needed for doctor's workflow
        // Ensure sessionID is passed if available from the backend data
        console.log('Clicked on appointment:', patient);
        // Example navigation (adjust based on actual data structure and needs):
        // history.push({
        //     pathname: '/doctor/diagnosis',
        //     state: {
        //         sessionID: patient.sessionID, // Make sure sessionID exists in your API response
        //         name: patient.name,
        //         // Add other relevant patient data if needed
        //     }
        // });
    }

    return (
        <BoxContainer>
            <BoxContainerTitle>
                Today's Appointment
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <DoctorTodaysAppointmentOverview todaysAppointmentAmountCount={totalRecords} />

                {/* Pagination - Pass new props */}
                <DoctorTodaysAppointmentPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS} // Pass options
                    currentRowsPerPage={rowsPerPage} // Pass current value
                    onRowsPerPageChange={handleRowsPerPageChange} // Pass handler
                />

                {/* Table header */}
                <DoctorTodaysAppointmentTableHeader todaysAppointmentTableHeader={todaysAppointmentTableHeader} />

                {/* Table content - Conditional Rendering */}
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading appointments...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    <DoctorTodaysAppointmentTableContent
                        todaysAppointmentTableHeader={todaysAppointmentTableHeader}
                        todaysAppointmentTableData={displayData} // Use paginated data
                        onClickTodaysAppointment={onClickTodaysAppointment}
                    />
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorTodaysAppointment;