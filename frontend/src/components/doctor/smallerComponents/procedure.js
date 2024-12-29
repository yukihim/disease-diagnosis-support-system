import React, { useState } from 'react';
import './style/doctorDiagnosingPatientContent.css';
import './style/doctorPrescriptionAndProcedure.css';

function Procedure() {
    const [procedures, setprocedures] = useState([{}]);

    const addprocedure = () => {
        setprocedures([...procedures, {}]);
    };

    return (
        <div id="procedure" className="patientVitalSignsAndPhysicalMeasurementsContainer">
            <div className="containerContent">
                <div className="titleAndEdit">
                    <div className="containerTitle">Procedure</div>
                    <div className="editButton" onClick={addprocedure}>Add</div>
                </div>

                <div>
                    <div className="procedureHeader">
                        <div className="procedureName">Procedure</div>
                        <div className="procedureDateTime">Date/Time</div>
                    </div>

                    <div className="procedureContainer">
                        <hr />
                        {procedures.map((_, index) => (
                            <div key={index}>
                                <div className="procedureContent">
                                    <input className="procedureNameInput" type="text" placeholder="Procedure"></input>
                                    <input className="procedureDateTimeInput" type="text" placeholder="Date/Time"></input>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Procedure;