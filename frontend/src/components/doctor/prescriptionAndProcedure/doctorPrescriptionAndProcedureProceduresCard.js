import React, { useState, useEffect } from 'react'; // Import useEffect
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
    { name: 'Note', width: '500px' } // Ensure Note header exists if needed
];

// Empty procedure row template - Added note
const emptyProcedure = {
    procedure: '',
    datetime: '',
    note: '' // Added note field
};

// Accept callback prop from parent
function DoctorPrescriptionAndProcedureProceduresCard({ onProcedureDataUpdate }) { // Added prop
    // State to track procedures
    const [procedures, setProcedures] = useState([
        { ...emptyProcedure } // Start with one empty row
    ]);

    // Function to add a new procedure row
    const handleAddProcedure = () => {
        setProcedures([...procedures, { ...emptyProcedure }]);
    };

    // Function to update a procedure row
    const handleProcedureChange = (index, field, value) => {
        const updatedProcedures = [...procedures];
        updatedProcedures[index][field] = value;
        setProcedures(updatedProcedures);
    };

    // Function to remove a procedure row
    const handleRemoveProcedure = (index) => {
        // Prevent removing the last row if needed
        if (procedures.length > 1) {
            const updatedProcedures = [...procedures];
            updatedProcedures.splice(index, 1);
            setProcedures(updatedProcedures);
        } else {
            // Optionally clear the last row instead of removing it
            setProcedures([{ ...emptyProcedure }]);
            console.log("Cannot remove the last procedure row. Cleared instead.");
        }
    };

    // Effect to call the parent's callback whenever procedures change
    useEffect(() => {
        if (onProcedureDataUpdate) {
            onProcedureDataUpdate(procedures);
        }
    }, [procedures, onProcedureDataUpdate]); // Dependency array includes procedures and the callback

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

                {/* Table Content - Use internal state and handlers */}
                <DoctorPrescriptionAndProcedureProceduresCardTable
                    patientPrescriptionTableHeader={patientProcedureTableHeader}
                    patientPrescriptionTableData={procedures} // Use internal state
                    onPrescriptionChange={handleProcedureChange} // Use internal handler (renamed for clarity below)
                    onRemovePrescription={handleRemoveProcedure} // Use internal handler
                />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPrescriptionAndProcedureProceduresCard;