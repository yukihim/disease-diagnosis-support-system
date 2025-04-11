import React from 'react';
import PageLayout from '../../components/common/pageLayout';

import GoBackButton from '../../components/common/goBackButton';

// Import admin usermanagement components
import AdminUserInformationCard from '../../components/admin/userManagement/adminUserInformationCard'
import AdminUserAccountLogCard from '../../components/admin/userManagement/adminUserAccountLogCard';
import AdminUserManagementCard from '../../components/admin/userManagement/adminUserManagementCard';

function AdminUserManagement() {
    return (
        <PageLayout requiredRole="admin" useGrid={false}>
            {/* User Information Card */}
            <AdminUserInformationCard />

            <div style={{ 
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "repeat(3, 150px)",
                width: "100%",
                gap: "20px"
            }}>
                {/* User Account Log Card */}
                <AdminUserAccountLogCard />

                {/* User Management Card */}
                <AdminUserManagementCard />
            </div>

            {/* Go Back Button */}
            <GoBackButton />
        </PageLayout>
    );
}

export default AdminUserManagement;