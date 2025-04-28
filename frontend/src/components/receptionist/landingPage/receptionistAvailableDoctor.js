import React, { useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie'; // Import Cookies

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistAvailableDoctorPagination from './receptionistAvailableDoctor/receptionistAvailableDoctorPagination';
import ReceptionistAvailableDoctorContent from './receptionistAvailableDoctor/receptionistAvailableDoctorContent';

// Remove dummy data
// const doctorsTableDummyData = [ ... ];

// Add rows per page options, similar to other components
const ROWS_PER_PAGE_OPTIONS = [4, 8, 12]; // Example options

function ReceptionistAvailableDoctor() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]); // State for rows per page
    const [availableDoctorData, setAvailableDoctorData] = useState([]); // State for fetched data
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch data from API
    useEffect(() => {
        const fetchAvailableDoctors = async () => {
            setIsLoading(true);
            setError(null);
            const token = Cookies.get('token'); // Get token from cookie

            if (!token) {
                setError("User not authenticated.");
                setIsLoading(false);
                setAvailableDoctorData([]);
                return;
            }

            try {
                // API endpoint from backend routes.py
                const apiUrl = 'http://localhost:5001/receptionist/landing_page/available_doctor';
                console.log("Fetching available doctors from:", apiUrl);

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
                console.log("API Response Data (Available Doctors):", data);

                // Assuming the API returns { "availableDoctors": [...] }
                setAvailableDoctorData(data.availableDoctors || []);

            } catch (err) {
                console.error("Error fetching available doctors:", err);
                setError(err.message || "Failed to fetch available doctors.");
                setAvailableDoctorData([]); // Reset data on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchAvailableDoctors();
    }, []); // Empty dependency array to run only once on mount

    // Calculate total pages based on fetched data and current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(availableDoctorData.length / rowsPerPage);
    }, [availableDoctorData, rowsPerPage]); // Depend on fetched data

    // Update displayed data when page, rowsPerPage, or fetched data changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, availableDoctorData.length);
        setDisplayData(availableDoctorData.slice(startIndex, endIndex));
    }, [currentPage, rowsPerPage, availableDoctorData]); // Depend on fetched data

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
            <BoxContainerTitle className="greenTitle">
                Available Doctors
            </BoxContainerTitle>
            <BoxContainerContent>
                {/* Pagination - Add rows per page controls */}
                <ReceptionistAvailableDoctorPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS} // Pass options
                    currentRowsPerPage={rowsPerPage} // Pass current value
                    onRowsPerPageChange={handleRowsPerPageChange} // Pass handler
                />

                {/* Content - Conditional Rendering */}
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading available doctors...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    <ReceptionistAvailableDoctorContent doctorsTableData={displayData} /> // Use paginated data
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistAvailableDoctor;