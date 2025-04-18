import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import './style/adminUserAccountLogCard.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import AdminUserAccountLogPagination from './adminUserAccountLog/adminUserAccountLogPagination';
import AdminUserAccountLogTableHeader from './adminUserAccountLog/adminUserAccountLogTableHeader';
import AdminUserAccountLogTableContent from './adminUserAccountLog/adminUserAccountLogTableContent';

const userAccountLogTableHeader = [
    { name: 'Date', width: '150px' }, // Use 'Date' as key
    { name: 'Time', width: '100px' }, // Use 'Time' as key
    { name: 'Action', width: '150px' }, // Use 'Action' as key
];

const userAccountLogTableDummyData = [
    { date: '2024-12-09', time: '12:04 AM', action: 'Updated' },
    { date: '2024-12-08', time: '11:04 AM', action: 'Logged Out' },
    { date: '2024-12-07', time: '10:04 AM', action: 'Logged In' },
    { date: '2024-12-06', time: '9:04 AM', action: 'Logged Out' },
    { date: '2024-12-05', time: '12:04 PM', action: 'Updated' },
    { date: '2024-12-04', time: '11:04 AM', action: 'Logged In' },
    { date: '2024-12-03', time: '1:04 AM', action: 'Logged Out' },
    { date: '2024-12-02', time: '13:04 AM', action: 'Logged In' }, // Note: 13:04 AM is unusual, might need data cleaning
    { date: '2024-12-01', time: '12:04 AM', action: 'Created' },
    // Add more dummy data if needed for testing pagination
];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 20, 25]; // Define options

function AdminUserAccountLogCard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]); // Default to the first option (4)

    // --- Sorting Logic ---
    const sortedData = useMemo(() => {
        let sortableData = [...userAccountLogTableDummyData]; // Create a mutable copy
        if (sortConfig !== null && sortConfig.key !== null) {
            const key = sortConfig.key; // Get the key from sortConfig (e.g., 'Date', 'Time', 'Action')

            sortableData.sort((a, b) => {
                let aValue, bValue;

                if (key === 'Date') {
                    aValue = new Date(a.date);
                    bValue = new Date(b.date);
                } else if (key === 'Time') {
                    // Basic time string comparison - consider parsing for robustness
                    aValue = a.time;
                    bValue = b.time;
                } else if (key === 'Action') {
                    aValue = a.action;
                    bValue = b.action;
                } else {
                    aValue = a[key.toLowerCase()];
                    bValue = b[key.toLowerCase()];
                }

                const valA = aValue === undefined || aValue === null ? '' : aValue;
                const valB = bValue === undefined || bValue === null ? '' : bValue;

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
    }, [sortConfig]);

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

                {/* Table Content - Pass sorted and paginated data */}
                <AdminUserAccountLogTableContent
                    userAccountLogTableHeader={userAccountLogTableHeader}
                    userAccountLogTableData={displayData} // displayData is now sorted and paginated
                    onClickSession={() => {console.log("nothing")}} // Keep or modify as needed
                />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default AdminUserAccountLogCard;