// import React from 'react';

// import TableContent from '../../../common/tableContent';

// import Button from '../../../common/button';
// import ButtonText from '../../../common/buttonText';

// function DoctorEventsCapturingTable({ patientEventCapturedTableHeader, patientEventCapturedTableData, onClickNoting }) {
//     const headers = patientEventCapturedTableHeader;
//     const data = patientEventCapturedTableData;

//     return (
//         <TableContent>
//             {data.length > 0 ? (
//                 data.map((row, index) => (
//                     <div key={index} className="tableContent tableContentPatientFound">
//                         <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
//                             {row.time}
//                         </div>
//                         <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
//                             {row.event}
//                         </div>
//                         <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
//                             if(row.note.length > 0) {
//                                 {row.note}
//                             ) : (
//                                 <Button className="buttonText" onClick={() => onClickNoting(row)}>
//                                     <ButtonText>Add Note</ButtonText>
//                                 </Button>
//                             )
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <div className="tableContent">
//                     <div className="tableContentCell">
//                         No data
//                     </div>
//                 </div>
//             )}
//         </TableContent>
//     );
// }

// export default DoctorEventsCapturingTable;


























import React, { useState } from 'react';

import TableContent from '../../../common/tableContent';

import Button from '../../../common/button';
import ButtonText from '../../../common/buttonText';

function DoctorEventsCapturingTable({ patientEventCapturedTableHeader, patientEventCapturedTableData, onClickNoting }) {
    const headers = patientEventCapturedTableHeader;
    const data = patientEventCapturedTableData;
    
    // State to track which row is being edited
    const [editingIndex, setEditingIndex] = useState(-1);
    // State to store the temporary note value
    const [tempNote, setTempNote] = useState('');

    // Function to handle clicking "Add Note"
    const handleAddNoteClick = (index) => {
        setEditingIndex(index);
        setTempNote('');
    };

    // Function to handle saving the note
    const handleSaveNote = (index) => {
        onClickNoting(index, tempNote);
        setEditingIndex(-1);
        setTempNote('');
    };

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div key={index} className="tableContent tableContentPatientFound">
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width }}>
                            {row.time}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width }}>
                            {row.event}
                        </div>
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width }}>
                            {editingIndex === index ? (
                                <div className="noteInputContainer" style={{ display: 'flex', alignItems: 'center' }}>
                                    <textarea 
                                        value={tempNote} 
                                        onChange={(e) => setTempNote(e.target.value)} 
                                        style={{
                                            display: 'flex',
                                            flex: 1,
                                            marginRight: '8px', 
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            minHeight: '80px',
                                            resize: 'vertical',
                                            fontFamily: 'inherit',
                                            fontSize: 'inherit',
                                            minWidth: '220px',
                                            width: '100%',
                                            maxWidth: '400px',
                                        }} 
                                        placeholder="Enter note here..."
                                    />
                                    <Button className="buttonText save" onClick={() => handleSaveNote(index)}>
                                        <ButtonText>Save</ButtonText>
                                    </Button>
                                </div>
                            ) : (
                                row.note ? row.note : (
                                    <Button className="buttonText addNote" onClick={() => handleAddNoteClick(index)}>
                                        <ButtonText>Add Note</ButtonText>
                                    </Button>
                                )
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="tableContent">
                    <div className="tableContentCell">
                        No data
                    </div>
                </div>
            )}
        </TableContent>
    );
}

export default DoctorEventsCapturingTable;