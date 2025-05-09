import React, { useState, useEffect } from 'react';
import './style/calendar.css';

import Button from './button';
import ButtonText from './buttonText';

import PrevButton from './prevButton';
import NextButton from './nextButton';

function Calendar({ onDateSelect }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(currentDate);

    useEffect(() => {
        const today = new Date();
        // setSelectedDate(today);
        
        // Call the parent component's handler with the initial date
        if (onDateSelect) {
            onDateSelect(today);
        }
    }, []); // Empty dependency array means this runs once on mount

    const getMonthName = (date) => {
        return date.toLocaleString('default', { month: 'long' });
    };

    const getYear = (date) => {
        return date.getFullYear();
    };

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        // Call the parent component's handler with the selected date
        if (onDateSelect) {
            onDateSelect(date);
        }
    };

    const renderCalendarDates = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDayOfMonth = getFirstDayOfMonth(currentDate);
        const dates = [];

        // Get the previous month and next month dates
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        // const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const daysInPrevMonth = getDaysInMonth(prevMonth);

        // Add previous month's dates
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            dates.push(
                <li key={`prev-${i}`} className="inactive">
                    {daysInPrevMonth - i}
                </li>
            );
        }

        // Add current month's dates
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
            dates.push(
                <li
                    key={i}
                    className={isSelected ? 'selected' : ''}
                    onClick={() => handleDateClick(date)}
                >
                    {i}
                </li>
            );
        }

        // Add next month's dates
        const totalDays = firstDayOfMonth + daysInMonth;
        const remainingDays = (totalDays % 7 === 0) ? 0 : 7 - (totalDays % 7);
        for (let i = 1; i <= remainingDays; i++) {
            dates.push(
                <li key={`next-${i}`} className="inactive">
                    {i}
                </li>
            );
        }

        return dates;
    };

    // Add this function with your other handlers
    const handleTodayClick = () => {
        const today = new Date();
        setCurrentDate(new Date(today));
        setSelectedDate(today);
        if (onDateSelect) {
            onDateSelect(today);
        }
    };

    return (
        <div className="calendar-container">
            <header className="calendar-header">
                <Button onClick={handleTodayClick}>
                    <ButtonText>Today</ButtonText>
                </Button>

                <div className="calendar-header-title">
                    <div className="calendar-navigation">
                        <PrevButton onClick={handlePrevMonth} />
                    </div>
                    <p className="calendar-current-date">{`${getMonthName(currentDate)} ${getYear(currentDate)}`}</p>
                    <div className="calendar-navigation">
                        <NextButton onClick={handleNextMonth} />
                    </div>
                </div>
            </header>

            <div className="calendar-body">
                <ul className="calendar-weekdays">
                    <li>Su</li>
                    <li>Mo</li>
                    <li>Tu</li>
                    <li>We</li>
                    <li>Th</li>
                    <li>Fr</li>
                    <li>Sa</li>
                </ul>
                <ul className="calendar-dates">
                    {renderCalendarDates()}
                </ul>
            </div>
        </div>
    );
}

export default Calendar;