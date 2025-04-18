import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import { useHistory } from 'react-router-dom';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import IncomingPatientOverview from '../../common/incomingPatient/incomingPatientOverview';
import IncomingPatientPagination from '../../common/incomingPatient/incomingPatientPagination'; // Ensure this is imported
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
    { name: 'Phuong Xuong D', sex: 'Male', age: '22', from: 'Front Desk', state: 'Nurse measured', note: 'No note' },
    { name: 'Phuong Xuong E', sex: 'Male', age: '22', from: 'Front Desk', state: 'New patient', note: 'No note' },
    { name: 'John Doe', sex: 'Male', age: '45', from: 'Front Desk', state: 'New patient', note: 'Allergic to penicillin' },
    { name: 'Jane Smith', sex: 'Female', age: '32', from: 'Paraclinic', state: 'Back from test', note: 'MRI results ready' },
    { name: 'Mike Johnson', sex: 'Male', age: '28', from: 'Front Desk', state: 'Nurse measured', note: 'High fever' },
    { name: 'Sarah Williams', sex: 'Female', age: '54', from: 'Paraclinic', state: 'Back from test', note: 'Blood test completed' },
    { name: 'Robert Brown', sex: 'Male', age: '67', from: 'Front Desk', state: 'New patient', note: 'Chronic condition' },
    { name: 'Emily Davis', sex: 'Female', age: '19', from: 'Paraclinic', state: 'Sending for test', note: 'X-ray needed' },
    { name: 'David Wilson', sex: 'Male', age: '41', from: 'Front Desk', state: 'New patient', note: 'Follow-up visit' },
];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15]; // Define options for rows per page

function DoctorIncomingPatient({ role }) {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]); // Default to 5 (index 0)

    // Calculate total count
    const totalRecords = incomingPatientTableDummyData.length;

    // Calculate total pages based on current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(totalRecords / rowsPerPage);
    }, [totalRecords, rowsPerPage]); // Recalculate when count or rowsPerPage changes

    // Update displayed data when page or rowsPerPage changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalRecords);
        setDisplayData(incomingPatientTableDummyData.slice(startIndex, endIndex));
    }, [currentPage, rowsPerPage, totalRecords]); // Add rowsPerPage and totalRecords dependency

    // Reset to first page when rowsPerPage changes
    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage]); // Reset page if rowsPerPage changes

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    // --- Handle Rows Per Page Change ---
    function handleRowsPerPageChange(newRowsPerPage) {
        setRowsPerPage(newRowsPerPage);
        // setCurrentPage(1) is handled by the useEffect hook
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
                // Add other relevant patient data if needed
            }
        });
    }

    return (
        <BoxContainer className='bigBox'>
            <BoxContainerTitle>
                Incoming Patient
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <IncomingPatientOverview incomingPatientCount={totalRecords} />

                {/* Pagination - Pass new props */}
                <IncomingPatientPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS} // Pass options
                    currentRowsPerPage={rowsPerPage} // Pass current value
                    onRowsPerPageChange={handleRowsPerPageChange} // Pass handler
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