import React, { useState } from 'react';

import PageLayout from '../../components/common/pageLayout';

import Calendar from '../../components/common/calendar';
import EventCalendar from '../../components/common/eventCalendar';

function DoctorCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const handleDateSelected = (date) => {
        setSelectedDate(date);
    };

    return (
        <PageLayout requiredRole="doctor">
            <Calendar onDateSelect={handleDateSelected} />

            <EventCalendar selectedDate={selectedDate} />
        </PageLayout>
    );
}

export default DoctorCalendar;