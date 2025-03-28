import React from 'react';
import { useHistory } from 'react-router-dom';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorIncomingPatientOverview from './doctorIncomingPatient/doctorIncomingPatientOverview';
import DoctorIncomingPatientPagination from './doctorIncomingPatient/doctorIncomingPatientPagination';
import DoctorIncomingPatientTableHeader from './doctorIncomingPatient/doctorIncomingPatientTableHeader';
import DoctorIncomingPatientTableContent from './doctorIncomingPatient/doctorIncomingPatientTableContent';

const incomingPatientTableHeader = [
    { name: 'Name', width: '130px' },
    { name: 'Sex', width: '50px' },
    { name: 'Age', width: '30px' },
    { name: 'From', width: '100px' }
];

const incomingPatientTableDummyData = [
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'Front Desk' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'Paraclinic' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'Paraclinic' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'Front Desk' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', from: 'Front Desk' },
];

function DoctorIncomingPatient() {
    const history = useHistory();

    const incomingPatientCount = 12;

    function onClickIncomingPatient(patient) {
        // Navigate to the next page with patient information
        history.push({
            pathname: '/receptionist/patient_checkin',
            state: { 
                patientSSN: patient.ssn,
                patientHealthInsuranceCode: patient.healthInsuranceCode,
                patientName: patient.patientName
            }
        });
    }

    return (
        <BoxContainer>
            {/* Design emergency component here */}
            <BoxContainerTitle>
                Incoming Patient
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <DoctorIncomingPatientOverview incomingPatientCount={incomingPatientCount} />

                {/* Pagination */}
                <DoctorIncomingPatientPagination />

                {/* Table header */}
                <DoctorIncomingPatientTableHeader incomingPatientTableHeader={incomingPatientTableHeader} />

                {/* Table content */}
                <DoctorIncomingPatientTableContent incomingPatientTableHeader={incomingPatientTableHeader} incomingPatientTableData={incomingPatientTableDummyData} onClickIncomingPatient={onClickIncomingPatient} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorIncomingPatient;