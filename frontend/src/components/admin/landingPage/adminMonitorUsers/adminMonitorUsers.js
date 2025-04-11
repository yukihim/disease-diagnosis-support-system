import React from 'react';
import { useHistory } from 'react-router-dom';

import BoxContainer from '../../../common/boxContainer';
import BoxContainerTitle from '../../../common/boxContainerTitle';
import BoxContainerContent from '../../../common/boxContainerContent';

import UsersOverview from './components/usersOverview';
import UsersPagination from './components/usersPagination';
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

function AdminMonitorUsers() {
    const history = useHistory();

    const userCount = 12;

    function onClickUser(user) {
        let pathnameUrl='/admin/user_management';

        // Navigate to the next page with user information
        history.push({
            pathname: pathnameUrl,
            state: {
                userName: user.user,
                userRole: user.role,
                userRoom: user.room,
                userDept: user.dept
            }
        });
    }

    return (
        <BoxContainer className='bigBoxForParaclinic'>
            {/* Design emergency component here */}
            <BoxContainerTitle>
                User Management
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <UsersOverview userCount={userCount} />

                {/* Pagination */}
                <UsersPagination />

                {/* Table header */}
                <UsersTableHeader userTableHeader={userTableHeader} />

                {/* Table content */}
                <UsersTableContent userTableHeader={userTableHeader} userTableData={userTableDummyData} onClickUser={onClickUser} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default AdminMonitorUsers;