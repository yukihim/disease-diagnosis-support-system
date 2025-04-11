import React from 'react';
import './style/eventCalendar.css';

import BoxContainer from './boxContainer';
import BoxContainerTitle from './boxContainerTitle';
import BoxContainerContent from './boxContainerContent';

import EventCalendarHeader from './eventCalendar/eventCalendarHeader'
import EventCalendarTable from './eventCalendar/eventCalendarTable';

const eventCalendarTableHeader = [
    { name: 'Time', gridColumn: "span 1", minWidth: '200px' },
    { name: 'Event', gridColumn: "span 3", minWidth: '200px' },
];

const eventCalendarTableDummyData = [
    {
        time: '00:00 AM',
        event: ['Patient Nguyen Van A', 'Patient Nguyen Van B', 'Patient Nguyen Van C', 'Patient Nguyen Van D', 'Patient Nguyen Van E', 'Patient Nguyen Van F', 'Patient Nguyen Van G', 'Patient Nguyen Van H', 'Patient Nguyen Van I', 'Patient Nguyen Van J']
    },
    {
        time: '01:00 AM',
        event: ['Patient Phuong Xuong Thinh']
    },
    {
        time: '02:00 AM',
        event: ['Patient Nguyen Van A', 'Patient Nguyen Van B', 'Patient Nguyen Van C', 'Patient Nguyen Van D', 'Patient Nguyen Van E', 'Patient Nguyen Van F', 'Patient Nguyen Van G', 'Patient Nguyen Van H', 'Patient Nguyen Van I', 'Patient Nguyen Van J']
    },
    {
        time: '03:00 AM',
        event: ['Patient Phuong Xuong Thinh']
    },
    {
        time: '04:00 AM',
        event: ['Patient Phuong Xuong Thinh']
    },
    {
        time: '05:00 AM',
        event: ['Patient Phuong Xuong Thinh']
    },
    {
        time: '06:00 AM',
        event: ['Patient Phuong Xuong Thinh']
    },
    {
        time: '07:00 AM',
        event: ['Patient Phuong Xuong Thinh']
    },
    {
        time: '08:00 AM',
        event: ['Patient Phuong Xuong Thinh']
    },
    {
        time: '09:00 AM',
        event: ['Patient Phuong Xuong Thinh']
    },
    {
        time: '10:00 AM',
        event: ['Patient Phuong Xuong Thinh']
    },
    {
        time: '11:00 AM',
        event: ['Patient Phuong Xuong Thinh']
    },
    {
        time: '12:00 PM',
        event: ['Patient Nguyen Van A', 'Patient Nguyen Van B']
    },
    {
        time: '01:00 PM',
        event: ['Patient Phuong Xuong Thinh', 'Patient Nguyen Van C']
    },
    {
        time: '02:00 PM',
        event: ['Patient Nguyen Van D', 'Patient Nguyen Van E']
    },
    {
        time: '03:00 PM',
        event: ['Patient Phuong Xuong Thinh']
    },
    {
        time: '04:00 PM',
        event: ['Patient Nguyen Van F']
    },
    {
        time: '05:00 PM',
        event: ['Patient Phuong Xuong Thinh']
    },
    {
        time: '06:00 PM',
        event: ['Patient Nguyen Van G', 'Patient Nguyen Van H']
    },
    {
        time: '07:00 PM',
        event: ['Patient Phuong Xuong Thinh']
    },
    {
        time: '08:00 PM',
        event: ['Patient Nguyen Van I']
    },
    {
        time: '09:00 PM',
        event: ['Patient Phuong Xuong Thinh']
    },
    {
        time: '10:00 PM',
        event: ['Patient Nguyen Van J']
    },
    {
        time: '11:00 PM',
        event: ['Patient Phuong Xuong Thinh']
    }
];

// function EventCalendar() {
//     return (
//         <BoxContainer className='eventCalendarBox'>
//             {/* Design patient pass session component here */}
//             <BoxContainerTitle className='eventCalendar'>
//                 Event Calendar for Date (Insert date here from calendar)
//             </BoxContainerTitle>

//             <BoxContainerContent className='eventCalendarContent'>
//                 {/* Table Header */}
//                 <EventCalendarHeader eventCalendarTableHeader={eventCalendarTableHeader} />

//                 {/* Table Content */}
//                 <EventCalendarTable eventCalendarTableHeader={eventCalendarTableHeader} eventCalendarTableData={eventCalendarTableDummyData} onClickSession={() => {console.log("Wow")}} />
//             </BoxContainerContent>
//         </BoxContainer>
//     );
// }

function EventCalendar({ selectedDate }) {
    // Format the date to display
    const formattedDate = selectedDate 
        ? selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'No date selected';

    return (
        <BoxContainer className='eventCalendarBox'>
            <BoxContainerTitle className='eventCalendar'>
                Event Calendar for Date: {formattedDate}
            </BoxContainerTitle>

            <BoxContainerContent className='eventCalendarContent'>
                {/* Table Header */}
                <EventCalendarHeader eventCalendarTableHeader={eventCalendarTableHeader} />

                {/* Table Content */}
                <EventCalendarTable 
                    eventCalendarTableHeader={eventCalendarTableHeader} 
                    eventCalendarTableData={eventCalendarTableDummyData} 
                    onClickSession={() => {console.log("Clicked on session for", formattedDate)}} 
                />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default EventCalendar;