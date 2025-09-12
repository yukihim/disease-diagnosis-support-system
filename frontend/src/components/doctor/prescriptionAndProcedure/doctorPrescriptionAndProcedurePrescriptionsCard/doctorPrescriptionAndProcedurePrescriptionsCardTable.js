import React, { useState, useEffect } from 'react';
import './style/doctorPrescriptionAndProcedurePrescriptionsCardTable.css';

import TableContent from '../../../common/tableContent';
import AutocompleteInput from '../../../common/autocompleteInput';
import API_BASE_URL from '../../../../config';
import Cookies from 'js-cookie';
function DoctorPrescriptionAndProcedurePrescriptionsCardTable({ 
    patientPrescriptionTableHeader, 
    patientPrescriptionTableData,
    onPrescriptionChange,
    onRemovePrescription
}) {
    const headers = patientPrescriptionTableHeader;
    const data = patientPrescriptionTableData;
    const [medicinesList, setMedicinesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Fetch medicines list when component mounts
    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${API_BASE_URL}/doctor/prescription_and_procedure/get_medicine_name`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("data", data);
                setMedicinesList(data);
            } catch (error) {
                console.error("Error fetching medicines:", error);
                // Fallback to empty list or mock data if needed
                setMedicinesList([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMedicines();
    }, []);
    
    // Handle key down in note field to add new prescription line
    const handleNoteKeyDown = (e, rowIndex) => {
        // Check if this is the last row
        const isLastRow = rowIndex === data.length - 1;
        
        // If Enter key is pressed, add a new row
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default behavior
            triggerAddPrescription();
        }
        // If Tab key is pressed on the last field of the last row and not holding Shift
        else if (e.key === 'Tab' && !e.shiftKey && isLastRow) {
            e.preventDefault(); // Prevent default tab behavior
            triggerAddPrescription();
        }
    };
    
    // Helper function to trigger add prescription event
    const triggerAddPrescription = () => {
        const onPrescriptionAddEvent = new CustomEvent('onPrescriptionAdd');
        document.dispatchEvent(onPrescriptionAddEvent);
    };

    // Handle selection of a medicine
    const handleMedicineSelect = (medicine, rowIndex) => {
        // Store the medicine name for reference
        onPrescriptionChange(rowIndex, 'medicineName', medicine.name);
        
        // Log the selection for debugging purposes
        console.log("Selected medicine:", medicine);
    };

    return (
        <TableContent>
            {isLoading ? (
                <div className="tableContent">
                    <div className="tableContentCell">
                        Loading medicines...
                    </div>
                </div>
            ) : data.length > 0 ? (
                data.map((row, rowIndex) => (
                    <div key={rowIndex} className="tableContent prescriptionRow">
                        <div className="tableContentCellNoPadding" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            <AutocompleteInput
                                value={row.medicineId}
                                onChange={(value) => onPrescriptionChange(rowIndex, 'medicineId', value)}
                                onSelectItem={(item) => handleMedicineSelect(item, rowIndex)}
                                suggestions={medicinesList}
                                placeholder="(e.g. Paracetamol 500 mg)"
                                className="prescriptionInput"
                                displayProperty="name"
                                valueProperty="id"
                                isObjectData={true}
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            <input
                                type="text"
                                value={row.morning}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'morning', e.target.value)}
                                placeholder="(e.g. 1)"
                                className="prescriptionInput"
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            <input
                                type="text"
                                value={row.noon}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'noon', e.target.value)}
                                placeholder="(e.g. 1)"
                                className="prescriptionInput"
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[3].width, minWidth: headers[3].width }}>
                            <input
                                type="text"
                                value={row.afternoon}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'afternoon', e.target.value)}
                                placeholder="(e.g. 1)"
                                className="prescriptionInput"
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[4].width, minWidth: headers[4].width }}>
                            <input
                                type="text"
                                value={row.evening}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'evening', e.target.value)}
                                placeholder="(e.g. 1)"
                                className="prescriptionInput"
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[5].width, minWidth: headers[5].width }}>
                            <input
                                type="text"
                                value={row.duration}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'duration', e.target.value)}
                                placeholder="(e.g. 5 days)"
                                className="prescriptionInput"
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[6].width, minWidth: headers[6].width }}>
                            <input
                                type="text"
                                value={row.note}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'note', e.target.value)}
                                onKeyDown={(e) => handleNoteKeyDown(e, rowIndex)}
                                placeholder="(e.g. Take with food)"
                                className="prescriptionInput"
                            />
                        </div>
                        {/* <div className="tableContentCell removeCell">
                            {data.length > 1 && (
                                <button 
                                    className="removeButton" 
                                    onClick={() => onRemovePrescription(rowIndex)}
                                    title="Remove this prescription"
                                >
                                    ×
                                </button>
                            )}
                        </div> */}
                        {/* Modify just the remove cell part */}
                        <div className="tableContentCellNoPadding removeCell" style={{ width: '30px', minWidth: '30px' }}>
                            {data.length > 1 && (
                                <button 
                                    className="removeButton" 
                                    onClick={() => onRemovePrescription(rowIndex)}
                                    title="Remove this prescription"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="tableContent">
                    <div className="tableContentCell">
                        No prescriptions added yet
                    </div>
                </div>
            )}
        </TableContent>
    );
}

export default DoctorPrescriptionAndProcedurePrescriptionsCardTable;