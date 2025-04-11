import React, { useState } from 'react';

import PageLayout from '../../components/common/pageLayout';

import Calendar from '../../components/common/calendar';
import EventCalendar from '../../components/common/eventCalendar';

function NurseCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
        
    const handleDateSelected = (date) => {
        console.log("Date selected:", date); // For debugging
        setSelectedDate(date);
    };

    return (
        <PageLayout requiredRole="nurse">
            <Calendar onDateSelect={handleDateSelected} />

            <EventCalendar selectedDate={selectedDate} />
        </PageLayout>
    );
}

export default NurseCalendar;