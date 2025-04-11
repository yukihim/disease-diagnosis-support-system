import React from 'react';
import PageLayout from '../../components/common/pageLayout';

import Calendar from '../../components/common/calendar';

// Import admin landingpage components
import AdminMonitorUsers from '../../components/admin/landingPage/adminMonitorUsers/adminMonitorUsers';

function AdminLandingPage() {
    return (
        <PageLayout requiredRole="admin">
            <AdminMonitorUsers role="admin" />
            
            <Calendar />
        </PageLayout>
    );
}

export default AdminLandingPage;