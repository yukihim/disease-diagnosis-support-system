import React, { useState } from 'react';
import PageLayout from '../../components/common/pageLayout';

import Calendar from '../../components/common/calendar';
import EventCalendar from '../../components/common/eventCalendar';

// Import receptionist landingpage components
// import ReceptionistAppointment from '../../components/receptionist/landingPage/receptionistAppointment';
// import ReceptionistTodaysPastAppointment from '../../components/receptionist/landingPage/receptionistTodaysPastAppointment';

function ReceptionistCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
        
    const handleDateSelected = (date) => {
        console.log("Date selected:", date); // For debugging
        setSelectedDate(date);
    };
    
    return (
        <PageLayout requiredRole="receptionist">
            <Calendar onDateSelect={handleDateSelected} />
            {/* <ReceptionistAppointment />
            <ReceptionistTodaysPastAppointment /> */}

            <EventCalendar selectedDate={selectedDate} />
        </PageLayout>
    );
}

export default ReceptionistCalendar;