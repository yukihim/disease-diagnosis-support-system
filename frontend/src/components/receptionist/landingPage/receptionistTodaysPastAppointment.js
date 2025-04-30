import React, { useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie'; // Import Cookies

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistTodaysPastAppointmentOverview from './receptionistTodaysPastAppointment/receptionistTodaysPastAppointmentOverview';
import ReceptionistTodaysPastAppointmentPagination from './receptionistTodaysPastAppointment/receptionistTodaysPastAppointmentPagination';
import ReceptionistTodaysPastAppointmentHeader from './receptionistTodaysPastAppointment/receptionistTodaysPastAppointmentHeader';
import ReceptionistTodaysPastAppointmentContent from './receptionistTodaysPastAppointment/receptionistTodaysPastAppointmentContent';

const pastAppointmentTableHeader = [
    { name: 'Name', width: '130px' },
    { name: 'Time', width: '70px' },
    { name: 'Status', width: '80px' }, // Assuming 'status' is returned by the API
];

// Remove dummy data
// const pastAppointmentTableDummyData = [ ... ];

const ROWS_PER_PAGE_OPTIONS = [2, 4, 6];

function ReceptionistTodaysPastAppointment() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);
    const [pastAppointmentData, setPastAppointmentData] = useState([]); // State for fetched data
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch data from API
    useEffect(() => {
        const fetchPastAppointments = async () => {
            setIsLoading(true);
            setError(null);
            const token = Cookies.get('token'); // Get token from cookie

            if (!token) {
                setError("User not authenticated.");
                setIsLoading(false);
                setPastAppointmentData([]);
                return;
            }

            try {
                // API endpoint from backend routes.py
                const apiUrl = 'http://localhost:5001/receptionist/landing_page/todays_past_appointment';
                console.log("Fetching past appointments from:", apiUrl);

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add Authorization header
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Response Data (Past Appointments):", data);

                // Assuming the API returns { "pastAppointments": [...] }
                // The backend is expected to filter appointments to only include those before the current time today.
                setPastAppointmentData(data.pastAppointments || []);

            } catch (err) {
                console.error("Error fetching past appointments:", err);
                setError(err.message || "Failed to fetch past appointments.");
                setPastAppointmentData([]); // Reset data on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchPastAppointments();
    }, []); // Empty dependency array to run only once on mount

    // Calculate count based on fetched data
    const pastAppointmentCount = pastAppointmentData.length;

    // Calculate total pages based on fetched data and current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(pastAppointmentData.length / rowsPerPage);
    }, [pastAppointmentData, rowsPerPage]); // Depend on fetched data

    // Update displayed data when page, rowsPerPage, or fetched data changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, pastAppointmentData.length);
        setDisplayData(pastAppointmentData.slice(startIndex, endIndex));
    }, [currentPage, rowsPerPage, pastAppointmentData]); // Depend on fetched data

    // Reset to first page when rowsPerPage changes
    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage]);

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

    return (
        <BoxContainer>
            <BoxContainerTitle>
                Today's Past Appointment
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview - Pass the count from fetched data */}
                <ReceptionistTodaysPastAppointmentOverview pastAppointmentCount={pastAppointmentCount} />

                {/* Pagination */}
                <ReceptionistTodaysPastAppointmentPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    currentRowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />

                {/* Table header */}
                <ReceptionistTodaysPastAppointmentHeader pastAppointmentTableHeader={pastAppointmentTableHeader} />

                {/* Table content - Conditional Rendering */}
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading past appointments...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    <ReceptionistTodaysPastAppointmentContent
                        pastAppointmentTableHeader={pastAppointmentTableHeader}
                        pastAppointmentTableData={displayData} // Use paginated data
                    />
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistTodaysPastAppointment;