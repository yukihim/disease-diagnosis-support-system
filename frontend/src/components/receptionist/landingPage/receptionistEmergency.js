import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistEmergencyOverview from './receptionistEmergency/receptionistEmergencyOverview';
import ReceptionistEmergencyPagination from './receptionistEmergency/receptionistEmergencyPagination';
import ReceptionistEmergencyTableHeader from './receptionistEmergency/receptionistEmergencyTableHeader';
import ReceptionistEmergencyTableContent from './receptionistEmergency/receptionistEmergencyTableContent';

const emergencyTableHeader = [
    { name: 'Case', width: '130px' },
    { name: 'Time', width: '70px' },
    { name: 'Dept', width: '80px' }
];

const emergencyTableDummyData = [
    { case: 'Car Accident', time: '10:00 AM', dept: 'Lão - Nội' },
    { case: 'Heart Attack', time: '10:15 AM', dept: 'Lão - Nội' },
    { case: 'Broken Arm', time: '10:30 AM', dept: 'Unassigned' },
    { case: 'Severe Burn', time: '10:45 AM', dept: 'Unassigned' },
    { case: 'Stroke', time: '11:00 AM', dept: 'Lão - Ngoại' },
    { case: 'Allergic Reaction', time: '11:15 AM', dept: 'Unassigned' },
];

const ROWS_PER_PAGE_OPTIONS = [2, 4, 6]; // Define options for rows per page

function ReceptionistEmergency() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]); // Default to the first option (2)

    // Calculate counts (can be memoized if data changes frequently)
    const unassignedCount = useMemo(() =>
        emergencyTableDummyData.filter(item => item.dept === 'Unassigned').length,
        [] // Recalculate only if dummy data changes (which it doesn't here)
    );
    const assignedCount = useMemo(() =>
        emergencyTableDummyData.filter(item => item.dept !== 'Unassigned').length,
        [] // Recalculate only if dummy data changes
    );

    // Calculate total pages based on current rowsPerPage
    const totalPages = useMemo(() => {
        return Math.ceil(emergencyTableDummyData.length / rowsPerPage);
    }, [rowsPerPage]); // Recalculate when rowsPerPage changes

    // Update displayed data when page or rowsPerPage changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, emergencyTableDummyData.length);
        setDisplayData(emergencyTableDummyData.slice(startIndex, endIndex));
    }, [currentPage, rowsPerPage]); // Add rowsPerPage dependency

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

    return (
        <BoxContainer>
            <BoxContainerTitle>
                Emergency
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview - Pass calculated counts */}
                <ReceptionistEmergencyOverview
                    unassignedCount={unassignedCount}
                    assignedCount={assignedCount}
                />

                {/* Pagination - Add rows per page functionality */}
                <ReceptionistEmergencyPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS} // Pass options
                    currentRowsPerPage={rowsPerPage} // Pass current value
                    onRowsPerPageChange={handleRowsPerPageChange} // Pass handler
                />

                {/* Table header */}
                <ReceptionistEmergencyTableHeader emergencyTableHeader={emergencyTableHeader} />

                {/* Table content */}
                <ReceptionistEmergencyTableContent emergencyTableHeader={emergencyTableHeader} emergencyTableData={displayData} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistEmergency;