import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './style/eventCalendar.css';
// ... other imports

import BoxContainer from './boxContainer';
import BoxContainerTitle from './boxContainerTitle';
import BoxContainerContent from './boxContainerContent';

import EventCalendarHeader from './eventCalendar/eventCalendarHeader';
import EventCalendarTable from './eventCalendar/eventCalendarTable';

const eventCalendarTableHeader = [
    { name: 'Time', gridColumn: "span 1", minWidth: '200px', dataKey: 'time' },
    { name: 'Event', gridColumn: "span 3", minWidth: '200px', dataKey: 'event' },
];

function EventCalendar({ selectedDate }) {
    const [eventsData, setEventsData] = useState({ time: '', event: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'No date selected';

    useEffect(() => {
        // Ensure selectedDate is valid before fetching
        if (!selectedDate) {
            setEventsData({ time: '', event: [] });
            return; // Don't fetch if no date is selected
        }

        const fetchEvents = async () => {
            setIsLoading(true);
            setError(null);
            const token = Cookies.get('token');

            if (!token) {
                setError("User not authenticated.");
                setIsLoading(false);
                setEventsData({ time: '', event: [] });
                return;
            }

            // Format the selected date for the API query parameter (YYYY-MM-DD)
            const year = selectedDate.getFullYear();
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const day = selectedDate.getDate().toString().padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;

            try {
                // Add the date as a query parameter
                const apiUrl = `http://localhost:5001/calendar_events?date=${dateStr}`;
                console.log("Fetching events from:", apiUrl);

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Response Data:", data);

                setEventsData({
                    time: data.time || '',
                    event: data.event || []
                });

            } catch (err) {
                console.error("Error fetching calendar events:", err);
                setError(err.message || "Failed to fetch events.");
                setEventsData({ time: '', event: [] });
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();

    }, [selectedDate]); // Add selectedDate to the dependency array

    return (
        <BoxContainer className='eventCalendarBox'>
            <BoxContainerTitle className='eventCalendar'>
                Event Calendar for Date: {formattedDate}
            </BoxContainerTitle>

            <BoxContainerContent className='eventCalendarContent'>
                <EventCalendarHeader eventCalendarTableHeader={eventCalendarTableHeader} />

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading events...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    <EventCalendarTable
                        eventCalendarTableHeader={eventCalendarTableHeader}
                        eventCalendarTableData={eventsData.event}
                        onClickSession={(eventItem) => { console.log("Clicked on session:", eventItem) }}
                    />
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default EventCalendar;