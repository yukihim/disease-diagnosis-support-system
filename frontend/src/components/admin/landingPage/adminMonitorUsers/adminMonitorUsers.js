import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import UsersOverview from './components/usersOverview';
import UsersPagination from './components/usersPagination'; // Make sure this is imported
import UsersTableHeader from './components/usersTableHeader';
import UsersTableContent from './components/usersTableContent';

const userTableHeader = [
    { name: 'User', width: '250px' },
    { name: 'Role', width: '150px' },
    { name: 'Room', width: '70px' },
    { name: 'Dept', width: '250px' }
];

const userTableDummyData = [
    { user: 'Phuong Xuong Thinh', role: 'Doctor', room: '220', dept: 'Lão - Nội' },
    { user: 'Phuong Xuong B', role: 'Nurse', room: '221', dept: 'Lão - Nội' },
    { user: 'Phuong Xuong C', role: 'Paraclinical Technician', room: '222', dept: 'Lão - Nội' },
    { user: 'Phuong Xuong X', role: 'Paraclinical Technician', room: '223', dept: 'Lão - Ngoại' },
    { user: 'Phuong Xuong Y', role: 'Doctor', room: '224', dept: 'Lão - Ngoại' },
    { user: 'Phuong Xuong B', role: 'Nurse', room: '221', dept: 'Lão - Nội' },
    { user: 'Phuong Xuong C', role: 'Paraclinical Technician', room: '222', dept: 'Lão - Nội' },
    { user: 'Phuong Xuong X', role: 'Paraclinical Technician', room: '223', dept: 'Lão - Ngoại' },
    { user: 'Phuong Xuong Y', role: 'Doctor', room: '224', dept: 'Lão - Ngoại' },
    { user: 'Phuong Xuong B', role: 'Nurse', room: '221', dept: 'Lão - Nội' },
    { user: 'Phuong Xuong C', role: 'Paraclinical Technician', room: '222', dept: 'Lão - Nội' },
    { user: 'Phuong Xuong X', role: 'Paraclinical Technician', room: '223', dept: 'Lão - Ngoại' },
    { user: 'Phuong Xuong Y', role: 'Doctor', room: '224', dept: 'Lão - Ngoại' },
    { user: 'Phuong Xuong B', role: 'Nurse', room: '221', dept: 'Lão - Nội' },
    { user: 'Phuong Xuong C', role: 'Paraclinical Technician', room: '222', dept: 'Lão - Nội' },
    { user: 'Phuong Xuong X', role: 'Paraclinical Technician', room: '223', dept: 'Lão - Ngoại' },
    { user: 'Phuong Xuong Y', role: 'Doctor', room: '224', dept: 'Lão - Ngoại' }
];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 20, 25]; // Define options

function AdminMonitorUsers() {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[2]); // Default to 15 (index 2)

    // Calculate user counts (can be memoized if data changes frequently)
    const userCount = userTableDummyData.length;
    const doctorCount = userTableDummyData.filter(user => user.role === 'Doctor').length;
    const nurseCount = userTableDummyData.filter(user => user.role === 'Nurse').length;
    const paraclinicalCount = userTableDummyData.filter(user => user.role === 'Paraclinical Technician').length;
    const adminCount = userTableDummyData.filter(user => user.role === 'Admin').length; // Assuming 'Admin' role exists

    // Sort the data based on current sort configuration
    const sortedData = useMemo(() => {
        let sortableData = [...userTableDummyData]; // Create a mutable copy
        if (sortConfig.key) {
            const key = sortConfig.key.toLowerCase(); // Use lowercase key for comparison
            sortableData.sort((a, b) => {
                let aValue, bValue;

                if (key === 'user') {
                    aValue = a.user;
                    bValue = b.user;
                } else if (key === 'role') {
                    aValue = a.role;
                    bValue = b.role;
                } else if (key === 'room') {
                    // Convert room to numbers for numeric sorting, handle non-numeric gracefully
                    aValue = parseInt(a.room, 10);
                    bValue = parseInt(b.room, 10);
                    // Fallback to string comparison if parsing fails
                    if (isNaN(aValue)) aValue = a.room;
                    if (isNaN(bValue)) bValue = b.room;
                } else if (key === 'dept') {
                    aValue = a.dept;
                    bValue = b.dept;
                } else {
                    // Default case (shouldn't happen with current headers)
                    aValue = a[key];
                    bValue = b[key];
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
    }, [sortConfig]); // Keep dependency only on sortConfig

    // Calculate total pages based on current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(sortedData.length / rowsPerPage);
    }, [sortedData, rowsPerPage]); // Recalculate when data or rowsPerPage changes

    // Update displayed data when page, sort, or rowsPerPage changes
    const [displayData, setDisplayData] = useState([]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, sortedData.length);
        setDisplayData(sortedData.slice(startIndex, endIndex));
    }, [currentPage, sortedData, rowsPerPage]); // Add rowsPerPage dependency

    // Reset to first page when sorting or rowsPerPage changes
    useEffect(() => {
        setCurrentPage(1);
    }, [sortConfig, rowsPerPage]); // Reset page if sort or rowsPerPage changes

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    function handleSort(key) { // key is 'User', 'Role', 'Room', 'Dept'
        let direction = 'asc';
        let nextKey = key; // Use temporary variable

        if (sortConfig.key === key) {
            if (sortConfig.direction === 'asc') {
                direction = 'desc';
            } else if (sortConfig.direction === 'desc') {
                direction = null;
                nextKey = null; // Reset key
            }
        }
        // If it's a new key, direction defaults to 'asc'

        setSortConfig({ key: nextKey, direction });
        // setCurrentPage(1) is handled by the useEffect hook now
    }

    function handleRowsPerPageChange(newRowsPerPage) {
        setRowsPerPage(newRowsPerPage);
        // setCurrentPage(1) is handled by the useEffect hook now
    }

    function onClickUser(user) {
        let pathnameUrl = '/admin/user_management';

        // Navigate to the next page with user information
        history.push({
            pathname: pathnameUrl,
            state: {
                userName: user.user,
                userRole: user.role,
                userRoom: user.room,
                userDept: user.dept
                // Add other relevant user data if needed
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

                {/* Pagination - Pass new props */}
                <UsersPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    currentRowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />

                {/* Table header with sort functionality */}
                <UsersTableHeader
                    userTableHeader={userTableHeader}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                />

                {/* Table content */}
                <UsersTableContent
                    userTableHeader={userTableHeader}
                    userTableData={displayData} // Pass the paginated and sorted data
                    onClickUser={onClickUser}
                />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default AdminMonitorUsers;