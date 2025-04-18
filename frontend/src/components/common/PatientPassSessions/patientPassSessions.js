// import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
// import './style/patientPassSessions.css';

// import BoxContainer from '../boxContainer';
// import BoxContainerTitle from '../boxContainerTitle';
// import BoxContainerContent from '../boxContainerContent';

// import PatientPassSessionsOverview from './components/patientPassSessionsOverview';
// import PatientPassSessionsPagination from './components/patientPassSessionsPagination'; // Ensure this is imported
// import PatientPassSessionsHeader from './components/patientPassSessionsHeader';
// import PatientPassSessionsTable from './components/patientPassSessionsTable';

// const patientPassSessionsTableHeader = [
//     { name: 'Session Date', width: '200px' },
//     { name: 'Session Type', width: '200px' },
//     { name: 'Person In Charged', width: '200px' },
//     { name: 'Department', width: '200px' },
//     { name: 'Result', width: '200px' }
// ];

// const patientPassSessionsTableDummyData = [
//     { sessionDate: '2024-12-01', sessionType: 'Consultation A', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
//     { sessionDate: '2024-12-02', sessionType: 'Consultation B', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
//     { sessionDate: '2024-12-03', sessionType: 'Consultation C', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
//     { sessionDate: '2024-12-04', sessionType: 'Consultation D', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
//     { sessionDate: '2024-12-05', sessionType: 'Consultation E', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
//     { sessionDate: '2024-12-06', sessionType: 'Consultation F', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
//     { sessionDate: '2024-12-07', sessionType: 'Consultation G', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
//     { sessionDate: '2024-12-08', sessionType: 'Consultation H', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
//     { sessionDate: '2024-12-09', sessionType: 'Consultation I', pIC: 'Dr. Smith', department: 'City General Hospital', result: 'Medication Prescribed' },
// ];

// const ROWS_PER_PAGE_OPTIONS = [5, 10, 15]; // Define options for rows per page

// function PatientPassSessions({ role, onClickSession }) {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [displayData, setDisplayData] = useState([]);
//     const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[1]); // Default to 5 (index 1)

//     // Calculate total count
//     const totalSessionsCount = patientPassSessionsTableDummyData.length;

//     // Calculate total pages based on current rowsPerPage
//     const totalPages = useMemo(() => {
//         // Use totalSessionsCount instead of totalRecords
//         return Math.ceil(totalSessionsCount / rowsPerPage);
//     }, [totalSessionsCount, rowsPerPage]); // Recalculate when count or rowsPerPage changes

//     // Update displayed data when page or rowsPerPage changes
//     useEffect(() => {
//         const startIndex = (currentPage - 1) * rowsPerPage;
//         // Use totalSessionsCount instead of totalRecords
//         const endIndex = Math.min(startIndex + rowsPerPage, totalSessionsCount);
//         setDisplayData(patientPassSessionsTableDummyData.slice(startIndex, endIndex));
//     }, [currentPage, rowsPerPage, totalSessionsCount]); // Add rowsPerPage and totalSessionsCount dependency

//     // Reset to first page when rowsPerPage changes
//     useEffect(() => {
//         setCurrentPage(1);
//     }, [rowsPerPage]); // Reset page if rowsPerPage changes

//     function handlePageChange(newPage) {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setCurrentPage(newPage);
//         }
//     }

//     // --- Handle Rows Per Page Change ---
//     function handleRowsPerPageChange(newRowsPerPage) {
//         setRowsPerPage(newRowsPerPage);
//         // setCurrentPage(1) is handled by the useEffect hook
//     }

//     return (
//         <BoxContainer className='patientPassSessionsBox'>
//             <BoxContainerTitle className='patientPassSessions'>
//                 Patient's Pass Sessions
//             </BoxContainerTitle>

//             <BoxContainerContent className='patientPassSessionsContent'>
//                 {/* Overview Section */}
//                 <PatientPassSessionsOverview totalSessionsCount={totalSessionsCount} />

//                 {/* Table Pagination - Pass new props */}
//                 <PatientPassSessionsPagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={handlePageChange}
//                     rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS} // Pass options
//                     currentRowsPerPage={rowsPerPage} // Pass current value
//                     onRowsPerPageChange={handleRowsPerPageChange} // Pass handler
//                 />

//                 {/* Table Header */}
//                 <PatientPassSessionsHeader patientPassSessionsTableHeader={patientPassSessionsTableHeader} />

//                 {/* Table Content */}
//                 <PatientPassSessionsTable patientPassSessionsTableHeader={patientPassSessionsTableHeader} patientPassSessionsTableData={displayData} onClickSession={onClickSession} />
//             </BoxContainerContent>
//         </BoxContainer>
//     );
// }

// export default PatientPassSessions;






























import React, { useState, useEffect, useMemo } from 'react';
import './style/patientPassSessions.css';

import BoxContainer from '../boxContainer';
import BoxContainerTitle from '../boxContainerTitle';
import BoxContainerContent from '../boxContainerContent';

import PatientPassSessionsOverview from './components/patientPassSessionsOverview';
import PatientPassSessionsPagination from './components/patientPassSessionsPagination';
import PatientPassSessionsHeader from './components/patientPassSessionsHeader'; // Ensure this is imported
import PatientPassSessionsTable from './components/patientPassSessionsTable';

