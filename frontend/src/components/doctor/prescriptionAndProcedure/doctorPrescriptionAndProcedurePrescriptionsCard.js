import React, { useState } from 'react';
import './style/doctorPrescriptionAndProcedurePrescriptionsCard.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import Button from '../../common/button';
import ButtonText from '../../common/buttonText';

import DoctorPrescriptionAndProcedurePrescriptionsCardHeader from './doctorPrescriptionAndProcedurePrescriptionsCard/doctorPrescriptionAndProcedurePrescriptionsCardHeader';
import DoctorPrescriptionAndProcedurePrescriptionsCardTable from './doctorPrescriptionAndProcedurePrescriptionsCard/doctorPrescriptionAndProcedurePrescriptionsCardTable';

const patientPrescriptionTableHeader = [
    { name: 'Medicine', width: '190px' },
    { name: 'Morning', width: '85px' },
    { name: 'Noon', width: '85px' },
    { name: 'Afternoon', width: '85px' },
    { name: 'Evening', width: '85px' },
    { name: 'Duration', width: '120px' },
    { name: 'Note', width: '500px' }
];

// Empty prescription row template
const emptyPrescription = {
    medicine: '',
    morning: '',
    noon: '',
    afternoon: '',
    evening: '',
    duration: '',
    note: ''
};

function DoctorPrescriptionAndProcedurePrescriptionsCard() {
    // State to track prescriptions
    const [prescriptions, setPrescriptions] = useState([
        { ...emptyPrescription }, // Start with three empty rows
        { ...emptyPrescription },
        { ...emptyPrescription }
    ]);

    // Function to add a new prescription row
    const handleAddPrescription = () => {
        setPrescriptions([...prescriptions, { ...emptyPrescription }]);
    };

    // Function to update a prescription row
    const handlePrescriptionChange = (index, field, value) => {
        const updatedPrescriptions = [...prescriptions];
        updatedPrescriptions[index][field] = value;
        setPrescriptions(updatedPrescriptions);
    };

    // Function to remove a prescription row
    const handleRemovePrescription = (index) => {
        const updatedPrescriptions = [...prescriptions];
        updatedPrescriptions.splice(index, 1);
        setPrescriptions(updatedPrescriptions);
    };

    return (
        <BoxContainer className='doctorPrescriptionAndProcedurePrescriptionsCardBox'>
            <BoxContainerTitle className='doctorPrescriptionAndProcedurePrescriptionsCard'>
                Prescriptions

                <Button onClick={handleAddPrescription}>
                    <ButtonText>
                        Add
                    </ButtonText>
                </Button>
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPrescriptionAndProcedurePrescriptionsCardContent'>
                {/* Table Header */}
                <DoctorPrescriptionAndProcedurePrescriptionsCardHeader patientPrescriptionTableHeader={patientPrescriptionTableHeader} />

                {/* Table Content */}
                <DoctorPrescriptionAndProcedurePrescriptionsCardTable 
                    patientPrescriptionTableHeader={patientPrescriptionTableHeader} 
                    patientPrescriptionTableData={prescriptions}
                    onPrescriptionChange={handlePrescriptionChange}
                    onRemovePrescription={handleRemovePrescription}
                />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPrescriptionAndProcedurePrescriptionsCard;