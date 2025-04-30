import React, { useState, useEffect } from 'react'; // Import useState, useEffect
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

// Define empty prescription structure
const emptyPrescription = {
    medicine: '',
    morning: '',
    noon: '',
    afternoon: '',
    evening: '',
    duration: '',
    note: ''
};


// Accept callback prop from parent
function DoctorPrescriptionAndProcedurePrescriptionsCard({ onPrescriptionDataUpdate }) { // Added prop

    // Keep internal state management
    const [prescriptions, setPrescriptions] = useState([
        { ...emptyPrescription },
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
        // Prevent removing the last row if needed, or adjust logic
        if (prescriptions.length > 1) {
            const updatedPrescriptions = [...prescriptions];
            updatedPrescriptions.splice(index, 1);
            setPrescriptions(updatedPrescriptions);
        } else {
            // Optionally clear the last row instead of removing it
             setPrescriptions([{ ...emptyPrescription }]);
             console.log("Cannot remove the last prescription row. Cleared instead.");
        }
    };

    // Effect to call the parent's callback whenever prescriptions change
    useEffect(() => {
        if (onPrescriptionDataUpdate) {
            onPrescriptionDataUpdate(prescriptions);
        }
    }, [prescriptions, onPrescriptionDataUpdate]); // Dependency array includes prescriptions and the callback


    return (
        <BoxContainer className='doctorPrescriptionAndProcedurePrescriptionsCardBox'>
            <BoxContainerTitle className='doctorPrescriptionAndProcedurePrescriptionsCard'>
                Prescriptions

                {/* Use internal handler */}
                <Button onClick={handleAddPrescription}>
                    <ButtonText>
                        Add
                    </ButtonText>
                </Button>
            </BoxContainerTitle>

            <BoxContainerContent className='doctorPrescriptionAndProcedurePrescriptionsCardContent'>
                {/* Table Header */}
                <DoctorPrescriptionAndProcedurePrescriptionsCardHeader patientPrescriptionTableHeader={patientPrescriptionTableHeader} />

                {/* Table Content - Use internal state and handlers */}
                <DoctorPrescriptionAndProcedurePrescriptionsCardTable
                    patientPrescriptionTableHeader={patientPrescriptionTableHeader}
                    patientPrescriptionTableData={prescriptions} // Use internal state
                    onPrescriptionChange={handlePrescriptionChange} // Use internal handler
                    onRemovePrescription={handleRemovePrescription} // Use internal handler
                />
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorPrescriptionAndProcedurePrescriptionsCard;