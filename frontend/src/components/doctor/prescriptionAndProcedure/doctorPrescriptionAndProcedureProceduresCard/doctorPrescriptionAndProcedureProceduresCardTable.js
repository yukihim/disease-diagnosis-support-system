import React, { useState, useEffect } from 'react';
import './style/doctorPrescriptionAndProcedureProceduresCardTable.css';

import TableContent from '../../../common/tableContent';
import AutocompleteInput from '../../../common/autocompleteInput';
import API_BASE_URL from '../../../../config';
import Cookies from 'js-cookie';

function DoctorPrescriptionAndProcedureProceduresCardTable({ 
    patientPrescriptionTableHeader, 
    patientPrescriptionTableData,
    onPrescriptionChange,
    onRemovePrescription
}) {
    const headers = patientPrescriptionTableHeader;
    const data = patientPrescriptionTableData;
    const [proceduresList, setProceduresList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Fetch procedures list when component mounts
    useEffect(() => {
        const fetchProcedures = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${API_BASE_URL}/doctor/prescription_and_procedure/get_procedure_name`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log("procedures data", data);
                setProceduresList(data);
            } catch (error) {
                console.error("Error fetching procedures:", error);
                // Fallback to empty list or mock data if API is not available
                setProceduresList([
                    { id: "p001", name: "Nasal Irrigation" },
                    { id: "p002", name: "X-Ray" },
                    { id: "p003", name: "Blood Test" },
                    { id: "p004", name: "MRI Scan" },
                    { id: "p005", name: "CT Scan" },
                    { id: "p006", name: "Ultrasound" },
                    { id: "p007", name: "ECG" },
                    { id: "p008", name: "Colonoscopy" },
                    { id: "p009", name: "Endoscopy" },
                    { id: "p010", name: "Physical Therapy" }
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProcedures();
    }, []);
    
    // Handle key down in note field to add new procedure line
    const handleNoteKeyDown = (e, rowIndex) => {
        // Check if this is the last row
        const isLastRow = rowIndex === data.length - 1;
        
        // If Enter key is pressed, add a new row
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default behavior
            triggerAddProcedure();
        }
        // If Tab key is pressed on the last field of the last row and not holding Shift
        else if (e.key === 'Tab' && !e.shiftKey && isLastRow) {
            e.preventDefault(); // Prevent default tab behavior
            triggerAddProcedure();
        }
    };
    
    // Helper function to trigger add procedure event
    const triggerAddProcedure = () => {
        const onProcedureAddEvent = new CustomEvent('onProcedureAdd');
        document.dispatchEvent(onProcedureAddEvent);
    };

    // Handle selection of a procedure
    const handleProcedureSelect = (procedure, rowIndex) => {
        // Store the procedure name for reference
        onPrescriptionChange(rowIndex, 'procedureName', procedure.name);
        
        // Log the selection for debugging purposes
        console.log("Selected procedure:", procedure);
    };

    return (
        <TableContent>
            {isLoading ? (
                <div className="tableContent">
                    <div className="tableContentCell">
                        Loading procedures...
                    </div>
                </div>
            ) : data.length > 0 ? (
                data.map((row, rowIndex) => (
                    <div key={rowIndex} className="tableContent prescriptionRow">
                        <div className="tableContentCellNoPadding" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            <AutocompleteInput
                                value={row.procedureId}
                                onChange={(value) => onPrescriptionChange(rowIndex, 'procedureId', value)}
                                onSelectItem={(item) => handleProcedureSelect(item, rowIndex)}
                                suggestions={proceduresList}
                                placeholder="(e.g. Nasal Irrigation)"
                                className="prescriptionInput"
                                displayProperty="name"
                                valueProperty="id"
                                isObjectData={true}
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            <input
                                type="text"
                                value={row.datetime}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'datetime', e.target.value)}
                                placeholder="(e.g. 12/13/2024, 08:30 AM)"
                                className="prescriptionInput"
                            />
                        </div>
                        <div className="tableContentCellNoPadding" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            <input
                                type="text"
                                value={row.note}
                                onChange={(e) => onPrescriptionChange(rowIndex, 'note', e.target.value)}
                                onKeyDown={(e) => handleNoteKeyDown(e, rowIndex)}
                                placeholder="(e.g. Patient is allergic to penicillin)"
                                className="prescriptionInput"
                            />
                        </div>
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
                        No procedures added yet
                    </div>
                </div>
            )}
        </TableContent>
    );
}

export default DoctorPrescriptionAndProcedureProceduresCardTable;