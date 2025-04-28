import React, { useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
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

const ROWS_PER_PAGE_OPTIONS = [2, 4, 6];

function ReceptionistEmergency() {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);
    const [emergencyData, setEmergencyData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmergencyData = async () => {
            setIsLoading(true);
            setError(null);
            const token = Cookies.get('token');

            if (!token) {
                setError("User not authenticated.");
                setIsLoading(false);
                setEmergencyData([]);
                return;
            }

            try {
                // Corrected API endpoint based on routes.py
                const apiUrl = 'http://localhost:5001/receptionist/landing_page/emergency';
                console.log("Fetching emergency data from:", apiUrl);

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Response Data (Emergency):", data);

                setEmergencyData(data.emergencyCases || []);

            } catch (err) {
                console.error("Error fetching emergency data:", err);
                setError(err.message || "Failed to fetch emergency cases.");
                setEmergencyData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmergencyData();
    }, []);

    const unassignedCount = useMemo(() =>
        emergencyData.filter(item => item.dept === 'Unassigned').length,
        [emergencyData]
    );
    const assignedCount = useMemo(() =>
        emergencyData.filter(item => item.dept !== 'Unassigned').length,
        [emergencyData]
    );

    const totalPages = useMemo(() => {
        return Math.ceil(emergencyData.length / rowsPerPage);
    }, [emergencyData, rowsPerPage]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, emergencyData.length);
        setDisplayData(emergencyData.slice(startIndex, endIndex));
    }, [currentPage, rowsPerPage, emergencyData]);

    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage]);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    function handleRowsPerPageChange(newRowsPerPage) {
        setRowsPerPage(newRowsPerPage);
    }

    return (
        <BoxContainer>
            <BoxContainerTitle>
                Emergency
            </BoxContainerTitle>

            <BoxContainerContent>
                <ReceptionistEmergencyOverview
                    unassignedCount={unassignedCount}
                    assignedCount={assignedCount}
                />

                <ReceptionistEmergencyPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    currentRowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />

                <ReceptionistEmergencyTableHeader emergencyTableHeader={emergencyTableHeader} />

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading emergency cases...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    <ReceptionistEmergencyTableContent
                        emergencyTableHeader={emergencyTableHeader}
                        emergencyTableData={displayData}
                    />
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ReceptionistEmergency;