// import React from 'react';
// import { useHistory } from 'react-router-dom';

// import BoxContainer from '../../common/boxContainer';
// import BoxContainerTitle from '../../common/boxContainerTitle';
// import BoxContainerContent from '../../common/boxContainerContent';

// import IncomingPatientOverview from '../../common/incomingPatient/incomingPatientOverview';
// import IncomingPatientPagination from '../../common/incomingPatient/incomingPatientPagination';
// import IncomingPatientTableHeader from '../../common/incomingPatient/incomingPatientTableHeader';
// import IncomingPatientTableContent from '../../common/incomingPatient/incomingPatientTableContent';

// const incomingPatientTableHeader = [
//     { name: 'Name', width: '150px' },
//     { name: 'Sex', width: '50px' },
//     { name: 'Age', width: '30px' },
//     { name: 'From', width: '100px' },
//     { name: 'State', width: '150px' },
//     { name: 'Note', width: '150px' }
// ];

// const incomingPatientTableDummyData = [
//     { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'Paraclinic', state: 'Back from test', note: 'Patient needs urgent care' },
//     { name: 'Phuong Xuong B', sex: 'Male', age: '22', from: 'Paraclinic', state: 'Back from test', note: 'No note' },
//     { name: 'Phuong Xuong C', sex: 'Male', age: '22', from: 'Front Desk', state: 'Sending for test', note: 'Testing blood' },
//     { name: 'Phuong Xuong B', sex: 'Male', age: '22', from: 'Front Desk', state: 'Nurse measured', note: 'No note' },
//     { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'Front Desk', state: 'New patient', note: 'No note' },
// ];

// function DoctorIncomingPatient({ role }) {
//     const history = useHistory();

//     const incomingPatientCount = 12;

//     function onClickIncomingPatient(patient) {
//         let pathnameUrl='';

//         if (role === 'doctor') {
//             pathnameUrl = '/doctor/diagnosis';
//         } else if (role === 'nurse') {
//             pathnameUrl = '/nurse/add_patient_measurements';
//         }

//         // Navigate to the next page with patient information
//         history.push({
//             pathname: pathnameUrl,
//             state: {
//                 patientName: patient.name,
//                 patientSex: patient.sex,
//                 patientAge: patient.age,
//                 patientFrom: patient.from
//             }
//         });
//     }

//     return (
//         <BoxContainer className='bigBox'>
//             {/* Design emergency component here */}
//             <BoxContainerTitle>
//                 Incoming Patient
//             </BoxContainerTitle>

//             <BoxContainerContent>
//                 {/* Overview */}
//                 <IncomingPatientOverview incomingPatientCount={incomingPatientCount} />

//                 {/* Pagination */}
//                 <IncomingPatientPagination />

//                 {/* Table header */}
//                 <IncomingPatientTableHeader incomingPatientTableHeader={incomingPatientTableHeader} />

//                 {/* Table content */}
//                 <IncomingPatientTableContent incomingPatientTableHeader={incomingPatientTableHeader} incomingPatientTableData={incomingPatientTableDummyData} onClickIncomingPatient={onClickIncomingPatient} />
//             </BoxContainerContent>
//         </BoxContainer>
//     );
// }

// export default DoctorIncomingPatient;

























import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import IncomingPatientOverview from '../../common/incomingPatient/incomingPatientOverview';
import IncomingPatientPagination from '../../common/incomingPatient/incomingPatientPagination';
import IncomingPatientTableHeader from '../../common/incomingPatient/incomingPatientTableHeader';
import IncomingPatientTableContent from '../../common/incomingPatient/incomingPatientTableContent';

const incomingPatientTableHeader = [
    { name: 'Name', width: '150px' },
    { name: 'Sex', width: '50px' },
    { name: 'Age', width: '30px' },
    { name: 'From', width: '100px' },
    { name: 'State', width: '150px' },
    { name: 'Note', width: '150px' }
];

const incomingPatientTableDummyData = [
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'Paraclinic', state: 'Back from test', note: 'Patient needs urgent care' },
    { name: 'Phuong Xuong B', sex: 'Male', age: '22', from: 'Paraclinic', state: 'Back from test', note: 'No note' },
    { name: 'Phuong Xuong C', sex: 'Male', age: '22', from: 'Front Desk', state: 'Sending for test', note: 'Testing blood' },
    { name: 'Phuong Xuong B', sex: 'Male', age: '22', from: 'Front Desk', state: 'Nurse measured', note: 'No note' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'Front Desk', state: 'New patient', note: 'No note' },
    { name: 'John Doe', sex: 'Male', age: '45', from: 'Front Desk', state: 'New patient', note: 'Allergic to penicillin' },
    { name: 'Jane Smith', sex: 'Female', age: '32', from: 'Paraclinic', state: 'Back from test', note: 'MRI results ready' },
    { name: 'Mike Johnson', sex: 'Male', age: '28', from: 'Front Desk', state: 'Nurse measured', note: 'High fever' },
    { name: 'Sarah Williams', sex: 'Female', age: '54', from: 'Paraclinic', state: 'Back from test', note: 'Blood test completed' },
    { name: 'Robert Brown', sex: 'Male', age: '67', from: 'Front Desk', state: 'New patient', note: 'Chronic condition' },
    { name: 'Emily Davis', sex: 'Female', age: '19', from: 'Paraclinic', state: 'Sending for test', note: 'X-ray needed' },
    { name: 'David Wilson', sex: 'Male', age: '41', from: 'Front Desk', state: 'New patient', note: 'Follow-up visit' },
];

function DoctorIncomingPatient({ role }) {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    
    // Pagination settings
    const ROWS_PER_PAGE = 5;
    const totalRecords = incomingPatientTableDummyData.length;
    const totalPages = Math.ceil(totalRecords / ROWS_PER_PAGE);

    // Update displayed data when page changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        const endIndex = Math.min(startIndex + ROWS_PER_PAGE, totalRecords);
        setDisplayData(incomingPatientTableDummyData.slice(startIndex, endIndex));
    }, [currentPage]);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    function onClickIncomingPatient(patient) {
        let pathnameUrl='';

        if (role === 'doctor') {
            pathnameUrl = '/doctor/diagnosis';
        } else if (role === 'nurse') {
            pathnameUrl = '/nurse/add_patient_measurements';
        }

        // Navigate to the next page with patient information
        history.push({
            pathname: pathnameUrl,
            state: {
                patientName: patient.name,
                patientSex: patient.sex,
                patientAge: patient.age,
                patientFrom: patient.from
            }
        });
    }

    return (
        <BoxContainer className='bigBox'>
            {/* Design emergency component here */}
            <BoxContainerTitle>
                Incoming Patient
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <IncomingPatientOverview incomingPatientCount={totalRecords} />

                {/* Pagination */}
                <IncomingPatientPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                {/* Table header */}
                <IncomingPatientTableHeader incomingPatientTableHeader={incomingPatientTableHeader} />

                {/* Table content */}
                <IncomingPatientTableContent 
                    incomingPatientTableHeader={incomingPatientTableHeader} 
                    incomingPatientTableData={displayData} 
                    onClickIncomingPatient={onClickIncomingPatient} 
                />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorIncomingPatient;