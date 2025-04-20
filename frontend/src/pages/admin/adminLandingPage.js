import React from 'react';
import PageLayout from '../../components/common/pageLayout';

import Calendar from '../../components/common/calendar';

// Import admin landingpage components
import AdminMonitorUsers from '../../components/admin/landingPage/adminMonitorUsers/adminMonitorUsers';
import AdminAddNewUsers from '../../components/admin/landingPage/adminAddNewUsers/adminAddNewUsers';

function AdminLandingPage() {
    return (
        <PageLayout requiredRole="admin">
            <AdminMonitorUsers role="admin" />
            
            <Calendar />

            {/* Add user card */}
            <AdminAddNewUsers />
        </PageLayout>
    );
}

export default AdminLandingPage;