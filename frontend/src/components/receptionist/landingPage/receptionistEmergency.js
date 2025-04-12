import React, { useState, useEffect } from 'react';

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
    { case: 'Car Accident', time: '10:00 AM', dept: 'Lão - Nội' },
    { case: 'Car Accident', time: '10:00 AM', dept: 'Unassigned' },
    { case: 'Car Accident', time: '10:00 AM', dept: 'Unassigned' },
    { case: 'Car Accident', time: '10:00 AM', dept: 'Unassigned' },
    { case: 'Car Accident', time: '10:00 AM', dept: 'Unassigned' },
];

function ReceptionistEmergency() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    
    // Pagination settings
    const ROWS_PER_PAGE = 2;
    const totalRecords = emergencyTableDummyData.length;
    const totalPages = Math.ceil(totalRecords / ROWS_PER_PAGE);

    // Update displayed data when page changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        const endIndex = Math.min(startIndex + ROWS_PER_PAGE, totalRecords);
        setDisplayData(emergencyTableDummyData.slice(startIndex, endIndex));
    }, [currentPage]);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }
    
    return (
        <BoxContainer>
            {/* Design emergency component here */}
            <BoxContainerTitle>
                Emergency
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <ReceptionistEmergencyOverview />

                {/* Pagination */}
                <ReceptionistEmergencyPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
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