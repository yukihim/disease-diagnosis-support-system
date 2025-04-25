import React, { useState } from 'react';
import PageLayout from '../../components/common/pageLayout';

import Calendar from '../../components/common/calendar';
import EventCalendar from '../../components/common/eventCalendar';

function AdminCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const handleDateSelected = (date) => {
        console.log("Date selected:", date); // For debugging
        setSelectedDate(date);

        // Format for API call (DD-MM-YYYY)
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDateString = `${day}-${month}-${year}`;

        console.log("Formatted Date String:", formattedDateString); // e.g., "21-04-2025"
    };

    return (
        <PageLayout requiredRole="admin">
            <Calendar onDateSelect={handleDateSelected} />

            <EventCalendar selectedDate={selectedDate} />
        </PageLayout>
    );
}

export default AdminCalendar;