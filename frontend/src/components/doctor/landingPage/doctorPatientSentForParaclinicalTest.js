import React from 'react';
import { useHistory } from 'react-router-dom';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorPatientSentForParaclinicalTestOverview from './doctorPatientSentForParaclinicalTest/doctorPatientSentForParaclinicalTestOverview';
import DoctorPatientSentForParaclinicalTestPagination from './doctorPatientSentForParaclinicalTest/doctorPatientSentForParaclinicalTestPagination';
import DoctorPatientSentForParaclinicalTestTableHeader from './doctorPatientSentForParaclinicalTest/doctorPatientSentForParaclinicalTestTableHeader';
import DoctorPatientSentForParaclinicalTestTableContent from './doctorPatientSentForParaclinicalTest/doctorPatientSentForParaclinicalTestTableContent';

const patientSentForParaclinicalTestTableHeader = [
    { name: 'Name', width: '150px' },
    { name: 'Test', width: '100px' },
    { name: 'State', width: '150px' }
];

const patientSentForParaclinicalTestTableDummyData = [
    { name: 'Phuong Xuong Thinh', test: 'Blood Test', state: 'Waiting for result' },
    { name: 'Phuong Xuong Thinh', test: 'Blood Test', state: 'On-going' },
    { name: 'Phuong Xuong Thinh', test: 'Blood Test', state: 'On-going' },
    { name: 'Phuong Xuong Thinh', test: 'Blood Test', state: 'Waiting for test' },
    { name: 'Phuong Xuong Thinh', test: 'Blood Test', state: 'Waiting for test' },
];

function DoctorPatientSentForParaclinicalTest() {
    const history = useHistory();

    const patientSentForParaclinicalTestCount = 12;

    function onClickPatientSentForParaclinicalTest(patient) {
        // Navigate to the next page with patient information
        // history.push({
        //     pathname: '/receptionist/patient_checkin',
        //     state: { 
        //         patientSSN: patient.name,
        //         patientHealthInsuranceCode: patient.test
        //     }
        // });
    }

    return (
        <BoxContainer className='bigBox'>
            {/* Design emergency component here */}
            <BoxContainerTitle>
                Patient Sent For Paraclinical Test
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <DoctorPatientSentForParaclinicalTestOverview patientSentForParaclinicalTestCount={patientSentForParaclinicalTestCount} />

                {/* Pagination */}
                <DoctorPatientSentForParaclinicalTestPagination />

                {/* Table header */}
                <DoctorPatientSentForParaclinicalTestTableHeader patientSentForParaclinicalTestTableHeader={patientSentForParaclinicalTestTableHeader} />

                {/* Table content */}
                <DoctorPatientSentForParaclinicalTestTableContent patientSentForParaclinicalTestTableHeader={patientSentForParaclinicalTestTableHeader} patientSentForParaclinicalTestTableData={patientSentForParaclinicalTestTableDummyData} onClickPatientSentForParaclinicalTest={onClickPatientSentForParaclinicalTest} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPatientSentForParaclinicalTest;