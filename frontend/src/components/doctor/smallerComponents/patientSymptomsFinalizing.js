import './style/doctorDiagnosingPatientContent.css';

function PatientSymptomsFinalizing() {
    return (
        <div className="PatientSymptomsFinalizingContainer">
            <div className="containerContent">
                <div className="containerTitle">Patient's Symptoms</div>

                <div className="symptoms">
                    <div className="attribute_symptoms">Symptoms:</div>
                    <input className="value_symptoms" value="Input the patient symptoms  separated by  commas ( , ). For example: High fever over 39°C, Coughing." readOnly />
                </div>

                <div className="symptoms">
                    <div className="attribute_symptoms">Final diagnosis:</div>
                    <input className="value_symptoms" placeholder="Input your Final Diagnosis" />
                </div>
            </div>
        </div>
    );
}

export default PatientSymptomsFinalizing;