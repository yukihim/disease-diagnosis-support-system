import React, { useState, useEffect, useCallback, useMemo } from 'react'; // Import useMemo
import Cookies from 'js-cookie';
import './style/doctorEventsCapturing.css';

import BoxContainer from '../../common/boxContainer';
import BoxContainerTitle from '../../common/boxContainerTitle';
import BoxContainerContent from '../../common/boxContainerContent';
import Button from '../../common/button'; // Import Button
import ButtonText from '../../common/buttonText'; // Import ButtonText

import DoctorEventsCapturingPagination from './doctorEventsCapturing/doctorEventsCapturingPagination';
import DoctorEventsCapturingHeader from './doctorEventsCapturing/doctorEventsCapturingHeader';
import DoctorEventsCapturingTable from './doctorEventsCapturing/doctorEventsCapturingTable';

const patientEventCapturedTableHeader = [
    { name: 'Time', width: '200px' },
    { name: 'Event', width: '200px' },
    { name: 'Note', width: '600px' }
];

// Define rows per page options
const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];

function DoctorEventsCapturing({ inpatientID }) {
    const [eventData, setEventData] = useState([]); // State for ALL fetched event data
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSavingNote, setIsSavingNote] = useState(false);
    const [saveNoteError, setSaveNoteError] = useState(null);
    const [isAddingEvent, setIsAddingEvent] = useState(false); // State for adding event loading
    const [addEventError, setAddEventError] = useState(null); // State for adding event error

    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]); // Default to first option

    const fetchEvents = useCallback(async () => {
        // ...existing code...
        if (!inpatientID) {
            setError("Inpatient ID not provided.");
            return;
        }
        setIsLoading(true);
        setError(null);
        // setEventData([]); // Don't clear data before fetch

        const token = Cookies.get('token');
        if (!token) {
            setError("Authentication token not found.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5001/doctor/inpatient_monitoring/event_list/${inpatientID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                if (response.status === 404) {
                     setError(`Inpatient with ID '${inpatientID}' not found or has no events.`);
                     setEventData([]);
                } else {
                    throw new Error(errorData.message || `Failed to fetch events: ${response.statusText}`);
                }
            } else {
                const data = await response.json();
                // Sort events by time (descending - newest first) before setting state
                const sortedEvents = (data.events || []).sort((a, b) => new Date(b.time) - new Date(a.time));
                const formattedData = sortedEvents.map(event => ({
                    eventID: event.eventID,
                    time: new Date(event.time).toLocaleString(), // Format time nicely
                    event: event.name,
                    note: event.note
                }));
                setEventData(formattedData);
                setError(null); // Clear fetch error on success
            }
        } catch (err) {
            console.error("Error fetching inpatient events:", err);
            setError(err.message || "An unexpected error occurred fetching events.");
            setEventData([]);
        } finally {
            setIsLoading(false);
        }
    }, [inpatientID]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // --- Pagination Calculations ---
    const totalRecords = eventData.length;
    const totalPages = useMemo(() => {
        return Math.ceil(totalRecords / rowsPerPage);
    }, [totalRecords, rowsPerPage]);

    // Calculate data to display on the current page
    const displayData = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalRecords);
        return eventData.slice(startIndex, endIndex);
    }, [currentPage, rowsPerPage, eventData, totalRecords]);

    // Reset to page 1 when rowsPerPage changes or data reloads
    useEffect(() => {
        setCurrentPage(1);
    }, [rowsPerPage, inpatientID]); // Reset if inpatient changes too

    // --- Pagination Handlers ---
    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }

    function handleRowsPerPageChange(newRowsPerPage) {
        setRowsPerPage(newRowsPerPage);
        // setCurrentPage(1) is handled by the useEffect hook above
    }

    // --- onClickNoting (API call) ---
    const onClickNoting = async (indexInDisplayData, note, eventID) => {
        // Find the original index in the full eventData array
        const originalIndex = ((currentPage - 1) * rowsPerPage) + indexInDisplayData;

        if (!inpatientID || !eventID) {
            setSaveNoteError("Cannot save note: Missing Inpatient ID or Event ID.");
            return;
        }
        // ... (rest of the API call logic remains the same) ...
        setIsSavingNote(true);
        setSaveNoteError(null);
        setAddEventError(null); // Clear add event error when saving note

        const token = Cookies.get('token');
        if (!token) {
            setSaveNoteError("Authentication token not found.");
            setIsSavingNote(false);
            return;
        }

        console.log(`Attempting to save note for inpatient ${inpatientID}, event ${eventID}: "${note}"`);

        try {
            const response = await fetch(`http://localhost:5001/doctor/inpatient_monitoring/add_event_note/${inpatientID}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventID: eventID,
                    note: note
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                throw new Error(errorData.message || `Failed to save note: ${response.statusText}`);
            }

            console.log("Note saved successfully via API.");

            // Optimistically update local state (using originalIndex)
            const updatedFullData = [...eventData];
            if (updatedFullData[originalIndex]) {
                updatedFullData[originalIndex].note = note;
                setEventData(updatedFullData); // Update the full dataset
            }

        } catch (err) {
            console.error("Error saving event note:", err);
            setSaveNoteError(err.message || "An unexpected error occurred saving the note.");
        } finally {
            setIsSavingNote(false);
        }
    };

    // --- handleAddEvent (API call) ---
    const handleAddEvent = async () => {
        if (!inpatientID) {
            setAddEventError("Cannot add event: Inpatient ID is missing.");
            return;
        }

        const eventName = window.prompt("Enter the name of the event:");
        if (!eventName) {
            // User cancelled or entered empty event name
            return;
        }

        const eventNote = window.prompt("Enter an optional note for the event (leave blank if none):");
        // Note can be null (if cancelled) or empty string, both are acceptable for the backend

        setIsAddingEvent(true);
        setAddEventError(null);
        setSaveNoteError(null); // Clear save note error when adding event

        const token = Cookies.get('token');
        if (!token) {
            setAddEventError("Authentication token not found.");
            setIsAddingEvent(false);
            return;
        }

        console.log(`Attempting to add event for inpatient ${inpatientID}: "${eventName}", Note: "${eventNote || ''}"`);

        try {
            const response = await fetch(`http://localhost:5001/doctor/inpatient_monitoring/add_event/${inpatientID}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    event: eventName,
                    note: eventNote || '' // Send empty string if note is null or empty
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                throw new Error(errorData.message || `Failed to add event: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Event added successfully via API:", result);

            // Refresh the event list to show the new event
            await fetchEvents(); // Re-fetch data

        } catch (err) {
            console.error("Error adding event:", err);
            setAddEventError(err.message || "An unexpected error occurred adding the event.");
        } finally {
            setIsAddingEvent(false);
        }
    };


    return (
        <BoxContainer className='doctorEventsCapturingBox'>
            {/* Modified Title Section */}
            <BoxContainerTitle className='doctorEventsCapturing'>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>Events Captured</span>
                    <Button
                        className="buttonText addEvent"
                        onClick={handleAddEvent}
                        disabled={isAddingEvent || isLoading} // Disable if adding or fetching
                    >
                        <ButtonText>{isAddingEvent ? 'Adding...' : 'Add Event'}</ButtonText>
                    </Button>
                </div>
            </BoxContainerTitle>

            <BoxContainerContent className='doctorEventsCapturingContent'>
                {/* Pass pagination props */}
                <DoctorEventsCapturingPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                    currentRowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />

                {/* Display Status/Error Messages */}
                {addEventError && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>Add Event Error: {addEventError}</div>}
                {isAddingEvent && <div style={{ color: 'blue', marginBottom: '10px', textAlign: 'center' }}>Adding event...</div>}
                {saveNoteError && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>Save Note Error: {saveNoteError}</div>}
                {isSavingNote && <div style={{ color: 'blue', marginBottom: '10px', textAlign: 'center' }}>Saving note...</div>}

                {/* Table Header */}
                <DoctorEventsCapturingHeader patientEventCapturedTableHeader={patientEventCapturedTableHeader} />

                {/* Table Content - Conditional Rendering */}
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading events...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>
                ) : (
                    <DoctorEventsCapturingTable
                        patientEventCapturedTableHeader={patientEventCapturedTableHeader}
                        patientEventCapturedTableData={displayData} // Use paginated data
                        onClickNoting={onClickNoting}
                    />
                )}
            </BoxContainerContent>
        </BoxContainer>
    );
}

export default DoctorEventsCapturing;