import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import Cookies

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import UsersOverview from './components/usersOverview';
import UsersPagination from './components/usersPagination';
import UsersTableHeader from './components/usersTableHeader';
import UsersTableContent from './components/usersTableContent';

// Add dataKey to map header name to API field name
const userTableHeader = [
    { name: 'User', width: '250px', dataKey: 'username' }, // Map 'User' header to 'username' data field
    { name: 'Role', width: '150px', dataKey: 'role' },
    { name: 'Room', width: '70px', dataKey: 'room' },
    { name: 'Deparment', width: '250px', dataKey: 'department' } // Map 'Dept' header to 'department' data field
];

// Remove dummy data
// const userTableDummyData = [ ... ];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 20, 25];

function AdminMonitorUsers() {
    const history = useHistory();
    const [usersData, setUsersData] = useState([]); // State for API data
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // key here refers to header.name ('User', 'Role', etc.)
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[2]); // Default to 15

    // --- Fetch Data ---
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            setError(null);
            const token = Cookies.get('token');
            if (!token) {
                setError('Authentication token not found. Please log in.');
                setIsLoading(false);
                // Optionally redirect to login
                // history.push('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:5001/admin/landing_page/user_management_table', {
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
                setUsersData(data.users || []); // Assuming the API returns { "users": [...] }
            } catch (e) {
                console.error("Failed to fetch users:", e);
                setError(e.message || 'Failed to fetch user data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []); // Empty dependency array means this runs once on mount

    // --- Calculate user counts based on fetched data ---
    const userCount = usersData.length;
    const doctorCount = useMemo(() => usersData.filter(user => user.role?.toLowerCase() === 'doctor').length, [usersData]);
    const nurseCount = useMemo(() => usersData.filter(user => user.role?.toLowerCase() === 'nurse').length, [usersData]);
    const paraclinicalCount = useMemo(() => usersData.filter(user => user.role?.toLowerCase() === 'paraclinical').length, [usersData]);
    const adminCount = useMemo(() => usersData.filter(user => user.role?.toLowerCase() === 'admin').length, [usersData]);

    // --- Sort the data based on current sort configuration ---
    const sortedData = useMemo(() => {
        let sortableData = [...usersData];
        if (sortConfig.key) { // sortConfig.key is the header name ('User', 'Role', etc.)
            // Find the corresponding dataKey from the header config
            const headerConfig = userTableHeader.find(h => h.name === sortConfig.key);
            const keyToSort = headerConfig ? headerConfig.dataKey : sortConfig.key.toLowerCase(); // Fallback if needed

            sortableData.sort((a, b) => {
                let aValue = a[keyToSort];
                let bValue = b[keyToSort];

                // Handle numeric sorting for 'Room'
                if (keyToSort === 'room') {
                    aValue = parseInt(aValue, 10);
                    bValue = parseInt(bValue, 10);
                    // Handle cases where room might be null or non-numeric
                    if (isNaN(aValue)) aValue = -Infinity; // Or handle as string below
                    if (isNaN(bValue)) bValue = -Infinity;
                }

                // General comparison (handles strings, numbers after potential parsing)
                // Ensure consistent type for comparison, treat null/undefined as empty strings or lowest value
                const valA = aValue === undefined || aValue === null ? '' : String(aValue).toLowerCase();
                const valB = bValue === undefined || bValue === null ? '' : String(bValue).toLowerCase();


                if (valA < valB) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (valA > valB) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [usersData, sortConfig]);

    // Calculate total pages based on current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(sortedData.length / rowsPerPage);
    }, [sortedData, rowsPerPage]);

    // Update displayed data when page, sort, or rowsPerPage changes
    const [displayData, setDisplayData] = useState([]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, sortedData.length);
        setDisplayData(sortedData.slice(startIndex, endIndex));
    }, [currentPage, sortedData, rowsPerPage]);

    // Reset to first page when sorting or rowsPerPage changes
    useEffect(() => {
        setCurrentPage(1);
    }, [sortConfig, rowsPerPage]);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    function handleSort(key) { // key is the header name ('User', 'Role', etc.)
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

    function handleRowsPerPageChange(newRowsPerPage) {
        setRowsPerPage(parseInt(newRowsPerPage, 10));
    }

    function onClickUser(user) {
        console.log("User clicked:", user);

        // Pass the correct data fields based on API response
        history.push({
            pathname: '/admin/user_management',
            state: {
                userId: user.userId,
                userName: user.username, // Use username from API data
                userRole: user.role,
                userRoom: user.room,
                userDept: user.department, // Use department from API data
                userEmail: user.email // Use email from API data
            }
        });
    }

    return (
        <BoxContainer className='bigBoxForParaclinic'>
            <BoxContainerTitle>
                User Management
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <UsersOverview
                    userCount={userCount}
                    doctorCount={doctorCount}
                    nurseCount={nurseCount}
                    paraclinicalCount={paraclinicalCount}
                    adminCount={adminCount}
                />

                {/* Pagination */}
                <UsersPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    currentRowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />

                {/* Table header */}
                <UsersTableHeader
                    userTableHeader={userTableHeader} // Pass the updated header config
                    onSort={handleSort}
                    sortConfig={sortConfig}
                />

                {/* Table content - Conditional Rendering */}
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading users...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    <UsersTableContent
                        userTableHeader={userTableHeader} // Pass the updated header config
                        userTableData={displayData}
                        onClickUser={onClickUser}
                    />
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default AdminMonitorUsers;