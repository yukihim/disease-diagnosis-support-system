import React from 'react';
import { useHistory } from 'react-router-dom';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import DoctorInpatientMonitoringOverview from './doctorMonitoringInpatient/doctorInpatientMonitoringOverview';
import DoctorInpatientMonitoringPagination from './doctorMonitoringInpatient/doctorInpatientMonitoringPagination';
import DoctorInpatientMonitoringTableHeader from './doctorMonitoringInpatient/doctorInpatientMonitoringTableHeader';
import DoctorInpatientMonitoringTableContent from './doctorMonitoringInpatient/doctorInpatientMonitoringTableContent';

const inpatientMonitoringTableHeader = [
    { name: 'Name', width: '130px' },
    { name: 'Sex', width: '50px' },
    { name: 'Age', width: '30px' },
    { name: 'Room', width: '130px' },
    { name: 'Admission Date', width: '130px' },
    { name: 'Condition', width: '100px' },
    { name: 'Status', width: '70px' }
];

const inpatientMonitoringTableDummyData = [
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
    { name: 'Phuong Xuong Thinh', sex: 'Male', age: '22', room: 'Room C4-305', admissionDate: '16/12/2024', condition: 'Heart Surgery', status: 'Normal' },
];

function DoctorInpatientMonitoring({ userRole }) {
    const history = useHistory();

    const inpatientMonitoringCount = 12;

    function onClickInpatientMonitoring(patient) {
        // Navigate to the next page with patient information
        history.push({
            pathname: '/doctor/inpatient_monitoring',
            state: { 
                patientName: patient.name,
                userRole: userRole,
            }
        });
    }

    return (
        <BoxContainer className='bigBox'>
            {/* Design emergency component here */}
            <BoxContainerTitle>
                Inpatient Monitoring
            </BoxContainerTitle>

            <BoxContainerContent>
                {/* Overview */}
                <DoctorInpatientMonitoringOverview inpatientMonitoringCount={inpatientMonitoringCount} />

                {/* Pagination */}
                <DoctorInpatientMonitoringPagination />

                {/* Table header */}
                <DoctorInpatientMonitoringTableHeader inpatientMonitoringTableHeader={inpatientMonitoringTableHeader} />

                {/* Table content */}
                <DoctorInpatientMonitoringTableContent inpatientMonitoringTableHeader={inpatientMonitoringTableHeader} inpatientMonitoringTableData={inpatientMonitoringTableDummyData} onClickInpatientMonitoring={onClickInpatientMonitoring} />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorInpatientMonitoring;