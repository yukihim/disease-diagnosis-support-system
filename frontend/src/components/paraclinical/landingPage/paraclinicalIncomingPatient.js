import React from 'react';
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
];

function ParaclinicalIncomingPatient() {
    const history = useHistory();

    const incomingPatientCount = 12;

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
                <IncomingPatientOverview incomingPatientCount={incomingPatientCount} />

                {/* Pagination */}
                <IncomingPatientPagination />

                {/* Table header */}
                <IncomingPatientTableHeader incomingPatientTableHeader={incomingPatientTableHeader} />

                {/* Table content */}
                <IncomingPatientTableContent incomingPatientTableHeader={incomingPatientTableHeader} incomingPatientTableData={incomingPatientTableDummyData} onClickIncomingPatient={onClickIncomingPatient} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default ParaclinicalIncomingPatient;