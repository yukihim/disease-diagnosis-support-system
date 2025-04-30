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
        // Initialize tempNote with existing note if available, otherwise empty string
        setTempNote(data[index]?.note || '');
    };

    // Function to handle saving the note
    const handleSaveNote = (index) => {
        const eventID = data[index]?.eventID; // Get the eventID for the row
        if (eventID) {
            // *** Pass eventID along with index and note ***
            onClickNoting(index, tempNote, eventID);
        } else {
            console.error("Cannot save note: eventID is missing for index", index);
            // Optionally show an error to the user
        }
        setEditingIndex(-1); // Exit editing mode regardless of success/failure for now
        setTempNote('');
    };

    return (
        <TableContent>
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div key={index} className="tableContent tableContentPatientFound">
                        {/* Time Cell */}
                        <div className="tableContentCell" style={{ width: headers[0].width, minWidth: headers[0].width, display: "flex", alignItems: 'center' }}>
                            {row.time}
                        </div>
                        {/* Event Cell */}
                        <div className="tableContentCell" style={{ width: headers[1].width, minWidth: headers[1].width, display: "flex", alignItems: 'center' }}>
                            {row.event}
                        </div>
                        {/* Note Cell */}
                        <div className="tableContentCell" style={{ width: headers[2].width, minWidth: headers[2].width, display: "flex", alignItems: 'center' }}>
                            {editingIndex === index ? (
                                <div className="noteInputContainer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
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
                                // Display existing note or "Add Note" button
                                row.note ? (
                                    // Allow editing existing notes
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                        <span style={{ flexGrow: 1, marginRight: '8px', whiteSpace: 'pre-wrap' }}>{row.note}</span>
                                        <Button className="buttonText editNote" onClick={() => handleAddNoteClick(index)}>
                                            <ButtonText>Edit</ButtonText>
                                        </Button>
                                    </div>
                                ) : (
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
                    <div className="tableContentCell" style={{ textAlign: 'center', width: '100%' }}>
                        No events recorded.
                    </div>
                </div>
            )}
        </TableContent>
    );
}

export default DoctorEventsCapturingTable;