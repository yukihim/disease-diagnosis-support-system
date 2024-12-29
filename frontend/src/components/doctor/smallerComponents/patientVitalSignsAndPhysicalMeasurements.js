import './style/doctorDiagnosingPatientContent.css';

function PatientVitalSignsAndPhysicalMeasurements() {
    return (
        <div className="patientVitalSignsAndPhysicalMeasurementsContainer">
            <div className="containerContent">
                <div className="titleAndEdit">
                    <div className="containerTitle">Patient's Vital Signs and Physical Measurement</div>
                    <div className="editButton">Edit</div>
                </div>

                <div className="vitalSignsAndPhysicalMeasurementsContent">
                    <div className="attributeAndValue">
                        <div className="attribute">Height (cm):</div>
                        <div className="value">163 cm</div>
                    </div>
                    <div className="attributeAndValue">
                        <div className="attribute">Weight (kg):</div>
                        <div className="value">70 kg</div>
                    </div>
                    <div className="attributeAndValue">
                        <div className="attribute">Blood Pressure (mmHg/mmHg):</div>
                        <div className="value">100 mmHg / 70 mmHg</div>
                    </div>
                    <div className="attributeAndValue">
                        <div className="attribute">Pulse (beats/minute):</div>
                        <div className="value">80 beats /minute</div>
                    </div>
                    <div className="attributeAndValue">
                        <div className="attribute">Breathing rate (breaths/minute):</div>
                        <div className="value">14 breaths /minute</div>
                    </div>
                    <div className="attributeAndValue">
                        <div className="attribute">Temperature (°C):</div>
                        <div className="value">36.5 °C</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientVitalSignsAndPhysicalMeasurements;