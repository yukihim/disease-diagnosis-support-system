import React, { useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie'; // Import Cookies

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistAppointmentClock from './receptionistAppointment/receptionistAppointmentClock';
import ReceptionistAppointmentOverview from './receptionistAppointment/receptionistAppointmentOverview';
import ReceptionistAppointmentPagination from './receptionistAppointment/receptionistAppointmentPagination';
import ReceptionistAppointmentTableHeader from './receptionistAppointment/receptionistAppointmentTableHeader';
import ReceptionistAppointmentTableContent from './receptionistAppointment/receptionistAppointmentTableContent';


const appointmentTableHeader = [
    { name: 'Name', width: '150px' },
    { name: 'Time', width: '70px' },
    { name: 'Dept', width: '80px' }
];

// Remove dummy data
// const appointmentTableDummyData = [ ... ];

const ROWS_PER_PAGE_OPTIONS = [2, 4, 6];

function ReceptionistAppointment() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);
    const [appointmentData, setAppointmentData] = useState([]); // State for fetched data
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch data from API
    useEffect(() => {
        const fetchAppointments = async () => {
            setIsLoading(true);
            setError(null);
            const token = Cookies.get('token'); // Get token from cookie

            if (!token) {
                setError("User not authenticated.");
                setIsLoading(false);
                setAppointmentData([]);
                return;
            }

            try {
                const apiUrl = 'http://localhost:5001/receptionist/landing_page/appointment';
                console.log("Fetching appointments from:", apiUrl);

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
                console.log("API Response Data (Appointments):", data);

                // Assuming the API returns { "appointments": [...] }
                setAppointmentData(data.appointments || []);

            } catch (err) {
                console.error("Error fetching appointments:", err);
                setError(err.message || "Failed to fetch appointments.");
                setAppointmentData([]); // Reset data on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, []); // Empty dependency array to run only once on mount

    // Calculate count based on fetched data
    const upcomingAppointmentCount = appointmentData.length;

    // Calculate total pages based on fetched data and current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(appointmentData.length / rowsPerPage);
    }, [appointmentData, rowsPerPage]); // Depend on fetched data

    // Update displayed data when page, rowsPerPage, or fetched data changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, appointmentData.length);
        setDisplayData(appointmentData.slice(startIndex, endIndex));
    }, [currentPage, rowsPerPage, appointmentData]); // Depend on fetched data

    // Reset to first page when rowsPerPage changes
    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage]);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    function handleRowsPerPageChange(newRowsPerPage) {
        setRowsPerPage(newRowsPerPage);
        // setCurrentPage(1) is handled by the useEffect hook above
    }

    return (
        <BoxContainer>
            <BoxContainerTitle>
                Appointment Overview
                <ReceptionistAppointmentClock />
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview - Pass the count from fetched data */}
                <ReceptionistAppointmentOverview upcomingCount={upcomingAppointmentCount} />

                {/* Pagination */}
                <ReceptionistAppointmentPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    currentRowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />

                {/* Table header */}
                <ReceptionistAppointmentTableHeader appointmentTableHeader={appointmentTableHeader} />

                {/* Table content - Conditional Rendering */}
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading appointments...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    <ReceptionistAppointmentTableContent
                        appointmentTableHeader={appointmentTableHeader}
                        appointmentTableData={displayData} // Use paginated data
                    />
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistAppointment;