// import React from 'react';
// import './style/doctorEventsCapturing.css';

// import BoxContainer from '../../common/boxContainer';
// import BoxContainerTitle from '../../common/boxContainerTitle';
// import BoxContainerContent from '../../common/boxContainerContent';

// import DoctorEventsCapturingPagination from './doctorEventsCapturing/doctorEventsCapturingPagination';
// import DoctorEventsCapturingHeader from './doctorEventsCapturing/doctorEventsCapturingHeader';
// import DoctorEventsCapturingTable from './doctorEventsCapturing/doctorEventsCapturingTable';

// const patientEventCapturedTableHeader = [
//     { name: 'Time', width: '200px' },
//     { name: 'Event', width: '200px' },
//     { name: 'Note', width: '200px' }
// ];

// const patientEventCapturedTableDummyData = [
//     { time: '2024-12-01', event: 'Consultation', note: 'Patient is stable' },
//     { time: '2024-12-01', event: 'Consultation', note: 'Patient is stable' },
//     { time: '2024-12-01', event: 'Consultation', note: '' },
//     { time: '2024-12-01', event: 'Consultation', note: '' },
//     { time: '2024-12-01', event: 'Consultation', note: '' }
// ];

// function DoctorEventsCapturing() {
//     return (
//         <BoxContainer className='doctorEventsCapturingBox'>
//             <BoxContainerTitle className='doctorEventsCapturing'>
//                 Events Captured
//             </BoxContainerTitle>

//             <BoxContainerContent className='doctorEventsCapturingContent'>
//                 {/* Table Pagination */}
//                 <DoctorEventsCapturingPagination />

//                 {/* Table Header */}
//                 <DoctorEventsCapturingHeader patientEventCapturedTableHeader={patientEventCapturedTableHeader} />

//                 {/* Table Content */}
//                 <DoctorEventsCapturingTable patientEventCapturedTableHeader={patientEventCapturedTableHeader} patientEventCapturedTableData={patientEventCapturedTableDummyData} onClickNoting={onClickNoting} />
//             </BoxContainerContent>
//         </BoxContainer>
//     );
// }

// export default DoctorEventsCapturing;







import React, { useState } from 'react';
import './style/doctorEventsCapturing.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorEventsCapturingPagination from './doctorEventsCapturing/doctorEventsCapturingPagination';
import DoctorEventsCapturingHeader from './doctorEventsCapturing/doctorEventsCapturingHeader';
import DoctorEventsCapturingTable from './doctorEventsCapturing/doctorEventsCapturingTable';

const patientEventCapturedTableHeader = [
    { name: 'Time', width: '200px' },
    { name: 'Event', width: '200px' },
    { name: 'Note', width: '600px' }
];

const patientEventCapturedTableDummyData = [
    { time: '2024-12-01', event: 'Consultation', note: 'Patient is stable' },
    { time: '2024-12-01', event: 'Consultation', note: 'Patient is stable' },
    { time: '2024-12-01', event: 'Consultation', note: '' },
    { time: '2024-12-01', event: 'Consultation', note: '' },
    { time: '2024-12-01', event: 'Consultation', note: '' }
];

function DoctorEventsCapturing() {
    const [eventData, setEventData] = useState(patientEventCapturedTableDummyData);
    
    const onClickNoting = (index, note) => {
        // Create a new array with the updated note
        const updatedData = [...eventData];
        updatedData[index].note = note;
        setEventData(updatedData);
    };

    return (
        <BoxContainer className='doctorEventsCapturingBox'>
            <BoxContainerTitle className='doctorEventsCapturing'>
                Events Captured
            </BoxContainerTitle>

            <BoxContainerContent className='doctorEventsCapturingContent'>
                {/* Table Pagination */}
                <DoctorEventsCapturingPagination />

                {/* Table Header */}
                <DoctorEventsCapturingHeader patientEventCapturedTableHeader={patientEventCapturedTableHeader} />

                {/* Table Content */}
                <DoctorEventsCapturingTable 
                    patientEventCapturedTableHeader={patientEventCapturedTableHeader} 
                    patientEventCapturedTableData={eventData} 
                    onClickNoting={onClickNoting} 
                />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorEventsCapturing;