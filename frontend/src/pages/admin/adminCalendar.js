import React, { useState } from 'react';
import PageLayout from '../../components/common/pageLayout';

import Calendar from '../../components/common/calendar';
import EventCalendar from '../../components/common/eventCalendar';

function AdminCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const handleDateSelected = (date) => {
        console.log("Date selected:", date); // For debugging
        setSelectedDate(date);
    };

    return (
        <PageLayout requiredRole="admin">
            <Calendar onDateSelect={handleDateSelected} />

            <EventCalendar selectedDate={selectedDate} />
        </PageLayout>
    );
}

export default AdminCalendar;