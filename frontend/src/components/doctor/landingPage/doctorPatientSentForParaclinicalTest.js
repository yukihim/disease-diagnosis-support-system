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
    { name: 'Name', width: '130px' },
    { name: 'Test', width: '150px' }
];

const patientSentForParaclinicalTestTableDummyData = [
    { name: 'Phuong Xuong Thinh', test: 'Blood Test' },
    { name: 'Phuong Xuong Thinh', test: 'Blood Test' },
    { name: 'Phuong Xuong Thinh', test: 'Blood Test' },
    { name: 'Phuong Xuong Thinh', test: 'Blood Test' },
    { name: 'Phuong Xuong Thinh', test: 'Blood Test' },
];

function DoctorPatientSentForParaclinicalTest() {
    const history = useHistory();

    const patientSentForParaclinicalTestCount = 12;

    function onClickPatientSentForParaclinicalTest(patient) {
        // Navigate to the next page with patient information
        history.push({
            pathname: '/receptionist/patient_checkin',
            state: { 
                patientSSN: patient.name,
                patientHealthInsuranceCode: patient.test
            }
        });
    }

    return (
        <BoxContainer>
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