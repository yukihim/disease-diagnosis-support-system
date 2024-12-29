import React, { useState } from 'react';
import './style/doctorDiagnosingPatientContent.css';
import './style/doctorPrescriptionAndProcedure.css';

function Prescriptions() {
    const [procedure, setProcedure] = useState([{}]);

    const addProcedure = () => {
        setProcedure([...procedure, {}]);
    };

    return (
        <div id="prescriptions" className="patientVitalSignsAndPhysicalMeasurementsContainer">
            <div className="containerContent">
                <div className="titleAndEdit">
                    <div className="containerTitle">Prescription</div>
                    <div className="editButton" onClick={addProcedure}>Add</div>
                </div>

                <div>
                    <div className="prescriptionHeader">
                        <div className="prescriptionMedicine">Medicine</div>
                        <div className="prescriptionAM">AM</div>
                        <div className="prescriptionNoon">Noon</div>
                        <div className="prescriptionPM">PM</div>
                        <div className="prescriptionDuration">Duration</div>
                    </div>
                    
                    <div className="prescriptionContainer">
                        <hr />
                        {procedure.map((_, index) => (
                            <div key={index}>
                                <div className="prescriptionContent">
                                    <input className="prescriptionMedicineInput" type="text" placeholder="Medicine"></input>
                                    <input className="prescriptionAMInput" type="text" placeholder="AM"></input>
                                    <input className="prescriptionNoonInput" type="text" placeholder="Noon"></input>
                                    <input className="prescriptionPMInput" type="text" placeholder="PM"></input>
                                    <input className="prescriptionDurationInput" type="text" placeholder="Duration"></input>
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

export default Prescriptions;