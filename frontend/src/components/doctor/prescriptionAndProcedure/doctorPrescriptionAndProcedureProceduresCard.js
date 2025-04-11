import React, { useState } from 'react';
import './style/doctorPrescriptionAndProcedureProceduresCard.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';

import Button from '../../common/button';
import ButtonText from '../../common/buttonText';

import DoctorPrescriptionAndProcedureProceduresCardHeader from './doctorPrescriptionAndProcedureProceduresCard/doctorPrescriptionAndProcedureProceduresCardHeader';
import DoctorPrescriptionAndProcedureProceduresCardTable from './doctorPrescriptionAndProcedureProceduresCard/doctorPrescriptionAndProcedureProceduresCardTable';

const patientProcedureTableHeader = [
    { name: 'Procedure', width: '400px' },
    { name: 'Date/Time', width: '250px' },
    { name: 'Note', width: '500px' }
];

// Empty prescription row template
const emptyProcedure = {
    procedure: '',
    datetime: '',
};

function DoctorPrescriptionAndProcedureProceduresCard() {
    // State to track prescriptions
    const [procedures, setProcedures] = useState([
        { ...emptyProcedure } // Start with one empty row
    ]);

    // Function to add a new prescription row
    const handleAddProcedure = () => {
        setProcedures([...procedures, { ...emptyProcedure }]);
    };

    // Function to update a prescription row
    const handleProcedureChange = (index, field, value) => {
        const updatedProcedures = [...procedures];
        updatedProcedures[index][field] = value;
        setProcedures(updatedProcedures);
    };

    // Function to remove a prescription row
    const handleRemoveProcedure = (index) => {
        const updatedProcedures = [...procedures];
        updatedProcedures.splice(index, 1);
        setProcedures(updatedProcedures);
    };
    
    return (
        <BoxContainer className='doctorPrescriptionAndProcedureProceduresCardBox'>
            <BoxContainerTitle className='doctorPrescriptionAndProcedureProceduresCard'>
                Procedures

                <Button className='doctorPrescriptionAndProcedureProceduresCardAddButton' onClick={handleAddProcedure}>
                    <ButtonText className='doctorPrescriptionAndProcedureProceduresCardAddButtonText'>
                        Add
                    </ButtonText>
                </Button>
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPrescriptionAndProcedureProceduresCardContent'>
                {/* Table Header */}
                <DoctorPrescriptionAndProcedureProceduresCardHeader patientProcedureTableHeader={patientProcedureTableHeader} />

                {/* Table Content */}
                <DoctorPrescriptionAndProcedureProceduresCardTable 
                    patientPrescriptionTableHeader={patientProcedureTableHeader} 
                    patientPrescriptionTableData={procedures}
                    onPrescriptionChange={handleProcedureChange}
                    onRemovePrescription={handleRemoveProcedure}
                />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPrescriptionAndProcedureProceduresCard;