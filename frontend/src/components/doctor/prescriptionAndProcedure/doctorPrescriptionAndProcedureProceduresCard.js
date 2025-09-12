import { useState, useEffect, useCallback } from 'react';
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

// Empty procedure row template - Updated with procedureId and procedureName
const emptyProcedure = {
    procedureId: '',
    procedureName: '',
    procedure: '', // Keep for backward compatibility
    datetime: '',
    note: ''
};

// Accept callback prop from parent
function DoctorPrescriptionAndProcedureProceduresCard({ onProcedureDataUpdate }) { // Added prop
    // State to track procedures
    const [procedures, setProcedures] = useState([
        { ...emptyProcedure } // Start with one empty row
    ]);

    // Function to add a new procedure row - wrapped in useCallback to prevent infinite loops
    const handleAddProcedure = useCallback(() => {
        setProcedures(prevProcedures => [...prevProcedures, { ...emptyProcedure }]);
    }, []);

    // Function to update a procedure row
    const handleProcedureChange = (index, field, value) => {
        const updatedProcedures = [...procedures];
        updatedProcedures[index][field] = value;
        
        // If procedureId changes, also update the procedure field for backward compatibility
        if (field === 'procedureId') {
            updatedProcedures[index].procedure = value;
        }
        
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

    // Add event listener for adding a new procedure via Enter/Tab key
    useEffect(() => {
        const handleProcedureAddEvent = () => {
            handleAddProcedure();
        };
        
        // Add event listener
        document.addEventListener('onProcedureAdd', handleProcedureAddEvent);
        
        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener('onProcedureAdd', handleProcedureAddEvent);
        };
    }, [handleAddProcedure]); // Only depend on the stable callback

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