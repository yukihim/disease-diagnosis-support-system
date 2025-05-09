import React from 'react';
import './style/eventCalendarTable.css';

import TableContent from '../tableContent';

function EventCalendarTable({ eventCalendarTableHeader, eventCalendarTableData, onClickSession }) {
    // console.log("eventCalendarTableData", eventCalendarTableData);
    const headers = eventCalendarTableHeader;
    const data = eventCalendarTableData;

    return (
        <TableContent className="tableContentWrapperGrid">
            {data.length > 0 ? (
                data.map((row, index) => (
                    <div
                        key={index}
                        className="tableContent tableContentGrid"
                    >
                        <div className="tableContentCell" style={{ gridColumn: headers[0].gridColumn, minWidth: headers[0].minWidth }}>
                            {row.time}
                        </div>
                        <div className="tableContentCell tableContentCellGrid" style={{ gridColumn: headers[1].gridColumn, minWidth: headers[1].minWidth }}>
                            {
                                row.event.map((event, eventIndex) => (
                                    <div 
                                        className="eventCell"
                                        key={eventIndex} style={{ gridColumn: "span 1", minHeight: '70px', minWidth: '200px' }}
                                        onClick={() => onClickSession(event)}
                                    >
                                        {event}
                                    </div>
                                ))
                            }
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

export default EventCalendarTable;