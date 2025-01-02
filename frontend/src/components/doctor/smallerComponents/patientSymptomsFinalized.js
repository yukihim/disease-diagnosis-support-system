import './style/doctorDiagnosingPatientContent.css';

function PatientSymptomsFinalized({ symptoms, finalDiagnosis }) {
    return (
        <div className="PatientSymptomsFinalizingContainer">
            <div className="containerContent">
                <div className="containerTitle">Patient's Symptoms</div>

                <div className="symptoms">
                    <div className="attribute_symptoms">Symptoms:</div>
                    <input className="value_symptoms" value={symptoms ? symptoms : "No input"} readOnly />
                </div>

                <div className="symptoms">
                    <div className="attribute_symptoms">Final diagnosis:</div>
                    <input className="value_symptoms" value={finalDiagnosis} readOnly />
                </div>
            </div>
        </div>
    );
}

export default PatientSymptomsFinalized;