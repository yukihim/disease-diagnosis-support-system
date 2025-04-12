import React, { useState, useEffect } from 'react';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import ReceptionistAvailableDoctorPagination from './receptionistAvailableDoctor/receptionistAvailableDoctorPagination';
import ReceptionistAvailableDoctorContent from './receptionistAvailableDoctor/receptionistAvailableDoctorContent';

const doctorsTableDummyData = [
    { 
        "name": "Dr. John Doe",
        "role": "Cardiologist"
    },
    {
        "name": "Dr. Jane Doe",
        "role": "Dentist"
    },
    {
        "name": "Dr. John A",
        "role": "Cardiologist"
    },
    {
        "name": "Dr. Jane A",
        "role": "Dentist"
    },
    { 
        "name": "Dr. John V",
        "role": "Cardiologist"
    },
    {
        "name": "Dr. Jane V",
        "role": "Dentist"
    },
    {
        "name": "Dr. John B",
        "role": "Cardiologist"
    },
    {
        "name": "Dr. Jane B",
        "role": "Dentist"
    },
    { 
        "name": "Dr. John C",
        "role": "Cardiologist"
    },
    {
        "name": "Dr. Jane C",
        "role": "Dentist"
    }
];

function ReceptionistAvailableDoctor() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    
    // Pagination settings
    const ROWS_PER_PAGE = 4;
    const totalRecords = doctorsTableDummyData.length;
    const totalPages = Math.ceil(totalRecords / ROWS_PER_PAGE);

    // Update displayed data when page changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        const endIndex = Math.min(startIndex + ROWS_PER_PAGE, totalRecords);
        setDisplayData(doctorsTableDummyData.slice(startIndex, endIndex));
    }, [currentPage]);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }
    
    return (
        <BoxContainer>
            <BoxContainerTitle className="greenTitle">
                Available Doctors
            </BoxContainerTitle>
            <BoxContainerContent>
                {/* Pagination */}
                <ReceptionistAvailableDoctorPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                {/* Content */}
                <ReceptionistAvailableDoctorContent doctorsTableData={displayData} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistAvailableDoctor;
