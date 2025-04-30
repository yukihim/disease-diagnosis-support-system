import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Cookies from 'js-cookie'; // Import Cookies
import './style/adminUserAccountLogCard.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import AdminUserAccountLogPagination from './adminUserAccountLog/adminUserAccountLogPagination';
import AdminUserAccountLogTableHeader from './adminUserAccountLog/adminUserAccountLogTableHeader';
import AdminUserAccountLogTableContent from './adminUserAccountLog/adminUserAccountLogTableContent';

const userAccountLogTableHeader = [
    { name: 'Date', width: '150px', dataKey: 'date' }, // Map 'Date' header to 'date' data field
    { name: 'Time', width: '100px', dataKey: 'time' }, // Map 'Time' header to 'time' data field
    { name: 'Action', width: '150px', dataKey: 'action' }, // Map 'Action' header to 'action' data field
];

// Remove dummy data
// const userAccountLogTableDummyData = [ ... ];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 20, 25]; // Define options

function AdminUserAccountLogCard() {
    const location = useLocation(); // Get location object
    const userId = location.state?.userId; // Get userId from navigation state

    const [logData, setLogData] = useState([]); // State for API log data
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]); // Default to the first option (5)

    // --- Fetch Log Data ---
    useEffect(() => {
        const fetchLogs = async () => {
            if (!userId) {
                setError("User ID not found. Cannot fetch logs.");
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            const token = Cookies.get('token');
            if (!token) {
                setError('Authentication token not found.');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5001/admin/user_mangement/${userId}/accounts_log`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setLogData(data.logs || []); // Assuming API returns { "logs": [...] }
            } catch (e) {
                console.error("Failed to fetch user logs:", e);
                setError(e.message || 'Failed to fetch user logs.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLogs();
    }, [userId]); // Re-fetch if userId changes

    // --- Sorting Logic ---
    const sortedData = useMemo(() => {
        let sortableData = [...logData]; // Use fetched logData
        if (sortConfig !== null && sortConfig.key !== null) {
            const key = sortConfig.key; // 'Date', 'Time', 'Action'

            sortableData.sort((a, b) => {
                let aValue, bValue;

                // Determine values based on the sort key
                if (key === 'Date') {
                    // Combine date and time for more accurate sorting if needed, otherwise just date
                    aValue = new Date(`${a.date} ${a.time}`); // Combine for datetime sorting
                    bValue = new Date(`${b.date} ${b.time}`);
                } else if (key === 'Time') {
                    // Basic time string comparison (HH:MM:SS)
                    aValue = a.time;
                    bValue = b.time;
                } else if (key === 'Action') {
                    aValue = a.action;
                    bValue = b.action;
                } else {
                    // Fallback or handle other potential keys
                    aValue = a[key.toLowerCase()];
                    bValue = b[key.toLowerCase()];
                }

                // Handle potential undefined/null values
                const valA = aValue === undefined || aValue === null ? '' : aValue;
                const valB = bValue === undefined || bValue === null ? '' : bValue;

                // Comparison logic
                if (valA < valB) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (valA > valB) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0; // Values are equal
            });
        }
        return sortableData;
    }, [logData, sortConfig]); // Depend on fetched data and sort config

    // Calculate total pages based on current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(sortedData.length / rowsPerPage);
    }, [sortedData, rowsPerPage]); // Recalculate when data or rowsPerPage changes

    // Update displayed data when page, sort, or rowsPerPage changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, sortedData.length);
        setDisplayData(sortedData.slice(startIndex, endIndex));
    }, [currentPage, sortedData, rowsPerPage]); // Add rowsPerPage dependency

    // Reset to first page when sorting or rowsPerPage changes
    useEffect(() => {
        setCurrentPage(1);
    }, [sortConfig, rowsPerPage]); // Reset page if sort or rowsPerPage changes

    // --- Handle Sorting ---
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
        // setCurrentPage(1) is handled by the useEffect hook
    }

    // --- Handle Page Change ---
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
        <BoxContainer className='adminUserAccountLogCardBox'>
            <BoxContainerTitle className='adminUserAccountLogCardTitle'>
                Account's Log
            </BoxContainerTitle>

            <BoxContainerContent className='adminUserAccountLogCardContent'>
                {/* Table Pagination - Pass new props */}
                <AdminUserAccountLogPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    currentRowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />

                {/* Table Header - Pass sorting props */}
                <AdminUserAccountLogTableHeader
                    userAccountLogTableHeader={userAccountLogTableHeader}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                />

                {/* Table Content - Conditional Rendering */}
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading logs...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    <AdminUserAccountLogTableContent
                        userAccountLogTableHeader={userAccountLogTableHeader} // Pass updated header
                        userAccountLogTableData={displayData}
                        onClickSession={() => {console.log("Log row clicked - implement if needed")}}
                    />
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default AdminUserAccountLogCard;