import React, { useState, useEffect } from 'react';
import './style/adminUserAccountLogCard.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import AdminUserAccountLogPagination from './adminUserAccountLog/adminUserAccountLogPagination';
import AdminUserAccountLogTableHeader from './adminUserAccountLog/adminUserAccountLogTableHeader';
import AdminUserAccountLogTableContent from './adminUserAccountLog/adminUserAccountLogTableContent';

const userAccountLogTableHeader = [
    { name: 'Date', width: '150px' },
    { name: 'Time', width: '100px' },
    { name: 'Action', width: '150px' },
];

const userAccountLogTableDummyData = [
    { date: '2024-12-09', time: '12:04 AM', action: 'Updated' },
    { date: '2024-12-08', time: '12:04 AM', action: 'Logged Out' },
    { date: '2024-12-07', time: '12:04 AM', action: 'Logged In' },
    { date: '2024-12-06', time: '12:04 AM', action: 'Logged Out' },
    { date: '2024-12-05', time: '12:04 AM', action: 'Updated' },
    { date: '2024-12-04', time: '12:04 AM', action: 'Logged In' },
    { date: '2024-12-03', time: '12:04 AM', action: 'Logged Out' },
    { date: '2024-12-02', time: '12:04 AM', action: 'Logged In' },
    { date: '2024-12-01', time: '12:04 AM', action: 'Created' },
];

function AdminUserAccountLogCard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    
    // Pagination settings
    const ROWS_PER_PAGE = 4;
    const totalRecords = userAccountLogTableDummyData.length;
    const totalPages = Math.ceil(totalRecords / ROWS_PER_PAGE);

    // Update displayed data when page changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        const endIndex = Math.min(startIndex + ROWS_PER_PAGE, totalRecords);
        setDisplayData(userAccountLogTableDummyData.slice(startIndex, endIndex));
    }, [currentPage]);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }
    
    return (
        <BoxContainer className='adminUserAccountLogCardBox'>
            <BoxContainerTitle className='adminUserAccountLogCardTitle'>
                Account's Log
            </BoxContainerTitle>

            <BoxContainerContent className='adminUserAccountLogCardContent'>
                {/* Table Pagination */}
                <AdminUserAccountLogPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                {/* Table Header */}
                <AdminUserAccountLogTableHeader userAccountLogTableHeader={userAccountLogTableHeader} />

                {/* Table Content */}
                <AdminUserAccountLogTableContent userAccountLogTableHeader={userAccountLogTableHeader} userAccountLogTableData={displayData} onClickSession={() => {console.log("nothing")}} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default AdminUserAccountLogCard;