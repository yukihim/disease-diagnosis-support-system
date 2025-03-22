import React, { useState, useEffect }  from 'react';

function ReceptionistAppointmentClock() {
    // Format time to show only hours and minutes
    const formatTimeHoursMinutes = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // State to hold the current time (hours and minutes only)
    const [currentTime, setCurrentTime] = useState(formatTimeHoursMinutes());

    // Effect to update the time every minute
    useEffect(() => {
        // Update time immediately
        setCurrentTime(formatTimeHoursMinutes());

        // Set up interval to update time every second (60000 milliseconds)
        const intervalId = setInterval(() => {
            setCurrentTime(formatTimeHoursMinutes());
        }, 1000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div style={{ color: "rgba(78, 75, 102, 0.61)" }}>
            {currentTime}
        </div>
    );
}

export default ReceptionistAppointmentClock;