const patientPassSessionsTableHeader = [
    { name: 'Session Date', width: '200px' }, // Key: 'Session Date'
    { name: 'Session Type', width: '200px' }, // Key: 'Session Type'
    { name: 'Person In Charged', width: '200px' }, // Key: 'Person In Charged'
    { name: 'Department', width: '200px' }, // Key: 'Department'
    { name: 'Result', width: '200px' } // Key: 'Result'
];

const patientPassSessionsTableDummyData = [
    { sessionDate: '2024-12-01', sessionType: 'Consultation A', pIC: 'Dr. Smith', department: 'Cardiology', result: 'Medication Prescribed' },
    { sessionDate: '2024-12-05', sessionType: 'Consultation E', pIC: 'Dr. Jones', department: 'Neurology', result: 'Follow-up required' },
    { sessionDate: '2024-12-03', sessionType: 'Consultation C', pIC: 'Dr. Brown', department: 'Pediatrics', result: 'Referral to Specialist' },
    { sessionDate: '2024-12-08', sessionType: 'Consultation H', pIC: 'Dr. White', department: 'Oncology', result: 'Further Tests Needed' },
    { sessionDate: '2024-12-02', sessionType: 'Consultation B', pIC: 'Dr. Green', department: 'Cardiology', result: 'Stable' },
    { sessionDate: '2024-12-09', sessionType: 'Consultation I', pIC: 'Dr. Black', department: 'Neurology', result: 'Discharged' },
    { sessionDate: '2024-12-06', sessionType: 'Consultation F', pIC: 'Dr. Smith', department: 'Pediatrics', result: 'Vaccination Administered' },
    { sessionDate: '2024-12-04', sessionType: 'Consultation D', pIC: 'Dr. Jones', department: 'Oncology', result: 'Treatment Plan Adjusted' },
    { sessionDate: '2024-12-07', sessionType: 'Consultation G', pIC: 'Dr. Brown', department: 'Cardiology', result: 'Monitoring Advised' },
];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];

function PatientPassSessions({ role, onClickSession }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[1]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // Add state for sorting

    // --- Sorting Logic ---
    const sortedData = useMemo(() => {
        let sortableData = [...patientPassSessionsTableDummyData]; // Create a mutable copy
        if (sortConfig.key) {
            // Map header names to data keys (adjust if needed)
            const keyMap = {
                'Session Date': 'sessionDate',
                'Session Type': 'sessionType',
                'Person In Charged': 'pIC',
                'Department': 'department',
                'Result': 'result'
            };
            const dataKey = keyMap[sortConfig.key] || sortConfig.key.toLowerCase(); // Get the actual data key

            sortableData.sort((a, b) => {
                let aValue = a[dataKey];
                let bValue = b[dataKey];

                // Handle specific data types like dates
                if (dataKey === 'sessionDate') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                }

                // Handle potential undefined/null values
                const valA = aValue === undefined || aValue === null ? '' : aValue;
                const valB = bValue === undefined || bValue === null ? '' : bValue;

                // Comparison logic
                if (valA < valB) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (valA > valB) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0; // Values are equal
            });
        }
        return sortableData;
    }, [sortConfig]); // Re-sort only when sortConfig changes

    // Calculate total count from sorted data (length remains the same)
    const totalSessionsCount = sortedData.length;

    // Calculate total pages based on current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(totalSessionsCount / rowsPerPage);
    }, [totalSessionsCount, rowsPerPage]);

    // Update displayed data when page, rowsPerPage, or sortedData changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalSessionsCount);
        setDisplayData(sortedData.slice(startIndex, endIndex)); // Slice from sortedData
    }, [currentPage, rowsPerPage, sortedData, totalSessionsCount]); // Add sortedData dependency

    // Reset to first page when rowsPerPage or sorting changes
    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage, sortConfig]); // Add sortConfig dependency

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    function handleRowsPerPageChange(newRowsPerPage) {
        setRowsPerPage(newRowsPerPage);
    }

    // --- Handle Sorting ---
    function handleSort(key) { // key is the header name like 'Session Date'
        let direction = 'asc';
        let nextKey = key;

        if (sortConfig.key === key) {
            if (sortConfig.direction === 'asc') {
                direction = 'desc';
            } else if (sortConfig.direction === 'desc') {
                direction = null; // Reset sort
                nextKey = null;
            }
        }
        setSortConfig({ key: nextKey, direction });
        // setCurrentPage(1) is handled by the useEffect hook
    }

    return (
        <BoxContainer className='patientPassSessionsBox'>
            <BoxContainerTitle className='patientPassSessions'>
                Patient's Pass Sessions
            </BoxContainerTitle>

            <BoxContainerContent className='patientPassSessionsContent'>
                {/* Overview Section */}
                <PatientPassSessionsOverview totalSessionsCount={totalSessionsCount} />

                {/* Table Pagination */}
                <PatientPassSessionsPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    currentRowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />

                {/* Table Header - Pass sorting props */}
                <PatientPassSessionsHeader
                    patientPassSessionsTableHeader={patientPassSessionsTableHeader}
                    onSort={handleSort} // Pass the handler
                    sortConfig={sortConfig} // Pass the current config
                />

                {/* Table Content - Use displayData which is now sorted and paginated */}
                <PatientPassSessionsTable
                    patientPassSessionsTableHeader={patientPassSessionsTableHeader}
                    patientPassSessionsTableData={displayData}
                    onClickSession={onClickSession}
                />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default PatientPassSessions;