import React from 'react';
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
    { date: '2024-12-01', time: '12:04 AM', action: 'Updated' },
    { date: '2024-12-02', time: '12:04 AM', action: 'Logged In' },
    { date: '2024-12-03', time: '12:04 AM', action: 'Logged Out' },
    { date: '2024-12-04', time: '12:04 AM', action: 'Logged In' },
    { date: '2024-12-05', time: '12:04 AM', action: 'Created' },
];

function AdminUserAccountLogCard() {
    return (
        <BoxContainer className='adminUserAccountLogCardBox'>
            <BoxContainerTitle className='adminUserAccountLogCardTitle'>
                Account's Log
            </BoxContainerTitle>

            <BoxContainerContent className='adminUserAccountLogCardContent'>
                {/* Table Pagination */}
                <AdminUserAccountLogPagination />

                {/* Table Header */}
                <AdminUserAccountLogTableHeader userAccountLogTableHeader={userAccountLogTableHeader} />

                {/* Table Content */}
                <AdminUserAccountLogTableContent userAccountLogTableHeader={userAccountLogTableHeader} userAccountLogTableData={userAccountLogTableDummyData} onClickSession={() => {console.log("nothing")}} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default AdminUserAccountLogCard;