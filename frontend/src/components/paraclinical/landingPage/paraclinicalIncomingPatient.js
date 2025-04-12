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
    { name: 'Note', width: '250px' }
];

const incomingPatientTableDummyData = [
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'Patient needs urgent care' },
    { name: 'Phuong Xuong B', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'No note' },
    { name: 'Phuong Xuong C', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'Testing blood' },
    { name: 'Phuong Xuong B', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'No note' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'No note' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'Patient needs urgent care' },
    { name: 'Phuong Xuong B', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'No note' },
    { name: 'Phuong Xuong C', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'Testing blood' },
    { name: 'Phuong Xuong B', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'No note' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'No note' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'Patient needs urgent care' },
    { name: 'Phuong Xuong B', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'No note' },
    { name: 'Phuong Xuong C', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'Testing blood' },
    { name: 'Phuong Xuong B', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'No note' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'No note' },
    { name: 'Phuong Xuong C', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'Testing blood' },
    { name: 'Phuong Xuong B', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'No note' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'R. 304', state: 'Sending for test', note: 'No note' },
];

function ParaclinicalIncomingPatient() {
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    
    // Pagination settings
    const ROWS_PER_PAGE = 15;
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
        let pathnameUrl='/paraclinical/paraclinical_patient_test';

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
        <BoxContainer className='bigBoxForParaclinic'>
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
                <IncomingPatientTableContent incomingPatientTableHeader={incomingPatientTableHeader} incomingPatientTableData={displayData} onClickIncomingPatient={onClickIncomingPatient} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ParaclinicalIncomingPatient;